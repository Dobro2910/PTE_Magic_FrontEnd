import React, {Component} from 'react';
// @ts-ignore
import mockTestTable from '../../../../../../assets/img/mock-test-table.png';

class MockTestHeadsetCheck extends Component {
  render() {
    return (
      <>
        <div className="mkt-intro-text">
          <p>Headset Check</p>
          <p>This is opportunity to check that your headset is working correctly</p>
          <p>1. Put your headset on and adjust it so that it fits comfortably over your ears.</p>
          <p>
            2. When you are ready, click on the [Play] button. You will hear a short recording.
          </p>
          <p>
            3. If you do not hear anything in your headphones while the status reads [Playing],
            raise your hand to get the attention of the Test Administrator.
          </p>
        </div>
        <div style={{width : 300}}>
          <audio controls>
            <track kind="captions" />
            <source src="https://benit-test-audio.s3.ap-southeast-2.amazonaws.com/example+(1).mp3" />
          </audio>
        </div>
        <div className="mkt-intro-text">
          <p>
            - During the practice you will not have [Play] and [Stop] buttons. The audio recording
            will start playing automatically.
          </p>
          <p>- Please do not remove your headset. You should wear it throughout the test.</p>
        </div>
      </>
    );
  }
}

export default MockTestHeadsetCheck;