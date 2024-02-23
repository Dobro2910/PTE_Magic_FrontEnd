import React from 'react';
import { TIME_PREPARE_AUDIO, ANIMATION_IN, ANIMATION_OUT, EVENT, EXAM_GROUP } from 'src/config/constants';
import PteAudioPlayer from './common/pte-audio-player';
import { Row, Col } from 'reactstrap';
import $ from 'jquery';
import { any } from 'prop-types';
import { Animated } from 'react-animated-css';
import withStorageAnswer from 'pages/components/withStorageAnswer';
import connect from 'redux-connect-decorator';
import { IRootState } from 'src/reducers';
import { sendEvent } from 'src/reducers/store';
import withTrackingQuestion from 'src/views/pages/components/withTrackingQuestion';

// @ts-ignore
import cancel from '../../../../../assets/img/Cancel.png'
// @ts-ignore
import tick from '../../../../../assets/img/Tick.png'

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
export default class ListeningHIW extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onCompletedAudio = this.onCompletedAudio.bind(this);
    this.hightlight = this.hightlight.bind(this);
  }

  state = {
    question: [],
    listAnswer: [],
    answer: any
  };

  componentDidMount() {
    this.parseTextToWords();
  }

  componentWillUnmount() {
  }
  
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

  onAnswer = () => {
    let answer = this.state.listAnswer.join(', ');
    // tslint:disable-next-line
    console.log('Answer ListeningHIW: ' + answer);

    // call storageAnswer
    this.props.storageAnswer({ answer });

    this.processShowAnswer();
  };

  processShowAnswer = () => {
    let areas = $('.word-hightlight.hightlight');
    let ans = $('.word-hightlight');
    for (let i = 0; i < ans.length; i++) {
      let ans_word = ans[i];
      let icon
      if (this.getCssClassAnswer(ans_word.innerText)){
        ans_word.style.border = "#cccccc solid 1px"
        ans_word.style.color = "#cccccc"
        ans_word.style.background = "transparent"
      }
    }

    for (let i = 0; i < areas.length; i++) {
      let area = areas[i];
      let icon
      if (this.getCssClassAnswer(area.innerText)){
        icon = `<span>
            <i class="fas fa-check color-answer-correct"></i>
        </span>`;
        area.style.border = "#12d3bf solid 1px"
        area.style.color = "#12d3bf"
        area.style.background = "#f0fffb"
        $(area).prepend(icon);
      } else {
        icon = `<span>
            <i class="fas fa-times color-answer-wrong"></i>
        </span>`;
        area.style.border = "#ff6666 solid 1px"
        area.style.color = "#ff6666"
        area.style.background = "#ffdcdc"
        $(area).prepend(icon);
      }
    }
  }

  getCssClassAnswer = (userAnswer) => {
    userAnswer = userAnswer.split(' ')
    userAnswer = userAnswer[1] + ','
    let answers = this.props.question.expectAnswer;
    let arr_ans = answers.split(' ')
    arr_ans[arr_ans.length - 1] = arr_ans[arr_ans.length - 1] + ','
    let check = arr_ans.includes(userAnswer)
    console.log(arr_ans, userAnswer, check)
    return check
  }

  hightlight = event => {
    let activeSpan = event.target;
    // tslint:disable-next-line
    console.log('event.target', event);
    if (!$(activeSpan).hasClass('hightlight')) {
      $(activeSpan).css('position', 'relative');
      $(activeSpan).css('color', 'rgba(0, 0, 0, 0.85)');
      $(activeSpan).css('background', '#6aeabf');
      $(activeSpan).css('border', '#333 solid 1px');
      $(activeSpan).css('padding-right', '5px');
      $(activeSpan).css('border-radius', '4px');
      $(activeSpan).css('margin-left', '4px');
      $(activeSpan).css('margin-right', '-2px');
      $(activeSpan).addClass('hightlight');
      this.state.listAnswer.push(activeSpan.innerText);
    } else {
      $(activeSpan).css('position', 'relative');
      $(activeSpan).css('color', 'black');
      $(activeSpan).css('background', '#fff');
      $(activeSpan).css('padding', '0px 0px');
      $(activeSpan).css('border', 'none');
      $(activeSpan).css('border-radius', '0px');
      $(activeSpan).removeClass('hightlight');
      console.log(activeSpan)
      for (let i = 0; i < this.state.listAnswer.length; i++) {
        if (activeSpan.innerText === this.state.listAnswer[i]) {
          this.state.listAnswer.splice(i, 1);
        }
      }
    }
  };

  parseTextToWords = () => {
    let text = this.props.question.description;
    // basic interpunct chars should be single elements to click
    text = text.replace(/\./g, ' .');
    text = text.replace(/\?/g, ' ?');
    text = text.replace(/\!/g, ' !');
    text = text.replace(/\,/g, ' ,');
    text = text.replace(/\"/g, ' " ');
    // removing multiple spaces for single
    text = text.replace(/ +(?= )/g, '');

    var words = text.split(' ');

    let description = [];

    // generate words with ids to change their future css
    for (let i = 0, l = words.length; i < l; i++) {
      let spanId = 'word' + i;
      let word = words[i];
      description.push(
        <span onClick={this.hightlight} className="word-hightlight" id={spanId} style={{ color: 'black' }} key={spanId}>
          {' '}
          {word}
        </span>
      );
    }

    this.setState({
      question: description
    });
  };

  onCompletedAudio = () => {
    // tslint:disable-next-line
    console.log('completed audio');
  };

  render() {
    return (
      <Row>
        <Col md="12">
          <Animated animationIn={ANIMATION_IN} animationOut={ANIMATION_OUT} isVisible>
            <PteAudioPlayer
              url={this.props.question.audioLink}
              delay={TIME_PREPARE_AUDIO.LISTENING_HIGHLIGHT_INCORRECT_WORD}
              onCompleted={this.onCompletedAudio}
              examGroup={this.props.examGroup}
            />
            {this.state.question}
          </Animated>
        </Col>
      </Row>
    );
  }
}
