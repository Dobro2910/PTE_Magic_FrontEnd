import React from "react";
import _ from "lodash";
import connect from "redux-connect-decorator";
import { IRootState } from "src/reducers";
import {
  getQuestionByType,
  resetQuestion,
  getQuestionRepeatedByType,
} from "src/reducers/question";
import { QuestionDescription, ExamGroupTitleNav } from "../exam-components";
import queryString from "query-string";
import QuestionLayout from "../question-layout";
import {
  EXAM_GROUP,
  TIME_REMAINING_QUESTION_BANK,
  QUESTION_PACK_NUMBER,
  EVENT,
  AI_QUESTION_TYPES,
  AVATAR_DEFAULT,
} from "src/config/constants";
import { PteLoadingSpinner } from "../../../components/LoadingSpinner/pte-loading-spinner";
import { uploadRecorder } from "src/reducers/exam";
import { Translate } from "src/utils/language/translate";
import PteActionButton from "../components/common/pte-action-button";
import {
  resetStore,
  sendEvent,
  initStore,
  storedAnswer,
  clearAnswer,
  storeRecordStatus,
} from "src/reducers/store";
import BankTimeCounter from "./BankTimeCounter";
import PteAmswer from "../components/common/pte-answer";
import withExamSharedContext from "src/views/pages/components/withExamSharedContext";
import { getAccessControlList } from "src/reducers/acl";
import withUploading from "src/views/pages/components/withUploading";
import PteBookmark from "../components/common/pte-bookmark";
import "../components/common/pte-question-number.scss";
import Discussion from "./components/MainDiscussion";
import MainDiscussion from "./components/MainDiscussion";
import Footer from "src/components/Footers/Footer";
import { hasAnyAuthority, truncateText } from "src/utils/common-utils";
import { Link, Route } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Nav,
  Col,
  NavbarBrand,
} from "reactstrap";
import Image from "react-image-webp";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

export interface IQuestionBankState {
  page: number;
  size: number;
  sort: string;
  type: string;
  repeated: any;
  total: number;
  examGroup: string;
  index: number;
  question: any;
  questions: any;
  groupTitle: string;
  showAnswer: boolean;
  waitLoading: boolean;
}

