import React from 'react';
import PteSingleChoice from './common/pte-single-choice';
import PteTextQuestion from './common/pte-text-question';
import PteAudioPlayer from './common/pte-audio-player';
import { Row, Col } from 'reactstrap';
import { TIME_PREPARE_AUDIO, ANIMATION_IN, ANIMATION_OUT, EVENT, EXAM_GROUP } from 'src/config/constants';
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
export default class ListeningSelectMissingAnswer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // Create ref
    this.pteMultipleChoiceAnswerRef = React.createRef();
  }

  state = {
    correctAnswer: false
  };
  
  // declare ref
  pteMultipleChoiceAnswerRef;

  componentWillReceiveProps({ event }) {
    console.log(`ListeningHCS ReceiveProps: ${event}`);
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

  componentWillUnmount() {
  }

  componentWillMount() {
  }
  
  // Get answer
  onAnswer = () => {
    const answer = this.pteMultipleChoiceAnswerRef.current.getAnswer();
    this.setState({ correctAnswer: true });
    // tslint:disable-next-line
    console.log('Answer ListeningSelectMissingAnswer: ' + answer);

    // call storageAnswer
    this.props.storageAnswer({ answer });
  };

  onCompletedChoose = () => {
    // tslint:disable-next-line
    console.log('onCompletedChoose');
  };

  render() {
    return (
      <Row>
        <Col md="12">
          <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
            <PteTextQuestion examGroup={this.props.examGroup} text={this.props.question.text} />
            <PteAudioPlayer
              url={this.props.question.audioLink}
              delay={TIME_PREPARE_AUDIO.LISTENING_SELECT_MISSING_WORD}
              onCompleted={this.onCompletedChoose}
              examGroup={this.props.examGroup}
            />
            <PteSingleChoice
              ref={this.pteMultipleChoiceAnswerRef}
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
