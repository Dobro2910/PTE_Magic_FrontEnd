import React from 'react';
import {
  EXAM_GROUP,
  TIME_PREPARE_RECORDER,
  TIME_PREPARE_AUDIO,
  TIME_LENGTH_RECORDER,
  ANIMATION_IN,
  ANIMATION_OUT,
  EVENT,
  APP_LOCAL_DATETIME_FORMAT,
  RECORDED_FILE_EXTENSION
} from 'src/config/constants';
import PteAudioPlayer from './common/pte-audio-player';
import PteRecorder from './common/pte-recorder';
import { Animated } from 'react-animated-css';
import withStorageAnswer from 'pages/components/withStorageAnswer';
import connect from 'redux-connect-decorator';
import { IRootState } from 'src/reducers';
import { storedAnswer } from 'src/reducers/store';
import { getAccessControlList } from 'src/reducers/acl';
import { sendEvent } from 'src/reducers/store';
import moment from 'moment';
import withTrackingQuestion from 'src/views/pages/components/withTrackingQuestion';
import withExamSharedContext from 'src/views/pages/components/withExamSharedContext';

@withStorageAnswer()
@withTrackingQuestion()
@connect(
  ({ store }: IRootState) => ({
    event: store.event
  }),
  {
    sendEvent,
    storedAnswer,
    getAccessControlList
  }
)
@withExamSharedContext()
export default class SpeakingRS extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onCompletedQuestion = this.onCompletedQuestion.bind(this);
    this.onCompletedAudio = this.onCompletedAudio.bind(this);
    // Create ref
    this.pteRecorderAnswerRef = React.createRef();
    this.onRecogniation = this.onRecogniation.bind(this);
  }

  state = {
    recording: false,
    audioSrc: null,
    isFirstTriggerAnswer: true
  };

  // declare ref
  pteRecorderAnswerRef;

  componentWillReceiveProps({ event }) {
    if (event) {
      switch (event) {
        case EVENT.ON_SKIP_WAIT_RECORD:
            this.onTriggerRecord();
            break;
        case EVENT.ON_EXAM:
          this.props.sendEvent(null); 
          this.onAnswer();
          break;
        default:
          break;
      }
    }
  }

  componentWillUnmount() {
    // tslint:disable-next-line
    console.log('=== RS componentWillUnmount ===');
    if (this.props.examGroup !== EXAM_GROUP.MOCK_TEST) {
      this.props.context.onUpdateShareExamContext({ examGroup: EXAM_GROUP.QUESTION_BANK });
    }
    if (this.state.audioSrc) {
      window.URL.revokeObjectURL(this.state.audioSrc);
    }
  }

  onTriggerRecord = () => {
    this.pteRecorderAnswerRef.current.getWrappedInstance().triggerStartRecord();
  };

  onProcessRecordData = (answer) => {
    console.log(`onProcessRecordData, time: ${moment(new Date()).format(APP_LOCAL_DATETIME_FORMAT)}`);
    this.setState({ ...answer, isFirstTriggerAnswer: false });

    // call storageAnswer
    this.props.storageAnswer(answer);

    // Recogination audio (AI Scoring)
    this.onRecogniation(answer.blob);
  }

  // Get answer
  onAnswer = () => {
    console.log(`onAnswer repeated sentence`)
    if (this.state.isFirstTriggerAnswer) {
      this.pteRecorderAnswerRef.current.getWrappedInstance().getAnswer();
    } else {
      // call onProcessRecordData
      this.onProcessRecordData(this.state);
    }
  };

  onRecogniation = async blob => {
    console.log(`repeat sentence onRecogniation`)
    console.log(this.props.context)
    if (this.props.context.examGroup !== EXAM_GROUP.SCORE_TEST) {
      return;
    }

    let filename = 'recording_' + this.props.question.type + '_' + new Date().getTime() + RECORDED_FILE_EXTENSION;
    let resultUpload = await this.props.onUploadRecording(this.props.question.id
      , filename, blob, true, this.props.index, this.props.page);
    this.props.storedAnswer({ googleAnswer: resultUpload });
  };

  onCompletedAudio = () => {
    // tslint:disable-next-line
    console.log('completed audio');
    this.setState({ recording: true });
  };

  onCompletedQuestion = () => {
    // tslint:disable-next-line
    console.log('onCompletedQuestion speaking repeat sentence');
    this.onAnswer();
  };

  render() {
    const { recording } = this.state;
    // if (isBackToQuestionBank === true) {
    //   return <Redirect to="/view-exam/score-test" />;
    // }

    return (
      <div>
        <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
          <PteAudioPlayer
            url={this.props.question.audioLink}
            delay={TIME_PREPARE_AUDIO.SPEAKING_REPEAT_SENTENCE}
            onCompleted={this.onCompletedAudio}
            examGroup={this.props.examGroup}
          />
          <PteRecorder
            ref={this.pteRecorderAnswerRef}
            delay={TIME_PREPARE_RECORDER.SPEAKING_REPEAT_SENTENCE}
            length={TIME_LENGTH_RECORDER.SPEAKING_REPEAT_SENTENCE}
            recording={recording}
            onCompleted={this.onCompletedQuestion}
            question={this.props.question}
            examGroup={this.props.examGroup}
            onProcessRecordData={ this.onProcessRecordData }
          />
        </Animated>
      </div>
    );
  }
}
