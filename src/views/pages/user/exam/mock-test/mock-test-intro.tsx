import React, { useState } from 'react';
import connect from 'redux-connect-decorator';

import { IRootState } from 'src/reducers';
import { startMockTest, resetExam, resumeMockTest, saveExamProgress } from 'src/reducers/exam';
import withUploading from 'pages/components/withUploading';
import { resetStore, sendEvent, initStore } from 'src/reducers/store';
import withExamSharedContext from 'src/views/pages/components/withExamSharedContext';
import {uploadPoolInit} from "src/utils/upload-utils";
import MockTestIntroHeader from "user/exam/mock-test/introduce/MockTestIntroHeader";
import MockTestIntroFooter from "user/exam/mock-test/introduce/MockTestIntroFooter";
import MockTestPart from "user/exam/mock-test/introduce/MockTestPart";
import MockTestHeadsetCheck from "user/exam/mock-test/introduce/MockTestHeadsetCheck";
import MockTestMicrophoneCheck from "user/exam/mock-test/introduce/MockTestMicrophoneCheck";
import MockTestKeyboardCheck from "user/exam/mock-test/introduce/MockTestKeyboardCheck";
import MockTestTestIntroduce from "user/exam/mock-test/introduce/MockTestTestIntroduce";
import MockTestIntroYourSelf from "user/exam/mock-test/introduce/MockTestIntroYourSelf";
import MockTestSubjectExam from "user/exam/mock-test/introduce/MockTestSubjectExam";
import Dialog from "@material-ui/core/Dialog";
// @ts-ignore
import startMock from "../../../../../assets/img/gif/mock_test_start.gif";
import {Button as ButtonMT} from "@material-ui/core";


// export const AutoSaveContext = React.createContext('false');

@connect(
  ({ exam }: IRootState) => ({
    examInfo: exam.examInfo
  }),
  {
    sendEvent,
    startMockTest,
    resumeMockTest,
    resetExam
  }
)
@withUploading()
@withExamSharedContext()
export default class MockTestIntro extends React.Component<any, any> {

  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      open: false
    }
  }

  mockTestIntroduceStep = () => {
    const {step} = this.state

    switch (step) {
      case 1:
        return <MockTestPart />
      case 2:
        return <MockTestHeadsetCheck />
      case 3:
        return <MockTestMicrophoneCheck />
      case 4:
        return <MockTestKeyboardCheck />
      case 5:
        return <MockTestTestIntroduce />
      case 6:
        return <MockTestIntroYourSelf />
      case 7:
        return <MockTestSubjectExam />
      case 8:
        this.setState({
          step: 7,
          open: true
        })
    }
  }

  render() {
    return (
      <>
        <Dialog fullScreen open={this.state.open} onClose={() => {this.setState({open : false})}} className="mkt-dialog">
          <div className="mkt-dialog-box">
            <div className="mkt-dialog-icon">
              <img src={startMock} alt="Start Mock" className="mkt-dialog-image"/>
            </div>
            <div className="mkt-dialog-title">
              Are you sure to start new Mock Test?
            </div>
            <div className="mkt-dialog-content">
              You will lost 1 mock test if you start
            </div>
            <div className="mkt-dialog-button">
              <ButtonMT
                className="mkt-dialog-start-button"
                onClick={this.props.handleStart}
              >
                Start
              </ButtonMT>
              <ButtonMT
                className={"mkt-dialog-return-button"}
                onClick={() => {this.setState({open: false, step: 7})}}
              >
                No
              </ButtonMT>
            </div>
          </div>
        </Dialog>
        <MockTestIntroHeader/>
        <div className="mkt-intro-layout">
          <div className="mkt-intro-content">
            {this.mockTestIntroduceStep()}
          </div>
        </div>
        <MockTestIntroFooter
          step={this.state.step}
          handleState={(step) => {
            this.setState({step})
          }}
          // onNext={this.nextQuestion}
          // displayQuestionBtn={displayQuestionBtn}
        />
      </>
    );
  }
}
