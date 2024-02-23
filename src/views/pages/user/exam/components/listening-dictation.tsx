import React from 'react';
import { TIME_PREPARE_AUDIO, ANIMATION_IN, ANIMATION_OUT, EVENT, EXAM_GROUP } from 'src/config/constants';
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
export default class ListeningDictation extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onChangeTextAnswer = this.onChangeTextAnswer.bind(this);
    this.onCompletedAudio = this.onCompletedAudio.bind(this);
    // Create ref
    this.pteTextAnswerRef = React.createRef();
  }

  componentWillReceiveProps({ event }) {
    console.log(`ListeningDictation ReceiveProps: ${event}`);
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

  onCompletedAudio = () => {
    // tslint:disable-next-line
    console.log('completed audio');
  };

  // declare ref
  pteTextAnswerRef;

  // Get answer
  onAnswer = () => {
    let answer = this.pteTextAnswerRef.current.getAnswer();
    // call storageAnswer
    this.props.storageAnswer({ answer });
  };

  componentWillUnmount() {
  }

  onChangeTextAnswer = text => {
    // tslint:disable-next-line
    // console.log('text answer: ' + text);
  };

  render() {
    return (
      <div>
        <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
          <PteAudioPlayer
            url={this.props.question.audioLink}
            delay={TIME_PREPARE_AUDIO.LISTENING_DICTATION}
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
