import React, { RefObject } from 'react';
import { EXAM_GROUP, TIME_PREPARE_AUDIO, ANIMATION_IN, ANIMATION_OUT, EVENT } from 'src/config/constants';
import PteAudioPlayer from './common/pte-audio-player';
import PteTextAnswer from './common/pte-text-answer';
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
export default class ListeningSMT extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onChangeTextAnswer = this.onChangeTextAnswer.bind(this);
    this.onAnswer = this.onAnswer.bind(this);

    // Create ref
    this.pteTextAnswerRef = React.createRef();
  }

  // declare ref
  pteTextAnswerRef;

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

  componentWillUnmount() {
  }

  // Get answer
  onAnswer = () => {
    let answer = this.pteTextAnswerRef.current.getAnswer();
    // tslint:disable-next-line
    console.log('Answer ListeningSMT: ' + answer);

    // call storageAnswer
    this.props.storageAnswer({ answer });
  };


  onChangeTextAnswer = text => {
    // tslint:disable-next-line
    console.log('text answer: ' + text);
  };

  onCompletedAudio = () => {
    // tslint:disable-next-line
    console.log('completed audio');
  };

  render() {
    return (
      <div>
        <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
          <PteAudioPlayer
            url={this.props.question.audioLink}
            delay={TIME_PREPARE_AUDIO.LISTENING_SUMMARIZE_SPOKEN_TEXT}
            onCompleted={this.onCompletedAudio}
            examGroup={this.props.examGroup}
          />
          <PteTextAnswer
            ref={this.pteTextAnswerRef}
            length={70}
            onChange={this.onChangeTextAnswer}
            questionType={this.props.question.type}
          />
        </Animated>
      </div>
    );
  }
}
