import React from 'react';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import { TIME_REMAINING_QUESTION_BANK, QUESTION_TYPE } from 'src/config/constants';
import { toast } from 'react-toastify';
import $ from 'jquery';

export default class BankTimeCounter extends React.Component<any, any> {

  constructor(props) {
    super(props);
  
    this.state = {
      time: 0,
      duration: 0,
      showTimer: false      
    };
  
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
  }

  onTimeup = () => {
    toast.warn("Time's up.", { autoClose: 2000 });
    $('.pte-input-writing').prop('disabled', true);
  };

  componentWillReceiveProps({ question }) {
    this.setState({ showTimer: false });
    setTimeout(() => this.calculateTime());
  }

  calculateTime = () => {
    if (this.props.question.type === QUESTION_TYPE.WRITING_SUMMARIZE_WRITTEN_TEXT) {
      this.setState({ timeRemaining: TIME_REMAINING_QUESTION_BANK.WRITING_SUMMARIZE_WRITTEN_TEXT * 60 * 1000
        , showTimer: true });
    }

    if (this.props.question.type === QUESTION_TYPE.WRITING_ESSAY) {
      this.setState({ timeRemaining: TIME_REMAINING_QUESTION_BANK.WRITING_ESSAY * 60 * 1000
        , showTimer: true });
    }
  }

  componentDidMount() {
    this.calculateTime();
  }

  componentWillUnmount() {
  }

  onTimeUpdate({ time, duration }) {
    if (time && duration) {
      this.setState({ time, duration });
    }
  }

  render() {
    const { time, duration, showTimer } = this.state;

    return (
      <>
        { showTimer && <div className="btn-benit-sm btn-benit-default benit-timer">
          <span>
            <i className="far fa-clock pte-test-type-question-three-icon" />
            <span className="pte-test-type-question-three-timeName hidden-lg-down">TIME REMAINING</span>
            <span className="pte-test-type-question-three-time">
              <Timer active onFinish={this.onTimeup} duration={ this.state.timeRemaining } onTimeUpdate={this.onTimeUpdate} />
              { duration && time && <Timecode time={ duration - time } /> }
            </span>
          </span>
        </div>
        }
      </>
    );
  }
}