import React from 'react';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import { TIME_REMAINING_MOCK_TEST } from 'src/config/constants';
import { duration } from 'moment';

// props: index, questions
export default class MockTestTimeCounter extends React.Component<any, any> {

  constructor(props) {
    super(props);
  
    this.state = {
      initIndex: 0,
      firstSpeaking: true,
      firstReading: true,
      firstListening: true,
      time: 0,
      duration: 0,
      show: true
    };
  
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
  }

  componentWillReceiveProps({ index }) {
    console.log(`MockTestTimeCounter, index: ${index}`);
    if (this.state.initIndex != index) {
      this.calculateTimeRemaining(index);
    }
  }

  componentDidMount() {
    console.log(`MockTestTimeCounter componentDidMount, exam status ${this.props.examStatus}`);
    // examStatus = { this.state.examStatus}
    // remainTime = { this.state.remainTime}
    this.setState({ initIndex: this.props.index});
    this.calculateTimeRemaining(this.props.index);
    if (this.props.examStatus === 'RESUME') {
      setTimeout(
        function() {
          this.setState({ timeRemaining : this.props.remainTime, active: true });
        }.bind(this)
      );
    }
  }

  componentWillUnmount() {
  }

  getRemainTime = () => {
    const { duration, time } = this.state;
    return duration - time;
  }

  onTimeUpdate({ time, duration }) {
    if (time && duration) {
      this.setState({ time, duration });
    }
  }

  onTimeup = () => {
    console.log(`onTimeup`);
    this.props.onTimeup();
  }

  calculateTimeRemaining = (index) => {
    let changeTime = false;
    let q = this.props.questions[index];
    // tslint:disable-next-line
    console.log('calculateTimeRemaining, type: ' + q.type);
    if (
      this.state.firstSpeaking &&
      (q.type === 'SPEAKING_READ_ALOUD' ||
        q.type === 'SPEAKING_REPEAT_SENTENCE' ||
        q.type === 'SPEAKING_DESCRIBE_IMAGE' ||
        q.type === 'SPEAKING_RETELL_LECTURE' ||
        q.type === 'SPEAKING_ANSWER_SHORT_QUESTION')
    ) {
      this.setState({
          firstSpeaking: false,
          timeRemaining: TIME_REMAINING_MOCK_TEST.SPEAKING_GROUP * 60 * 1000
      });
      changeTime = true;
    }

    if (
      this.state.firstReading &&
      (q.type === 'READING_FIB_R_W' ||
        q.type === 'READING_FIB_R' ||
        q.type === 'READING_RE_ORDER_PARAGRAPH' ||
        q.type === 'READING_MCQ_R_SINGLE_ANSWER' ||
        q.type === 'READING_MCQ_R_MULTIPLE_ANSWER')
    ) {
      // tslint:disable-next-line
      console.log('triggerRefreshCountdown READING');
      this.setState(
        { firstReading: false, timeRemaining: TIME_REMAINING_MOCK_TEST.READING_GROUP * 60 * 1000 }
      );
      changeTime = true;
    }

    if (
      this.state.firstListening &&
      (q.type === 'LISTENING_FIB_L' ||
        q.type === 'LISTENING_MCQ_L_SINGLE_ANSWER' ||
        q.type === 'LISTENING_MCQ_L_MULTIPLE_ANSWER' ||
        q.type === 'LISTENING_HIGHLIGHT_CORRECT_SUMMARY' ||
        q.type === 'LISTENING_SELECT_MISSING_WORD' ||
        q.type === 'LISTENING_HIGHLIGHT_INCORRECT_WORD' ||
        q.type === 'LISTENING_DICTATION')
    ) {
      this.setState(
        { firstListening: false, timeRemaining: TIME_REMAINING_MOCK_TEST.LISTENING_GROUP * 60 * 1000 }
      );
      changeTime = true;
    }
    if (q.type === 'WRITING_SUMMARIZE_WRITTEN_TEXT') {
      this.setState({ timeRemaining: TIME_REMAINING_MOCK_TEST.WRITING_SUMMARIZE_WRITTEN_TEXT * 60 * 1000 });
      changeTime = true;
    }

    if (q.type === 'WRITING_ESSAY') {
      this.setState({ timeRemaining: TIME_REMAINING_MOCK_TEST.WRITING_ESSAY * 60 * 1000 });
      changeTime = true;
    }

    if (q.type === 'LISTENING_SUMMARIZE_SPOKEN_TEXT') {
      this.setState({ timeRemaining: TIME_REMAINING_MOCK_TEST.LISTENING_SUMMARIZE_SPOKEN_TEXT * 60 * 1000 });
      changeTime = true;
    }

    if (q.type === 'TIME_BREAK') {
      this.setState({ timeRemaining: TIME_REMAINING_MOCK_TEST.TIME_BREAK * 60 * 1000 });
      changeTime = true;
    }

    if (q.type === 'FINISH') {
      this.setState({ timeRemaining: 0, active: false, show: false });
      changeTime = true;
      return changeTime;
    }

    if (changeTime) {
      this.setState({ active: false });
      setTimeout(
        function() {
          this.setState({ active: true });
        }.bind(this)
      );
    }

    console.log(`calculateTimeRemaining, time: ${this.state.timeRemaining}, change: ${changeTime}`);
    console.log(this.state);
    return changeTime; // render component, false: no render
  }

  render() {
    const { time, duration, show } = this.state;

    return (
      <div className="btn-benit-sm btn-benit-default benit-timer">
        { show && 
          <span>
            <i className="far fa-clock pte-test-type-question-three-icon" />
            <span className="pte-test-type-question-three-timeName hidden-lg-down">TIME REMAINING</span>
            <span className="pte-test-type-question-three-time">
              { this.state.active && 
                <>
                  <Timer active
                    onFinish={this.onTimeup} 
                    duration={ this.state.timeRemaining } 
                    onTimeUpdate={this.onTimeUpdate} />
                  { duration && time && <Timecode time={ duration - time } /> }
                </>
              }
            </span>
          </span>
        }
      </div>
    );
  }
}