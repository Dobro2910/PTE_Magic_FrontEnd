import React, {Component} from 'react';
import MtRecorderWav from '../../components/common/mt-recorder-wav.jsx';

class MockTestMicrophoneCheck extends Component {
  render() {
    return (
      <>
        <div className="mkt-intro-text">
          <p>Microphone Check</p>
          <p>This is an opportunity to check that your microphone is working correctly.</p>
          <p>
            1. Make sure your headset is on and the microphone is in the downward position near
            your mouth.
          </p>
          <p>
            2. When you are ready, click on the Record button and say “Testing, testing, one, two,
            three” into the microphone.
          </p>
          <p>
            3. After you have spoken, click on the Stop button. Your recording is now complete.
          </p>
          <p>4. Now click on the Playback button. You should clearly hear yourself speaking.</p>
          <p>5. If you can not hear your voice clearly, please raise your hand.</p>
        </div>
        <div>
          <MtRecorderWav />
        </div>
        <div className="mkt-intro-text">
          <p>
            During the test, you will not have Record, Playback and Stop buttons. The voice
            recording start automatically.
          </p>
        </div>
      </>
    );
  }
}

export default MockTestMicrophoneCheck;