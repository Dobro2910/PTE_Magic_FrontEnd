import React, {Component} from 'react';
// @ts-ignore
import mockTestTable from '../../../../../../assets/img/mock-test-table.png';

class MockTestPart extends Component {
  render() {
    return (
      <>
        <div className="mkt-intro-text">
          The test is approximately 3 hours long, including 1 optional scheduled break.
        </div>
        <img src={mockTestTable} alt="rule" />
      </>
    );
  }
}

export default MockTestPart;