import React from 'react';
import { EXAM_GROUP, QUESTION_TYPE, TIME_PREPARE_AUDIO, ANIMATION_IN, ANIMATION_OUT, EVENT } from 'src/config/constants';
import PteSingleChoice from './common/pte-single-choice';
import PteTextQuestion from './common/pte-text-question';
import { PteTextDescription } from './common/pte-text-description';
import PteAudioPlayer from './common/pte-audio-player';
import { Row, Col } from 'reactstrap';
import { Animated } from 'react-animated-css';
import withStorageAnswer from 'pages/components/withStorageAnswer';
import connect from 'redux-connect-decorator';
import { IRootState } from 'src/reducers';
import { sendEvent } from 'src/reducers/store';
import withTrackingQuestion from 'src/views/pages/components/withTrackingQuestion';

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
export default class ListeningSingleAnswer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // Create ref
    this.pteSingleChoiceAnswerRef = React.createRef();
  }

  state = {
    correctAnswer: false
  };
  // declare ref
  pteSingleChoiceAnswerRef;

  componentWillUnmount() {
  }
  
  componentWillReceiveProps({ event }) {
    console.log(`ListeningSingleAnswer ReceiveProps: ${event}`);
    if (event) {
      switch (event) {
        case EVENT.ON_EXAM:
          this.props.sendEvent(null);
          this.onAnswer();
          break;
        default:
          break;
      }
    }
  }
  
  // Get answer
  onAnswer = () => {
    let answer = this.pteSingleChoiceAnswerRef.current.getAnswer();
    this.setState({ correctAnswer: true });
    // tslint:disable-next-line
    console.log('Answer ListeningSingleAnswer: ' + answer);

    // call storageAnswer
    this.props.storageAnswer({ answer });
  };

  onCompletedChoose = () => {
    // tslint:disable-next-line
    console.log('onCompletedChoose');
  };

  onCompletedAudio() {}

  render() {
    return (
      <Row>
        <Col md="12">
          <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
            <PteTextQuestion examGroup={this.props.examGroup} text={this.props.question.text} />
            <PteAudioPlayer
              url={this.props.question.audioLink}
              delay={TIME_PREPARE_AUDIO.LISTENING_MCQ_L_SINGLE_ANSWER}
              onCompleted={this.onCompletedAudio}
              examGroup={this.props.examGroup}
            />
            <PteTextDescription description={this.props.question.description} />
            <PteSingleChoice
              ref={this.pteSingleChoiceAnswerRef}
              question={this.props.question}
              examGroup={this.props.examGroup}
              onCompleted={this.onCompletedChoose}
              correctAnswer={this.state.correctAnswer}
            />
          </Animated>
        </Col>
      </Row>
    );
  }
}
