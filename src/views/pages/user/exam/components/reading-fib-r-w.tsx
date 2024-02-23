import React from 'react';
import { ANIMATION_IN, ANIMATION_OUT, EVENT, EXAM_GROUP } from 'src/config/constants';
import PteFillInTheBlank from './common/pte-fib';
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
export default class FillInTheBlankRW extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // Create ref
    this.pteFillInTheBlank = React.createRef();
  }
  state = {
    correctAnswer: false
  };
  
  // declare ref
  pteFillInTheBlank;

  componentWillReceiveProps({ event }) {
    if (event) {
      switch (event) {
        case EVENT.ON_EXAM:
          console.log(`FillInTheBlankRW componentWillReceiveProps ON_EXAM`)
          this.props.sendEvent(null, { question: null });
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
    this.setState({ correctAnswer : true});

    let answer = this.pteFillInTheBlank.current.getAnswer().join(', ');
    // call storageAnswer
    this.props.storageAnswer({ answer });
  };

  render() {
    return (
      <div>
        <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
          <PteFillInTheBlank correctAnswer={ this.state.correctAnswer } ref={this.pteFillInTheBlank} question={this.props.question} />
        </Animated>
      </div>
    );
  }
}
