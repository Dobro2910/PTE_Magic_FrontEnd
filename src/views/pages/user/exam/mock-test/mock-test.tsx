import React, {useState} from 'react';
import connect from 'redux-connect-decorator';
import {Col} from 'reactstrap';

import {IRootState} from 'src/reducers';
import {startMockTest, resetExam, resumeMockTest, saveExamProgress} from 'src/reducers/exam';
import {ExamNavItem, QuestionDescription, ExamCountdownNav, ExamGroupTitleNav} from '../exam-components';
import queryString from 'query-string';
import QuestionLayout from '../question-layout';
import {EXAM_GROUP, TIME_REMAINING_MOCK_TEST, EVENT, QUESTION_TYPE} from 'src/config/constants';
import {PteLoadingSpinner} from '../../../components/LoadingSpinner/pte-loading-spinner';
import withUploading from 'pages/components/withUploading';
import {uploadPoolInit} from 'src/utils/upload-utils';
import {toast} from 'react-toastify';
import {
  isSpeakingQuestion,
  isReadingQuestion,
  isWritingQuestion,
  isListeningQuestion,
  isTimebreakQuestion,
  isNewPartListening
} from 'src/utils/question-utils';
import {removeQueryFbclid} from 'src/utils/pte-utils';
import ExamSidebarRight from 'src/components/Sidebar/ExamSidebarRight';
import {Translate} from 'src/utils/language/translate';
import PteActionButton from '../components/common/pte-action-button';
import {resetStore, sendEvent, initStore} from 'src/reducers/store';
import MockTestTimeCounter from './MockTestTimeCounter';
import withExamSharedContext from 'src/views/pages/components/withExamSharedContext';
import MockTestIntro from "user/exam/mock-test/mock-test-intro";
import {Grid} from "@material-ui/core";

export interface IMockTestState {
  index: number;
  examTypeId: number;
  examId: number;
  // init: number;
  // autoSave: string;
  questions: any;
  question: any;
  examGroup: string;
  showSpinner: boolean;
  examStatus: string;
  remainTime: number;
  mockTestIntro: boolean;
  waitLoading: boolean
}

// export const AutoSaveContext = React.createContext('false');

