import React, {Component} from 'react';
import MtRecorderAnswer from '../../components/common/mt-recorder-answer.jsx';

class MockTestIntroYourSelf extends Component {
  render() {
    return (
      <>
        <div className="mkt-intro-text">
          <p>
            Read the prompt below. In 25 seconds, you must reply in your own words, as naturally
            and clearly as possible. You have 30 seconds to record your response. Your response
            will be sent together with your score report to the institutions by you.
          </p>
        </div>
        <div className="mkt-intro-requirement">
          <p>
            Please introduce yourself. For example, you could talk about one of the following.
          </p>
          <p>- Your interests</p>
          <p>- Your plans for future study</p>
          <p>- Why you want to study abroad</p>
          <p>- Why you need to learn English</p>
          <p>- Why you chose this test</p>
        </div>
        <div>
          <MtRecorderAnswer />
        </div>
      </>
    );
  }
}

export default MockTestIntroYourSelf;