import React from 'react';
import { ANIMATION_IN, ANIMATION_OUT, EVENT, EXAM_GROUP } from 'src/config/constants';
import PteSingleChoice from './common/pte-single-choice';
import PteTextQuestion from './common/pte-text-question';
import { PteTextDescription } from './common/pte-text-description';

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
export default class ReadingMCQRSingleAnswer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // Create ref
    this.pteSingleChoiceAnswerRef = React.createRef();
  }

  // declare ref
  pteSingleChoiceAnswerRef;

  state = {
    correctAnswer: null
  }

  componentWillReceiveProps({ event }) {
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
    let answer = this.pteSingleChoiceAnswerRef.current.getAnswer();
    this.setState({ correctAnswer: true });
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
          <PteTextQuestion examGroup={this.props.examGroup} text={this.props.question.text} />
        </Col>
        <Col md="12">
          <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
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
