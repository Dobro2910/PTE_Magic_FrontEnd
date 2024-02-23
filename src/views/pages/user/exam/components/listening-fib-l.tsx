import React from 'react';
import { TIME_PREPARE_AUDIO, ANIMATION_IN, ANIMATION_OUT, EVENT, EXAM_GROUP } from 'src/config/constants';
import PteAudioPlayer from './common/pte-audio-player';
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
export default class ListeningFIBL extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onCompletedAudio = this.onCompletedAudio.bind(this);
    // Create ref
    this.pteFillInTheBlank = React.createRef();
  }

  state = {
    correctAnswer: false
  };
  
  // declare ref
  pteFillInTheBlank;

  componentWillReceiveProps({ event }) {
    console.log(`ListeningFIBL ReceiveProps: ${event}`);
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
    this.setState({ correctAnswer : true});
    let answer = this.pteFillInTheBlank.current.getAnswer();
    // tslint:disable-next-line
    console.log('Answer ListeningFIBL: ' + answer);
    answer = answer.join(',');

    // call storageAnswer
    this.props.storageAnswer({ answer });
  };

  onCompletedAudio = () => {
    // tslint:disable-next-line
    console.log('completed audio');
  };

  render() {
    return (
      <div className="animation">
        <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
          <PteAudioPlayer
            url={this.props.question.audioLink}
            delay={TIME_PREPARE_AUDIO.LISTENING_FIB_L}
            onCompleted={this.onCompletedAudio}
            examGroup={this.props.examGroup}
          />
          <PteFillInTheBlank correctAnswer={ this.state.correctAnswer } ref={this.pteFillInTheBlank} question={this.props.question} />
        </Animated>
      </div>
    );
  }
}