@connect(
  ({exam}: IRootState) => ({
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
export default class MockTest extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onNextQuestion = this.onNextQuestion.bind(this);

    this.timerRef = React.createRef();

    // Pool
    uploadPoolInit();
  }

  timerRef;

  state: IMockTestState = {
    index: 0,
    examTypeId: null,
    examId: null,
    // init: null,
    // autoSave: 'false',
    questions: null,
    examGroup: EXAM_GROUP.MOCK_TEST,
    question: null,
    showSpinner: false,
    examStatus: 'NEW',
    remainTime: 0,
    mockTestIntro: true,
    waitLoading: false
  };

  componentWillMount() {
    let examTypeId = queryString.parse(this.props.location.search).type; // new
    let examId = queryString.parse(this.props.location.search).examid;  // resume
    // let init = queryString.parse(this.props.location.search).init;
    this.setState({examTypeId, examId});
  }

  async componentDidMount() {
    if (this.state.examId) {
      await this.props.resumeMockTest({id: this.state.examId});
    }

    setTimeout(() => {
      this.props.context.onUpdateShareExamContext({
        examGroup: this.state.examGroup,
        index: this.state.index,
        questions: this.state.questions
      });
    });

    setTimeout(() => {
      this.setState({waitLoading: true})
    }, 1000)
  }

  componentWillUnmount() {
    this.props.resetExam();
  }

  componentWillReceiveProps({location, examInfo}) {
    if (!examInfo) {
      return;
    }
    if (examInfo != null && !this.props.examInfo || this.props.examInfo.questions.length === 0) {
      console.log('componentWillReceiveProps');
      let question;
      if (this.state.index === 0) {
        // tslint:disable-next-line
        question = examInfo.questions[this.state.index];
      }
      // Check init resume
      if (this.state.examId) {
        const init = examInfo.examDTO.currentQuestion;
        question = examInfo.questions[init];

        let examStatus = 'RESUME';
        if (this.isStartNewPart(init, examInfo)) {
          examStatus = 'NEW_PART';
        }
        console.log(`examStatus: ${examStatus}`)
        console.log(`question`, question)
        let remainTime = examInfo.examDTO.remainTime;
        console.log(`init index: ${init}`)
        this.setState({index: init, examId: null, examStatus, remainTime});
      }

      // Set selectedQuestion & question list
      this.setState({questions: examInfo.questions, question});
    }
  }

  isStartNewPart = (init, examInfo) => {
    let isNewPart = false;
    // Check previous question
    let question = examInfo.questions[init - 1];
    let currentQuestion = examInfo.questions[init];
    if (question && (isTimebreakQuestion(currentQuestion) || isTimebreakQuestion(question)
      || isWritingQuestion(currentQuestion) || isNewPartListening(question, currentQuestion))) {
      return true;
    }
    return isNewPart;
  }

  onNextQuestionTimebreak = async () => {
    let remainTime = this.timerRef.current.getRemainTime();
    console.log(`remain time, ${remainTime}`)
    // Save progress
    await saveExamProgress(this.props.examInfo.examDTO.id, this.state.index + 1, remainTime);

    // Refresh
    const link = removeQueryFbclid(window.location.href);
    const new_link = link.split('?')[0] + `?examid=${this.props.examInfo.examDTO.id}`;
    console.log(new_link);
    window.location.href = new_link;

    setTimeout(() => window.location.reload(), 1000);
  };

  onTimeup = () => {
    const {question, questions, index} = this.state;
    if (!question) {
      toast.error('Error when auto next question.');
      return;
    }

    // If timebreak -> call onNextQuestionTimebreak
    if (question.type === 'TIME_BREAK') {
      this.onNextQuestionTimebreak();
      return;
    }

    // set default
    let findIndex = index;
    // Current SPEAKING -> next != SPEAKING
    if (isSpeakingQuestion(question)) {
      for (let i = index; i < questions.length; i++) {
        if (!isSpeakingQuestion(questions[i])) {
          findIndex = i;
          break;
        }
      }
    }

    // Current READING_ -> next != READING_
    else if (isReadingQuestion(question)) {
      for (let i = index; i < questions.length; i++) {
        if (!isReadingQuestion(questions[i])) {
          findIndex = i;
          break;
        }
      }
    }

    // Current WRITING_
    else if (isWritingQuestion(question)) {
      // case WRITING_SUMMARIZE_WRITTEN_TEXT -> WRITING_ESSAY/TIME_BREAK stop
      for (let i = index; i < questions.length; i++) {
        if (question.type !== questions[i].type) {
          findIndex = i;
          break;
        }
      }
    } else if (question.type === 'LISTENING_SUMMARIZE_SPOKEN_TEXT') {
      // case WRITING_SUMMARIZE_WRITTEN_TEXT -> WRITING_ESSAY/TIME_BREAK stop
      findIndex = index + 1;
    }

    // Current LISTENING_ -> next != LISTENING_
    else if (isListeningQuestion(question) && question.type !== 'LISTENING_SUMMARIZE_SPOKEN_TEXT') {
      for (let i = index; i < questions.length; i++) {
        if (!isListeningQuestion(questions[i])) {
          findIndex = i;
          break;
        }
      }
    }

    // Else
    else {
      console.log('Can not calculate next index');
    }

    // spinner + wait save answer
    console.log(`Auto next question with index: ${findIndex}`);
    this.props.sendEvent(EVENT.ON_EXAM);
    this.setState({showSpinner: true});
    if (isSpeakingQuestion(this.state.question)) {
      setTimeout(() => this.onNextQuestion(findIndex), 3000);
    } else {
      setTimeout(() => this.onNextQuestion(findIndex));
    }
  };

  renderNavAndDescription = (examInfo) => {
    let question = this.state.questions[this.state.index];
    return (
      <>
        <div className="pte-test-type-question-two">
          <div className="container" style={{display: "flex"}}>
            <div className="col-md-6" style={{display: "flex", alignItems: "center"}}>
              {/* <img src={"https://old.ptemagicpractice.com/wp-content/uploads/2020/05/New-pte-magic-logo-1.png"}/> */}
              <img src={require("assets/img/logo/whiteptelogo.png")} width={120}/>
            </div>
            <div className="col-md-6">
              <MockTestTimeCounter
                ref={this.timerRef}
                index={this.state.index}
                questions={this.state.questions}
                onTimeup={this.onTimeup}
                examStatus={this.state.examStatus}
                remainTime={this.state.remainTime}
              />
            </div>
          </div>
        </div>
        <div className="mkt-into-header-bottom align-items-center" style={{display: "flex"}}>
          <div className="container" style={{display: "flex"}}>
            <div className="col-md-6" style={{display: "flex", alignItems: "center"}}>
              <div className="grid-icon size-30 bg-topic-target-60 mr-2"></div>
              <div className="pte-test-type-question-two-title">
                <ExamGroupTitleNav examGroup={EXAM_GROUP.MOCK_TEST} question={question}/>
                <span>&nbsp;&nbsp;<i className="fas fa-angle-right"></i>&nbsp;&nbsp;</span>
                <Translate contentKey={'question-type.title.' + question.type}>Title</Translate>
                <span className="hide">{question.type}</span>
              </div>
            </div>
            <div className="col-md-6">
              {question.type !== QUESTION_TYPE.FINISH && question.type !== QUESTION_TYPE.TIME_BREAK &&
              <span className="ml-3 btn-benit-sm btn-benit-default" style={{float: "right"}}>
                    <span className="pte-test-type-question-three-timeName">
                      {question.orderDisplay} / {examInfo.examTypeDTO.totalQuestion}
                    </span>
                  </span>
              }
            </div>
          </div>
        </div>
      </>
    );
  };

  onNextQuestion = (index) => {
    console.log('onNextQuestion mock test');
    let question = this.state.questions[index];
    this.setState({question, index, showSpinner: false});

    setTimeout(() => {
      this.props.context.onUpdateShareExamContext({
        index: this.state.index
      });
    });
  };

  onCompletedQuestion = () => {
    console.log(`onCompletedQuestion with index ${this.state.index + 1}`);
    // Save progress
    let remainTime = this.timerRef.current.getRemainTime();
    console.log(`remain time, ${remainTime}`)
    saveExamProgress(this.props.examInfo.examDTO.id, this.state.index + 1, remainTime);

    let index = this.state.index + 1;
    this.props.sendEvent(EVENT.ON_EXAM);
    this.setState({showSpinner: true});
    if (isSpeakingQuestion(this.state.question)) {
      setTimeout(() => this.onNextQuestion(index), 3000);
    } else {
      setTimeout(() => this.onNextQuestion(index));
    }
  };

  render() {
    const {examInfo} = this.props;
    const {question, showSpinner, mockTestIntro} = this.state;
    let status = null
    if (examInfo) {
      status = examInfo.examDTO.result
    }

    return (
      <>
        {
          mockTestIntro && status != "INPROGRESS"
            ?
            (
              <MockTestIntro handleStart={async () => {
                await this.props.startMockTest({examTypeId: this.state.examTypeId});
                this.setState({mockTestIntro: false})
              }}/>
            )
            :
            (
              <>
                {examInfo && this.renderNavAndDescription(examInfo)}
                {examInfo && question && this.state.waitLoading ?
                  <>
                    <div className="container margin-top30 position-relative">
                      <Col md="12" className="padding0 m-b-70">
                        <QuestionDescription questionType={question.type}/>
                        <QuestionLayout
                          exam={examInfo.examDTO}
                          question={question}
                          examGroup={EXAM_GROUP.MOCK_TEST}
                          index={this.state.index}
                          remainTime={1000}
                          onUploadRecording={this.props.onUploadRecording}
                        />
                      </Col>
                    </div>
                    <ExamSidebarRight examGroup={EXAM_GROUP.MOCK_TEST}
                                      index={this.state.index} questions={examInfo.questions}/>
                  </>
                  :
                  <>
                    <PteLoadingSpinner/>
                  </>
                }
                <div className="display-flex justify-content-center mkt-footer">
                  <div className="container display-flex align-items-center ">
                    <Col md="12" className="padding0">
                      <PteActionButton
                        {...this.props}
                        {...this.state}
                        handlerCompleted={this.onCompletedQuestion}
                        onNextQuestionTimebreak={this.onNextQuestionTimebreak}
                      />
                    </Col>
                  </div>
                </div>
                {showSpinner && <PteLoadingSpinner/>}
              </>
            )
        }
      </>
    );
  }
}