@connect(
  ({ authentication, question, store, acl }: IRootState) => ({
    questions: question.questions,
    totalItems: question.totalItems,
    questionsRepeated: question.questionsRepeated,
    acl: acl.acl,
    event: store.event,
    gotoIndex: store.gotoIndex,
    user: authentication.user,
    isAdmin: hasAnyAuthority(authentication.user.authorities, ["ROLE_ADMIN"]),
  }),
  {
    uploadRecorder,
    getQuestionByType,
    getQuestionRepeatedByType,
    sendEvent,
    storedAnswer,
    clearAnswer,
    resetQuestion,
    getAccessControlList,
    storeRecordStatus,
  }
)
@withUploading()
@withExamSharedContext()
export default class QuestionBank extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onNextQuestion = this.onNextQuestion.bind(this);
    this.onCurrentQuestion = this.onCurrentQuestion.bind(this);
    this.onGotoQuestion = this.onGotoQuestion.bind(this);
    this.pteAnswerRef = React.createRef();
  }

  state: IQuestionBankState = {
    page: parseInt(
      queryString.parse(this.props.location.search).page.toString()
    ),
    size: QUESTION_PACK_NUMBER,
    sort: "id,asc",
    type: queryString.parse(this.props.location.search).type.toString(),
    total: parseInt(
      queryString.parse(this.props.location.search).total.toString()
    ),
    // timeRemaining: 0,
    examGroup:
      queryString.parse(this.props.location.search).repeated === "true"
        ? EXAM_GROUP.REPEATED_QUESTION
        : EXAM_GROUP.QUESTION_BANK,
    index: queryString.parse(this.props.location.search).index
      ? parseInt(queryString.parse(this.props.location.search).index.toString())
      : 0,
    question: null,
    questions: null,
    groupTitle: null,
    repeated: queryString.parse(this.props.location.search).repeated,
    showAnswer: false,
    waitLoading: false,
  };

  pteAnswerRef;

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showAnswer) {
      // this.pteAnswerRef.scrollTop = this.pteAnswerRef.scrollHeight + 200;
      if (this.pteAnswerRef) {
        this.pteAnswerRef.scrollIntoView(false);
      }
    }
    if (prevState.showAnswer !== this.state.showAnswer) {
      // console.log(this.state.showAnswer)
    }
  }

  async componentDidMount() {
    const { page, size, sort, type, total, repeated } = this.state;
    let examGroup;
    if (repeated === "true") {
      examGroup = EXAM_GROUP.REPEATED_QUESTION;
      // Except repeated
      await this.props.getQuestionRepeatedByType(page, total, sort, type);
    } else {
      examGroup = EXAM_GROUP.QUESTION_BANK;
      // Get all
      await this.props.getQuestionByType(page, total, sort, type);
    }
    this.setState({ examGroup }, () =>
      setTimeout(() => {
        this.props.context.onUpdateShareExamContext({
          examGroup: examGroup,
          type: this.state.type,
          index: this.state.index,
          page: this.state.page,
          total: this.state.total,
          question: this.state.question,
          questions: this.state.questions,
        });
      })
    );

    setTimeout(() => {
      this.setState({ waitLoading: true });
    }, 700);
  }

  componentWillUnmount() {
    this.props.resetQuestion();
    document.body.classList.add("g-sidenav-pinned");
    document.body.classList.remove("g-sidenav-hidden");
  }

  componentWillReceiveProps({ questions, event, gotoIndex, context }) {
    if (!this.props.questions || this.props.questions.length === 0) {
      // tslint:disable-next-line
      const question = questions[this.state.index];

      this.setState({ questions, question });
    }

    if (event === EVENT.ON_GO_QUESTION && gotoIndex != null) {
      this.onGotoQuestion(gotoIndex);
    }
  }

  onNextQuestion = () => {
    // tslint:disable-next-line

    let index = this.state.index + 1;
    console.log("this.props.questions.length::", this.props.questions.length);
    if (index >= 20) {
      if (this.props.acl && this.props.acl.subscriptionDays == 0) return;
    }

    if (this.props.questions && index >= this.props.questions.length) return;

    this.onGotoQuestion(index);
  };

  onBackQuestion = () => {
    // tslint:disable-next-line
    let index = this.state.index - 1;
    this.onGotoQuestion(index);
  };

  onGotoQuestion = (index) => {
    // tslint:disable-next-line
    if (this.props.context.examGroup === EXAM_GROUP.QUESTION_BANK) {
      let question = this.props.questions[index];
      this.setState({ question, index, showAnswer: false });
      this.props.sendEvent(null, {
        googleAnswer: null,
        audioSrc: null,
        blob: null,
        blobRecoder: null,
      });
      this.props.storedAnswer({ question });
      this.props.storeRecordStatus(null);

      this.props.context.onUpdateShareExamContext({
        index,
        question,
      });
    } else if (this.props.context.examGroup === EXAM_GROUP.REPEATED_QUESTION) {
      let question = this.props.questionsRepeated[index];
      this.setState({ question, index, showAnswer: false });
      this.props.sendEvent(null, {
        googleAnswer: null,
        audioSrc: null,
        blob: null,
        blobRecoder: null,
      });
      this.props.storedAnswer({ question });
      this.props.storeRecordStatus(null);

      this.props.context.onUpdateShareExamContext({
        index,
        question,
      });
    }

    // this.onRefreshCountdown(question);
    // reset
  };

  onCurrentQuestion = () => {
    // tslint:disable-next-line

    this.setState({ question: null });
    setTimeout(
      function () {
        let question = this.props.questions[this.state.index];
        this.setState({ question, showAnswer: false });
      }.bind(this)
    );
  };

  renderNavAndDescription = (question, acl) => {
    return (
      <>
        <div className="pte-test-type-question-two-qb">
          <div className="container">
            <div className="col-md-12">
              <Link to="/platform/user/home">
                <NavbarBrand to="/" className="nav-benit">
                  <Image
                    src={require("assets/img/logo/pte-logo-yellow.png")}
                    webp={require("assets/img/logo/pte-logo-yellow.png")}
                    className="pte-logo"
                  />
                </NavbarBrand>
              </Link>
              <div className="pte-test-type-question-two-title">
                <Translate contentKey={"question-type.title." + question.type}>
                  Title{" "}
                </Translate>
                <span className="hide">{question.type}</span>
              </div>
              <div className="pte-account">
                <Nav className="align-items-center ml-auto ml-md-0" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownMenu right>
                      <DropdownItem className="noti-title" header tag="div">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          className="dropdown-item padding-dropdown-item"
                          to="/platform/user/home"
                        >
                          <i className="ni ni-shop" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          className="dropdown-item padding-dropdown-item"
                          to="/platform/user/change_password"
                        >
                          <i className="ni ni-lock-circle-open" />
                          <span>Change password</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          className="dropdown-item padding-dropdown-item"
                          to="/platform/user/profile"
                        >
                          <i className="ni ni-single-02" />
                          <span>My profile</span>
                        </Link>
                      </DropdownItem>
                      {this.props.isAdmin && (
                        <DropdownItem>
                          <Link
                            className="dropdown-item padding-dropdown-item"
                            to="/admin/dashboard"
                          >
                            <i className="ni ni-settings-gear-65" />
                            <span>Administration</span>
                          </Link>
                        </DropdownItem>
                      )}
                      <DropdownItem divider />
                      <DropdownItem>
                        <Link
                          className="dropdown-item padding-dropdown-item"
                          to="/platform/auth/logout"
                        >
                          <i className="ni ni-user-run" />
                          <span>Logout</span>
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </div>
              <BankTimeCounter question={question} />
            </div>
          </div>
        </div>
      </>
    );
  };

  onCompletedQuestion = () => {
    this.setState({ showAnswer: false });
    // this.getAnswer();
    this.onNextQuestion();
  };

  onCompletedBackQuestion = () => {
    this.setState({ showAnswer: false });
    // this.getAnswer();
    this.onBackQuestion();
  };

  onShowAnswer = () => {
    this.setState({ showAnswer: true });
  };

  startAgain = () => {
    const index = this.state.index - this.props.context.page * 40;
    console.log(
      `call back ${index}`,
      this.props.context.page,
      this.state.questions
    );
    this.setState({ question: null });
    setTimeout(
      function () {
        let question = this.state.questions[this.state.index];
        this.setState({ question, showAnswer: false });
      }.bind(this)
    );
  };

  render() {
    const { question, showAnswer, index, total, repeated, waitLoading } =
      this.state;
    const { page } = this.props.context;
    const { acl } = this.props;
    const root = {
      background: "#faf5e5 !important",
    };

    return (
      <div style={root}>
        {question && waitLoading ? (
          <div style={root}>
            {this.renderNavAndDescription(question, acl)}

            <div
              className="container position-relative"
              ref={(node) => (this.pteAnswerRef = node)}
            >
              <Col md="12" className="my-1 mb-2"></Col>
              <Col md="12" className="padding0 m-b-70">
                <div className="question-des">
                  <div className="question-number">#{this.state.index + 1}</div>
                  <QuestionDescription questionType={this.state.type} />
                </div>

                <QuestionLayout
                  index={this.state.index}
                  page={page}
                  question={question}
                  examGroup={this.state.examGroup}
                  onCurrentQuestion={this.onCurrentQuestion}
                  onNextQuestion={this.onNextQuestion}
                  onUploadRecording={this.props.onUploadRecording}
                />
                {showAnswer && <PteAmswer />}
                {this.state.question && (
                  <MainDiscussion
                    questionType={question.type}
                    questionId={this.state.question.id}
                  />
                )}
                <PteActionButton
                  {...this.props}
                  {...this.state}
                  handlerCompleted={this.onCompletedQuestion}
                  handlerBackCompleted={this.onCompletedBackQuestion}
                  handlerTryAgain={this.onCurrentQuestion}
                  onShowAnswer={this.onShowAnswer}
                  startAgain={this.startAgain}
                />
              </Col>
            </div>
          </div>
        ) : (
          <PteLoadingSpinner />
        )}
      </div>
    );
  }
}