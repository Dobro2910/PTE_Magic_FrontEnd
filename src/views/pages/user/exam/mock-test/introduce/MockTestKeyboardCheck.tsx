import React, {Component} from 'react';
// @ts-ignore
import keyboardimg from '../../../../../../assets/img/keyboardimg.png';

class MockTestKeyboardCheck extends Component {
  render() {
    return (
      <>
        <div className="mkt-intro-text">
          <p>Keyboard Check</p>
          <p>This is an opportunity to check that you have the correct keyboard.</p>
          <p>1. Look at the top row of letters on the keyboard.</p>
          <p>2. The letters should appear in this order Q W E R T Y.</p>
          <p>
            3. If you do not have a Q W E R T Y keyboard, raise your hand to get the attention of
            Test Administrator.
          </p>
        </div>
        <div style={{width : 455}}>
          <img src={keyboardimg} alt="rule" />
        </div>
      </>
    );
  }
}

export default MockTestKeyboardCheck;