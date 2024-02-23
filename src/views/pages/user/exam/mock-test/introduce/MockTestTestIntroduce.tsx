import React, {Component} from 'react';
// @ts-ignore
import testintroduction from '../../../../../../assets/img/testintroduction.png';

class MockTestTestIntroduce extends Component {
  render() {
    return (
      <>
        <div className="mkt-intro-text">
          <p>Test Introduction</p>
          <p>
            This test will measure the English Reading, Writing, Listening and Speaking skills
            that you need in an academic setting.
          </p>
          <p>
            - The test is divided into 3 parts. Each part may contain a number of sections. The
            sections are individually timed. The timer will be shown in the top right corner of
            your screen.The number of items in the section will also be displayed.
          </p>
        </div>
        <div style={{width : 455}}>
          <img src={testintroduction} alt="rule" />
        </div>
        <div className="mkt-intro-text">
          <p>
            - At the beginning of each part you will receive instructions. These will provide
            details on what to expect in that part of the test.
          </p>
          <p>
            - By clicking on the Next button at the bottom of each screen you confirm your answer
            and move to the next question. If you click on Next you will not be able to return to
            the previous question. You will not be able to revisit any questions at the end of the
            test.
          </p>
          <p>
            - You will be offered a break of up 10 minutes after Part 2. The break is optional.
          </p>
          <p>
            - This test makes use of different varieties of English, for example, British,
            American, Australian. You can answer in the standard English variety of your choice.
          </p>
        </div>
      </>
    );
  }
}

export default MockTestTestIntroduce;