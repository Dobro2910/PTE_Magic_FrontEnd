import React from 'react';
import PteMultipleChoice from './common/pte-multiple-choice';
import PteTextQuestion from './common/pte-text-question';
import { PteTextDescription } from './common/pte-text-description';
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
export default class ListeningMultipleAnswer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // Create ref
    this.pteMultipleChoiceAnswerRef = React.createRef();
  }

  // declare ref
  pteMultipleChoiceAnswerRef;

  state = {
    correctAnswer: null
  }

  componentWillReceiveProps({ event }) {
    console.log(`WritingSWT ReceiveProps: ${event}`);
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

  // Get answer
  onAnswer = () => {
    let answer = this.pteMultipleChoiceAnswerRef.current.getAnswer();
    // tslint:disable-next-line
    console.log('Answer ListeningMultipleAnswer: ' + answer);
    // call storageAnswer
    this.props.storageAnswer({ answer });

    this.setState({ correctAnswer: true });
  };

  onCompletedChoose = () => {
    // tslint:disable-next-line
    console.log('onCompletedChoose');
  };

  onCompletedAudio() {

  }

  render() {
    const { correctAnswer } = this.state;
    return (
      <Row>
        <Col md="12">
          <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
            <PteTextQuestion examGroup={this.props.examGroup} text={this.props.question.text} />
            <PteAudioPlayer
              url={this.props.question.audioLink}
              delay={TIME_PREPARE_AUDIO.LISTENING_MCQ_L_MULTIPLE_ANSWER}
              onCompleted={this.onCompletedAudio}
              examGroup={this.props.examGroup}
            />
            <PteTextDescription description={this.props.question.description} />
            <PteMultipleChoice
              ref={this.pteMultipleChoiceAnswerRef}
              question={this.props.question}
              examGroup={this.props.examGroup}
              onCompleted={this.onCompletedChoose}
              correctAnswer={correctAnswer}
            />
          </Animated>
        </Col>
      </Row>
    );
  }
}
