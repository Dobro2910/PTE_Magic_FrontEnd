import React from "react";
import {
  EXAM_GROUP,
  QUESTION_PACK_NUMBER,
  EVENT,
  QUESTION_TYPE,
  AI_QUESTION_TYPES,
} from "src/config/constants";
import { Button, Modal, Label } from "reactstrap";
import connect from "redux-connect-decorator";
import { IRootState } from "src/reducers";
import {
  resetStore,
  sendEvent,
  initStore,
  clearAnswer,
} from "src/reducers/store";
import { Link } from "react-router-dom";
import { getViewExamLink } from "src/utils/pte-utils";
import { getAccessControlList, aclPlusOne } from "src/reducers/acl";
import ReactLoading from "react-loading";
import {
  isSpeakingQuestion,
  isWritingQuestion,
} from "src/utils/question-utils";
import _ from "lodash";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomButton from "../../../../../../components/CustomButton/Button.js";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Grid from "@material-ui/core/Grid";
import withExamSharedContext from "src/views/pages/components/withExamSharedContext";
@connect(
  ({ store, acl }: IRootState) => ({
    event: store.event,
    statusRecord: store.statusRecord,
    acl: acl.acl,
  }),
  {
    sendEvent,
    resetStore,
    initStore,
    aclPlusOne,
    clearAnswer,
  }
)
@withExamSharedContext()
export default class PteActionButton extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.showAnswer = this.showAnswer.bind(this);
  }

  state = {
    answerOpen: false,
    showRecordBtn: true,
    activeNext: false,
    showTryagainBtn: false,
    showAnswerBtn: true,
    // selectedData: null,
    // defaultModal: null,
    btnDisabledFlag: false,
    showQuestionBankLoading: false,
    btnDisabledAnswerFlag: false,
    restartButton: false,
    isStartButton: true,
  };

  componentWillReceiveProps({ question, acl, event }) {
    // Check acl
    if (acl) {
      if (
        this.props.examGroup === EXAM_GROUP.SCORE_TEST &&
        acl.numberAiScoring + acl.subscriptionAiScoring === 0
      ) {
        // disable all button
        this.setState({ btnDisabledFlag: true });
      }
    }

    if (this.props.question != question) {
      this.onDisableBtnTmp();
      this.setState({ showRecordBtn: true, showTryagainBtn: false });
    }
  }

  onDisableBtnTmp = () => {
    this.setState({ activeNext: false });
    setTimeout(
      function () {
        this.setState({
          activeNext: true,
        });
      }.bind(this),
      3000
    );
  };

  componentDidMount() {
    this.onDisableBtnTmp();
    // Save store redux
    this.props.initStore({
      examGroup: this.props.examGroup,
      question: this.props.question,
    });
  }

  componentWillUnmount() {
    this.props.resetStore();
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ) {
    if (prevState.restartButton !== this.state.restartButton) {
      if (this.state.restartButton === false) {
        this.props.startAgain();
      }
    }
  }

  showAnswer = async () => {
    this.props.clearAnswer();
    // Hide record btn, show Try again button
    this.setState({
      showRecordBtn: false,
      showTryagainBtn: true,
      showAnswerBtn: false,
    });

    if (
      this.props.examGroup == EXAM_GROUP.QUESTION_BANK ||
      this.props.examGroup === EXAM_GROUP.REPEATED_QUESTION
    ) {
      if (isSpeakingQuestion(this.props.question)) {
        this.setState({ showQuestionBankLoading: true });
        await this.delay(1000);
        this.setState({ showQuestionBankLoading: false });
      }
    }

    this.props.sendEvent(null, { googleAnswer: null });
    this.props.context.onUpdateShareExamContext({
      examGroup: this.props.examGroup,
    });
    this.props.sendEvent(EVENT.ON_EXAM);

    // Send event ON_EXAM to redux
    this.props.onShowAnswer();
  };

  onCheckQuestionAvailable = (e, row) => {
    // "We are updating our system for this question"
    if (
      isWritingQuestion(this.props.question) &&
      !this.props.question.phraseHints
    ) {
      this.onConfirmAIScoreUpdating(e, row);
    } else {
      this.onConfirmAnswerAIScore(e, row);
    }
  };

  onConfirmAIScoreUpdating = (e, row) => {
    e.preventDefault();
    confirmAlert({
      title: "Updating system",
      message: `We are updating our system for this question`,
      buttons: [
        {
          label: "Cancel",
          onClick: null,
        },
      ],
    });
  };

  onConfirmAnswerAIScore = (e, row) => {
    e.preventDefault();
    confirmAlert({
      title: "Show AI Scoring",
      message: `Are you sure to use AI Scoring? You will have ${
        this.props.acl.numberAiScoring +
        this.props.acl.subscriptionAiScoring -
        1
      } times left to do AI Scoring.`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.showAnswerAIScore();
          },
        },
        {
          label: "No",
          onClick: null,
        },
      ],
    });
  };

  showAnswerAIScore = async () => {
    this.props.clearAnswer();
    // Hide record btn, show Try again button
    this.setState({
      showRecordBtn: false,
      showTryagainBtn: true,
      showAnswerBtn: false,
      btnDisabledAnswerFlag: true,
    });

    this.props.sendEvent(null, { googleAnswer: null });
    this.props.context.onUpdateShareExamContext({
      examGroup: EXAM_GROUP.SCORE_TEST,
    });
    this.props.sendEvent(EVENT.ON_EXAM);

    // Send event ON_EXAM to redux
    this.props.onShowAnswer();
    this.props.aclPlusOne();
  };

  delay = (t) => {
    return new Promise(function (resolve) {
      setTimeout(resolve, t);
    });
  };

  onSkipWaitRecord = () => {
    this.props.sendEvent(EVENT.ON_SKIP_WAIT_RECORD);
  };

  onRefreshPage = () => {
    const link = getViewExamLink(this.props.examGroup);

    window.location.replace(link);
    setTimeout(() => window.location.reload(), 1000);
  };

  onOpenSidebar = (e) => {
    e.preventDefault();
    this.props.sendEvent(EVENT.OPEN_RIGHT_SIDEBAR);
  };

  onNextButton = () => {
    this.setState({
      showAnswerBtn: true,
      showQuestionBankLoading: false,
      btnDisabledAnswerFlag: false,
      restartButton: false,
      isStartButton: false,
    });
    this.props.handlerCompleted();
  };

  onBackButton = () => {
    this.setState({
      showAnswerBtn: true,
      showQuestionBankLoading: false,
      btnDisabledAnswerFlag: false,
      restartButton: false,
      isStartButton: false,
    });
    this.props.handlerBackCompleted();
  };

  // except mock test
  renderCommonButton = () => {
    const { btnDisabledFlag, showAnswerBtn, btnDisabledAnswerFlag } =
      this.state;
    const { examGroup, question, total, index, acl, page, statusRecord } =
      this.props;
    let aiScore = false;
    if (
      question.type === "SPEAKING_DESCRIBE_IMAGE" ||
      question.type === "SPEAKING_ANSWER_SHORT_QUESTION" ||
      question.type === "SPEAKING_RETELL_LECTURE" ||
      question.type === "SPEAKING_REPEAT_SENTENCE" ||
      question.type === "SPEAKING_READ_ALOUD" ||
      question.type === "WRITING_SUMMARIZE_WRITTEN_TEXT" ||
      question.type === "WRITING_ESSAY"
    ) {
      aiScore = true;
    }
    return (
      <Grid container>
        {/* <Button className={aiScore ? `btn-benit-sm float-left mr-0 btn-benit-red` : `btn-benit-sm float-left mr-0 btn-benit-yellow`}
          disabled={btnDisabledAnswerFlag || !this.state.activeNext || btnDisabledFlag} type="button" onClick={this.showAnswer}>
          <span className="btn-inner--icon mr-1">
            <i className={aiScore ? `fas fa-lightbulb`:`fas fa-info`}></i>
          </span>
         
          <span className="btn-inner--text hidden-lg-down">&nbsp;&nbsp;{aiScore ? "AI Score" : "Answer"}</span>
        </Button> */}

        {/* <FormControlLabel
            className={`btn-benit-sw float-left ml-0 `}
            control={<Switch color="secondary" style={{color:"#ffbe2e"}} />}
            label="Answer"
            disabled={btnDisabledAnswerFlag || !this.state.activeNext || btnDisabledFlag}            
            onClick={() => {
              this.showAnswer();
            }}
          /> */}
        {/* <h5
          className={`btn-benit-sw float-left ml-0 `}
          style={{ marginTop: "8px", fontSize: "14px", lineHeight: "10px" }}
        >
          Answer
        </h5>
        <Switch
          color="secondary"
          className={`btn-benit-sw float-left ml-0 `}
          style={{ color: "#ffbe2e" }}
          disabled={
            btnDisabledAnswerFlag || !this.state.activeNext || btnDisabledFlag
          }
          onClick={() => {
            this.showAnswer();
          }}
        /> */}

        {/* { _.includes(AI_QUESTION_TYPES, question.type) && 
            <>
              { acl && <Button className="btn-benit-sm btn-benit-red float-left" 
                disabled={ !this.state.activeNext || btnDisabledFlag || (acl && (acl.numberAiScoring + acl.subscriptionAiScoring === 0)) } type="button" onClick={this.onCheckQuestionAvailable}>
                <span className="btn-inner--icon mr-1">
                  <i className="far fa-lightbulb"></i>
                </span>
                <span className="btn-inner--text hidden-lg-down">&nbsp;&nbsp;AI Score ({acl.numberAiScoring + acl.subscriptionAiScoring})</span>
              </Button>
              }
            </>
        } */}

        {/*Record button */}
        {/* <Grid
          item
          xs={12}
          style={{
            backgroundColor: "rgb(241, 243, 244)",
            marginBottom: 18,
            padding: 15,
            border: "1px solid #000",
            borderRadius: 5,
          }}
        >
          {question.type === "SPEAKING_READ_ALOUD" ||
          question.type === "SPEAKING_REPEAT_SENTENCE" ||
          question.type === "SPEAKING_DESCRIBE_IMAGE" ||
          question.type === "SPEAKING_RETELL_LECTURE"
            ? this.state.showRecordBtn &&
              statusRecord != "running" &&
              statusRecord != "completed" && (
                <CustomButton
                  style={{
                    borderRadius: "50%",
                    textAlign: "center",
                    backgroundColor: "rgb(218, 220, 228)",
                    border: "1px solid #000",
                    width: 50,
                    height: 50,
                    color: "#000",
                  }}
                  disabled={!this.state.activeNext || btnDisabledFlag}
                  onClick={() => {
                    this.onSkipWaitRecord();
                  }}
                  justIcon
                >
                  <MicNoneIcon fontSize="large" />
                </CustomButton>
              )
            : null}
        </Grid> */}

        <Grid className="responsive-answer-button space-buttons">
          {this.state.showTryagainBtn && (
            <Button
              className="next-button"
              type="button"
              disabled={btnDisabledFlag}
              onClick={() => this.props.handlerTryAgain()}
            >
              Try again
            </Button>
          )}
          {examGroup !== EXAM_GROUP.MOCK_TEST && (
            <>
              {this.props.acl && this.props.acl.subscriptionDays > 0 ? (
                <Button
                  className="next-button"
                  type="button"
                  onClick={() => {
                    this.showAnswer();
                  }}
                >
                  Answer
                </Button>
              ) : (
                <>
                  {this.props.context.page === 0 ? (
                    <Button
                      className="next-button"
                      type="button"
                      onClick={() => {
                        this.showAnswer();
                      }}
                    >
                      Answer
                    </Button>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>Please subscribe for more answers</span>
                      <Link to="/platform/user/shop" className="fit-content">
                        <Button className="subscribe-button">
                          Go to Magic Shop
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {/* question.type !== "LISTENING_DICTATION" &&
             question.type !== "LISTENING_HIGHLIGHT_INCORRECT_WORD" &&
             question.type !== "LISTENING_SUMMARIZE_SPOKEN_TEXT" &&
            question.type !== "WRITING_SUMMARIZE_WRITTEN_TEXT" &&
          question.type !== "WRITING_ESSAY" && */}
        </Grid>
        <Grid item className="space-buttons">
          {examGroup !== EXAM_GROUP.MOCK_TEST && (
            <div className="responsive-button">
              <Button
                style={{ marginRight: 10 }}
                className="previous-button"
                disabled={
                  !this.state.activeNext || btnDisabledFlag || index === 0
                }
                type="button"
                onClick={() => this.onBackButton()}
              >
                Previous
              </Button>
              <Button
                className="next-button"
                disabled={
                  !this.state.activeNext ||
                  btnDisabledFlag ||
                  // index === QUESTION_PACK_NUMBER - 1 ||
                  index === total - 1
                }
                type="button"
                onClick={() => this.onNextButton()}
              >
                Next
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    );
  };

  renderBankButton = () => {
    const { showQuestionBankLoading } = this.state;
    return (
      <>
        {showQuestionBankLoading ? (
          <>
            <div className="text-center">
              <div style={{ display: "flex" }}>
                <ReactLoading
                  type={`bars`}
                  color={`#fc0`}
                  height={"40px"}
                  width={"30px"}
                />
              </div>
            </div>
          </>
        ) : (
          this.renderCommonButton()
        )}
      </>
    );
  };

  renderAiScoringButton = () => {
    const { btnDisabledFlag } = this.state;

    return (
      <>
        {btnDisabledFlag ? (
          <>
            <div className="mt--2" style={{ display: "inline-block" }}>
              <div className="header-icon icon-idea"></div>
              <span className="text-sm text-danger hidden-lg-down">
                Buy Ai Scoring pack to access fully content
              </span>
            </div>
            <Link
              to={getViewExamLink(
                this.props.examGroup,
                this.props.question,
                this.props.total
              )}
            >
              <Button
                className="btn-benit-sm btn-benit-default float-right"
                type="button"
              >
                <span className="btn-inner--icon mr-1">
                  <i className="fas fa-chevron-left"></i>
                </span>
                <span className="btn-inner--text hidden-lg-down">
                  Back&nbsp;&nbsp;
                </span>
              </Button>
            </Link>
          </>
        ) : (
          this.renderCommonButton()
        )}
      </>
    );
  };

  renderMockTestButton = () => {
    const { btnDisabledFlag } = this.state;
    const { examInfo, question } = this.props;
    return (
      <div style={{ alignItems: "center" }}>
        {/* <Label className="float-left"> */}
        {/*<span>{`Exam ID: ${examInfo.examDTO.id}`}</span>*/}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{ marginRight: 10 }}
            className="previous-button"
            type="button"
            onClick={() => {
              this.props.history.push(
                `/platform/user/resource/exam_history?id=${examInfo.examTypeDTO.id}`
              );
            }}
          >
            Save and Exit
          </Button>
          {question.type !== QUESTION_TYPE.TIME_BREAK &&
            question.type !== QUESTION_TYPE.FINISH && (
              // <Button
              //   className="btn-benit-sm btn-benit-yellow float-right"
              //   disabled={!this.state.activeNext || btnDisabledFlag}
              //   type="button"
              //   onClick={() => this.props.handlerCompleted()}
              // >
              //   <span className="btn-inner--text">Next&nbsp;&nbsp;</span>
              //   <span className="btn-inner--icon mr-1">
              //     <i className="fas fa-chevron-right"></i>
              //   </span>
              // </Button>
              <Button
                className="next-button"
                type="button"
                disabled={!this.state.activeNext || btnDisabledFlag}
                onClick={() => this.props.handlerCompleted()}
              >
                Next
              </Button>
            )}
        </div>

        {/* </Label> */}

        {question.type === QUESTION_TYPE.TIME_BREAK && (
          <Button
            className="btn-benit-sm btn-benit-default float-right"
            disabled={!this.state.activeNext || btnDisabledFlag}
            type="button"
            onClick={() => this.props.onNextQuestionTimebreak()}
          >
            <span className="btn-inner--icon mr-4">
              <div className="grid-icon size-30 icon-tea btn-time-break"></div>
            </span>
            <span className="btn-inner--text">&nbsp;&nbsp;Skip Time break</span>
          </Button>
        )}

        {question.type === QUESTION_TYPE.FINISH && (
          <Button
            className="btn-benit-sm btn-benit-default float-right"
            type="button"
            onClick={() => this.onRefreshPage()}
          >
            <span className="btn-inner--icon mr-4">
              <div className="grid-icon size-30 icon-finish btn-time-break"></div>
            </span>
            <span className="btn-inner--text">&nbsp;&nbsp;Finish</span>
          </Button>
        )}

        {/*<Button*/}
        {/*  className="btn-benit-sm btn-benit-yellow float-right d-none d-lg-block mr-2"*/}
        {/*  disabled={!this.state.activeNext || btnDisabledFlag}*/}
        {/*  type="button"*/}
        {/*  onClick={this.onOpenSidebar}*/}
        {/*>*/}
        {/*  <span className="btn-inner--icon mr-1">*/}
        {/*    <i className="size-30 fas fa-bars"></i>*/}
        {/*  </span>*/}
        {/*</Button>*/}
      </div>
    );
  };

  render() {
    const { examGroup } = this.props;
    return (
      <div>
        <div className="view-btn-bottom bg-landingpage">
          {(examGroup === EXAM_GROUP.QUESTION_BANK ||
            examGroup === EXAM_GROUP.REPEATED_QUESTION) &&
            this.renderBankButton()}

          {examGroup === EXAM_GROUP.SCORE_TEST && this.renderAiScoringButton()}

          {examGroup === EXAM_GROUP.MOCK_TEST && this.renderMockTestButton()}
        </div>

        {/* { this.renderModalDialog() } */}
      </div>
    );
  }
}