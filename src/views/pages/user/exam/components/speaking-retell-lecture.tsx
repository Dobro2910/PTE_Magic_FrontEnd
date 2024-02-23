import React from 'react';
import { TIME_PREPARE_RECORDER, TIME_PREPARE_AUDIO, TIME_LENGTH_RECORDER, ANIMATION_IN, ANIMATION_OUT, EVENT, EXAM_GROUP, APP_LOCAL_DATETIME_FORMAT, RECORDED_FILE_EXTENSION } from 'src/config/constants';
import PteAudioPlayer from './common/pte-audio-player';
import PteRecorder from './common/pte-recorder';
import { Animated } from 'react-animated-css';
import withStorageAnswer from 'pages/components/withStorageAnswer';
import connect from 'redux-connect-decorator';
import { IRootState } from 'src/reducers';
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
    sendEvent
  }
)
@withExamSharedContext()
export default class SpeakingRL extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onCompletedQuestion = this.onCompletedQuestion.bind(this);
    this.onCompletedAudio = this.onCompletedAudio.bind(this);
    this.onRecogniation = this.onRecogniation.bind(this);
    // Create ref
    this.pteRecorderAnswerRef = React.createRef();
    this.ptePteAudioPlayerRef = React.createRef();
  }

  state = {
    recording: false,
    audioSrc: null,
    checkData: null,
    isFirstTriggerAnswer: true
  };

  // declare ref
  pteRecorderAnswerRef;
  ptePteAudioPlayerRef;

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
    console.log('=== RL componentWillUnmount ===');
    if (this.props.examGroup !== EXAM_GROUP.MOCK_TEST) {
      this.props.context.onUpdateShareExamContext({ examGroup: EXAM_GROUP.QUESTION_BANK });
    }
    if (this.state.audioSrc) {
      window.URL.revokeObjectURL(this.state.audioSrc);
    }
  }

  onProcessRecordData = (answer) => {
    console.log(`onProcessRecordData, time: ${moment(new Date()).format(APP_LOCAL_DATETIME_FORMAT)}`);
    this.setState({ ...answer, isFirstTriggerAnswer: false });

    // call storageAnswer
    this.props.storageAnswer(answer);

    // Recogination audio (AI Scoring)
    this.onRecogniation(answer.blob);
  }

  onRecogniation = async blob => {
    console.log(`retell lecture aloud onRecogniation`)
    console.log(this.props.context)
    if (this.props.context.examGroup !== EXAM_GROUP.SCORE_TEST) {
      return;
    }

    let filename = 'recording_' + this.props.question.type + '_' + new Date().getTime() + RECORDED_FILE_EXTENSION;
    console.log(`onUploadRecording`, this.props)
    let resultUpload = await this.props.onUploadRecording(this.props.question.id, filename
      , blob, true, this.props.index, this.props.page);
    
    this.props.storedAnswer({ googleAnswer: resultUpload });
  };

  // Get answer
  onAnswer = () => {
    if (this.state.isFirstTriggerAnswer) {
      this.pteRecorderAnswerRef.current.getWrappedInstance().getAnswer();
    } else {
      // call onProcessRecordData
      this.onProcessRecordData(this.state);
    }
  };

  onCompletedAudio = () => {
    // tslint:disable-next-line
    console.log('completed audio');
    this.setState({ recording: true });
  };

  onCompletedQuestion = () => {
    // tslint:disable-next-line
    console.log('onCompletedQuestion speaking retell lecture');
    this.onAnswer();
  };

  onTriggerRecord = () => {
    this.ptePteAudioPlayerRef.current.stop();
    this.pteRecorderAnswerRef.current.getWrappedInstance().triggerStartRecord();
  };

  render() {
    const { recording } = this.state;

    return (
      <div>
        <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
          <PteAudioPlayer
            ref={this.ptePteAudioPlayerRef}
            url={this.props.question.audioLink}
            delay={TIME_PREPARE_AUDIO.SPEAKING_RETELL_LECTURE}
            onCompleted={this.onCompletedAudio}
            examGroup={this.props.examGroup}
          />
          <PteRecorder
            ref={this.pteRecorderAnswerRef}
            delay={TIME_PREPARE_RECORDER.SPEAKING_RETELL_LECTURE}
            length={TIME_LENGTH_RECORDER.SPEAKING_RETELL_LECTURE}
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
