import React from 'react';
import { TIME_PREPARE_RECORDER, TIME_LENGTH_RECORDER, ANIMATION_IN, ANIMATION_OUT, EVENT, EXAM_GROUP, APP_LOCAL_DATETIME_FORMAT, RECORDED_FILE_EXTENSION } from 'src/config/constants';
import PteRecorder from './common/pte-recorder';
import { Col, Row } from 'reactstrap';
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
export default class SpeakingDI extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onCompletedQuestion = this.onCompletedQuestion.bind(this);
    this.onRecogniation = this.onRecogniation.bind(this);
    // Create ref
    this.pteRecorderAnswerRef = React.createRef();
  }
  // declare ref
  pteRecorderAnswerRef;

  state = {
    recording: true,
    audioSrc: null,
    checkData: null,
    isFirstTriggerAnswer: true
  };

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
    console.log('=== DI componentWillUnmount ===');
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

  // Get answer
  onAnswer = () => {
    if (this.state.isFirstTriggerAnswer) {
      this.pteRecorderAnswerRef.current.getWrappedInstance().getAnswer();
    } else {
      // call onProcessRecordData
      this.onProcessRecordData(this.state);
    }
  };

  onTriggerRecord = () => {
    this.pteRecorderAnswerRef.current.getWrappedInstance().triggerStartRecord();
  };

  onCompletedQuestion = () => {
    // tslint:disable-next-line
    console.log('onCompletedQuestion speaking describe image');
    this.onAnswer();
  };

  onRecogniation = async blob => {
    console.log(`desribe image onRecogniation`)
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

  render() {
    const { recording } = this.state;

    return (
      <div>
        <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
          <Row>
            <Col md="6">
              <div className="pte-width-100 pte-margin-bottom-10 pte-question-image">
                <img src={this.props.question.audioLink} />
              </div>
            </Col>
            <Col md="6">
              <PteRecorder
                ref={this.pteRecorderAnswerRef}
                delay={TIME_PREPARE_RECORDER.SPEAKING_DESCRIBE_IMAGE}
                length={TIME_LENGTH_RECORDER.SPEAKING_DESCRIBE_IMAGE}
                recording={recording}
                onCompleted={this.onCompletedQuestion}
                question={this.props.question}
                examGroup={this.props.examGroup}
                onProcessRecordData={ this.onProcessRecordData }
              />
            </Col>
          </Row>
        </Animated>
      </div>
    );
  }
}
