import React, { Component } from "react";
// reactstrap components
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Button,
  Media,
  Progress,
  Row,
} from "reactstrap";

import { Button as ButtonMT } from "@material-ui/core";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// connect
import queryString from "query-string";
import { withRouter, Link } from "react-router-dom";
import BenitHeader from "src/components/Headers/BenitHeader";
import { pagination, randomProgress } from "src/utils/common-utils";
import { Translate } from "src/utils/language/translate";
import {
  QUESTION_PACK_NUMBER,
  SERVER_API_URL,
  APP_TIMESTAMP_FORMAT,
} from "src/config/constants";
import connect from "redux-connect-decorator";
import { IRootState } from "../../../../reducers";
import { getExamHistory } from "src/reducers/account";
import { scoreMock, getAll } from "src/reducers/mock_test";
import moment from "moment";
import ExamDescription from "user/other/ExamDescription";
import tracks from "src/components/CustomPostcardPlayer/tracks";
import Grid from "@material-ui/core/Grid";
import AudioPlayer from "../../../../components/CustomPostcardPlayer/AudioPlayer";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Dialog from "@material-ui/core/Dialog";
import NewMagicShop from "user/payment/NewMagicShop";
// @ts-ignore
import startMock from "../../../../assets/img/gif/mock_test_start.gif";
// @ts-ignore
import warningMock from "../../../../assets/img/gif/mock_test_warning.gif";
// @ts-ignore
import purchaseMock from "../../../../assets/img/gif/mock_test_purchase.gif";
// @ts-ignore
import resumeMock from "../../../../assets/img/gif/mock_test_resume.gif";
import MaterialTable from "material-table";
import Paging from "../../components/Paging";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@yisheng90/react-loading";
// @ts-ignore
import CancelDialog from "user/other/CancelDialog";
import { resetExam } from "src/reducers/exam";
import CircularProgress from "@material-ui/core/CircularProgress";

const { SearchBar } = Search;

const formatScore = (row) => {
  //   comListening: 0
  // comReading: 0
  // comSpeaking: 0
  // comWriting: 0
  const overall = (
    (row.exam.comListening +
      row.exam.comReading +
      row.exam.comSpeaking +
      row.exam.comWriting) /
    4
  ).toFixed(0);
  const status = row.exam.result;
  // const progress = randomProgress();
  return (
    <>
      <div className="col">
        {status === "SCORED" || status === "DONE" ? (
          <>
            <small className="text-black">Overall: {overall} point</small>
          </>
        ) : (
          "--"
        )}
      </div>
    </>
  );
};

const formatStatus = (row) => {
  console.log(row);
  const status = row.exam.result;
  let bgStatus;
  switch (status) {
    case "NO_TEST":
      bgStatus = "bg-darker";
      break;
    case "INPROGRESS":
      bgStatus = "bg-info";
      break;
    case "FINISH":
    case "MARKING":
      bgStatus = "bg-success";
      break;
    case "SCORED":
    case "DONE":
      bgStatus = "bg-primary";
      break;
    case "WAIT_SCORE":
    case "SCORING":
      bgStatus = "bg-danger";
      break;
    default:
      break;
  }
  if (status == "INPROGRESS") {
    let progress = (
      (row.exam.currentQuestion / (row.examType.totalQuestion + 4)) *
      100
    ).toFixed(0);
    return (
      <div className="col ml--3">
        <small className="text-black">
          <span className="badge-dot badge badge-">
            <i className={`${bgStatus}`}></i>
            <span className="status">
              <Translate contentKey={"mock-test.status." + status}>
                Title
              </Translate>
              : {progress}%
            </span>
          </span>
        </small>
        <Progress
          className="progress-xs my-2"
          max="100"
          value={progress}
          color="black"
        />
      </div>
    );
  } else if (status == "CANCELED") {
    return (
      <span className="badge-dot mr-4 badge badge-">
        {/*<i className={ `${bgStatus}`}></i>*/}
        <span className="status">CANCELED</span>
      </span>
    );
  } else {
    return (
      <span className="badge-dot mr-4 badge badge-">
        <i className={`${bgStatus}`}></i>
        <span className="status">
          <Translate contentKey={"mock-test.status." + status}>Title</Translate>
        </span>
      </span>
    );
  }
};

const formatCreatedDate = (row) => {
  return (
    <>
      <span>{moment(row.exam.createdDate).format(APP_TIMESTAMP_FORMAT)}</span>
    </>
  );
};

@connect(
  ({ account, acl, mockTest }: IRootState) => ({
    data: account.examHistory,
    acl: acl.acl,
    mockTests: mockTest.mockTests,
  }),
  {
    getExamHistory,
    scoreMock,
    getAll,
    resetExam,
  }
)
class ExamHistory extends Component<any, any> {
  state = {
    data: [],
    examTypeId: queryString.parse(this.props.location.search).id,
    open: false,
    purchaseState: false,
    page: 1,
    pageSize: 5,
    cancelOpen: false,
    loading: false
  };

  componentDidMount() {
    this.setState({loading: true})
    // Build package
    this.props.getAll().then(() => {
      this.setState({loading: false})
    });
    this.props.getExamHistory(this.state.examTypeId);
  }

  componentWillUnmount() {
    // this.props.reset();
  }

  constructor(props) {
    super(props);
  }

  formatName = (cell) => {
    return (
      <Media className="align-items-center">
        <a className="topic mr-3" onClick={(e) => e.preventDefault()}>
          <div className="grid-icon icon-mock"></div>
        </a>
        <Media>
          <span className="name mb-0 text-sm">
            {cell.examType.name.toUpperCase()}
          </span>
        </Media>
      </Media>
    );
  };

  onScoreMock = (row) => {
    this.props.scoreMock(row.exam.id);
  };

  addActionButton = (row) => {
    console.log(row);
    
    return (
      <div className="table-actions" style={{ display: "flex" }}>
        {(row.exam.result === "SCORED" || row.exam.result === "DONE") && (
          <>
            <Link
              to={`/platform/user/score_report?id=${row.exam.id}`}
              className=""
            >
              <Button
                className="btn-benit-sm btn-benit-default mr-2"
                color="info"
                type="button"
              >
                <span className="btn-inner--icon mr-1">
                  <i className="far fa-edit" />
                </span>
                <span className="btn-inner--text hidden-lg-down">Report</span>
              </Button>
            </Link>
            <Link
              to={`/platform/user/exam_detail?id=${row.exam.id}`}
              className=""
            >
              <Button
                className="btn-benit-sm btn-benit-blue mr-2"
                color="info"
                type="button"
              >
                <span className="btn-inner--icon mr-1">
                  <i className="fas fa-info" />
                </span>
                <span className="btn-inner--text hidden-lg-down">Result</span>
              </Button>
            </Link>
          </>
        )}
        {this.props.acl.numberScoreMock > 0 && row.exam.result === "FINISH" && (
          <>
            <Button
              className="btn-benit-sm btn-benit-default mr-2"
              color="info"
              type="button"
              onClick={() => this.onScoreMock(row)}
              disabled={this.props.acl.numberScoreMock === 0}
            >
              <span className="btn-inner--icon mr-1">
                <i className="far fa-edit" />
              </span>
              <span className="btn-inner--text hidden-lg-down">Score</span>
            </Button>
          </>
        )}
      </div>
    );
  };

  rowStyle = (row, rowIndex) => {
    // if (!row.actived) {
    //   return { opacity : '0.5' };
    // }
    return {};
  };

  onConfirmStartExam = (e, row) => {
    // <Link to={ `/exam/mock_test?type=${row.id}` }>
    e.preventDefault();
    this.setState({
      open: true,
    });
    // confirmAlert({
    //   title: 'Start a new exam',
    //   message: `Are you sure to start new Mock Test? You will have ${this.props.acl.numberExamMock - 1} times left to do Mock Test.`,
    //   buttons: [
    //     {
    //       label: 'Yes',
    //       onClick: () => {
    //         this.props.history.push(`/platform/exam/mock_test?type=${row.id}`);
    //       }
    //     },
    //     {
    //       label: 'No',
    //       onClick: null
    //     }
    //   ]
    // });
  };

  onPageChange = (page, pageSize) => {
    this.setState({
      page,
      pageSize,
    });
  };

  resetExam = async (data) => {
    const exam = {
      id: data.id,
      examTypeId: data.examHistory.examId,
    };
    console.log(data);
    if (exam.id != null) {
      await this.props.resetExam(exam);
      window.location.reload();
    }
  };

  render() {
    const { data, mockTests } = this.props;
    const { open, purchaseState, page, pageSize } = this.state;
    let mockTest = null;
    let status = null;
    if (mockTests) {
      mockTest = mockTests.filter((mt) => mt.id == this.state.examTypeId);
    }
    mockTest = mockTest[0];
    status = mockTest ? mockTest.examHistory.status : "";
    console.log(data)
    const columns = [
      {
        field: "examType.name",
        title: "Mock Name",
        sort: true,
        render: (record) => {
          return this.formatName(record);
        },
      },
      {
        field: "status",
        title: "Status",
        sort: true,
        render: (record) => {
          return formatStatus(record);
        },
      },
      {
        field: "score",
        title: "Score",
        sort: true,
        render: (record) => {
          return formatScore(record);
        },
      },
      {
        field: "exam.createdDate",
        title: "Created Date",
        sort: true,
        render: (record) => {
          return formatCreatedDate(record);
        },
      },
      {
        field: "view",
        title: "View",
        searchable: false,
        sort: false,
        render: (record) => {
          return this.addActionButton(record);
        },
      },
    ];

    return (
      <>
        <CancelDialog
          open={this.state.cancelOpen}
          mockTest={mockTest}
          close={() => {
            this.setState({ cancelOpen: false, open: true });
          }}
          resetExam={() => {
            this.resetExam(mockTest);
          }}
        />
        <Dialog
          fullScreen
          open={open}
          onClose={() => {
            this.setState({ open: false });
          }}
          className="mkt-dialog"
        >
          <div className="mkt-dialog-box">
            <div className="mkt-dialog-icon">
              {purchaseState ? (
                <img
                  src={purchaseMock}
                  alt="Purchase Mock"
                  className="mkt-dialog-image"
                />
              ) : status == "NO_TEST" ? (
                this.props.acl.numberExamMock > 0 ? (
                  <img
                    src={startMock}
                    alt="Start Mock"
                    className="mkt-dialog-image"
                  />
                ) : (
                  <img
                    src={warningMock}
                    alt="Warning Mock"
                    className="mkt-dialog-image"
                  />
                )
              ) : ""}
              {status == "INPROGRESS" ? (
                <img
                  src={resumeMock}
                  alt="Resume Mock"
                  className="mkt-dialog-image"
                />
              ) : (
                ""
              )}
            </div>
            <div className="mkt-dialog-title">
              {status == "INPROGRESS" && !purchaseState
                ? "Resume your exam"
                : ""}

              {status == "NO_TEST" && !purchaseState ? "Start a new exam" : ""}

              {purchaseState ? "Magic shop" : ""}
            </div>
            {status == "INPROGRESS" ? (
              <>
                <div className="mkt-dialog-ticket">
                  {mockTest ? mockTest.name : ""}
                </div>
                <div className="mkt-dialog-content">
                  You can resume this Mock Test!
                </div>
              </>
            ) : purchaseState ? (
              <NewMagicShop title={false} />
            ) : (
              <>
                <div className="mkt-dialog-ticket">
                  {mockTest ? mockTest.name : ""}
                </div>
                <div className="mkt-dialog-content">
                  {this.props.acl.numberExamMock > 0
                    ? `Are you sure to start new Mock Test? Your account will be deducted 1 time of Mock Test.`
                    : `You need to purchase more mock test.You need to purchase more mock test.`}
                </div>
              </>
            )}
            <div className="mkt-dialog-button">
              {status == "INPROGRESS" ? (
                <>
                  <ButtonMT
                    className="mkt-dialog-start-button"
                    onClick={() => {
                      this.props.history.push(
                        `/platform/exam/mock_test?examid=${mockTest.examHistory.examId}`
                      );
                    }}
                  >
                    Resume
                  </ButtonMT>
                  <ButtonMT
                    className="mkt-dialog-cancel-button"
                    onClick={() => {
                      this.setState({ cancelOpen: true, open: false });
                    }}
                  >
                    Reset this mock test
                  </ButtonMT>
                </>
              ) : !purchaseState ? (
                this.props.acl.numberExamMock > 0 ? (
                  <ButtonMT
                    className="mkt-dialog-start-button"
                    onClick={() => {
                      this.props.history.push(
                        `/platform/exam/mock_test?type=${mockTest.id}`
                      );
                    }}
                  >
                    Start
                  </ButtonMT>
                ) : (
                  <ButtonMT
                    className="mkt-dialog-purchase-button"
                    onClick={() => {
                      this.setState({
                        purchaseState: true,
                      });
                    }}
                  >
                    Purchase more mock test
                  </ButtonMT>
                )
              ) : (
                ""
              )}
              <ButtonMT
                className={
                  purchaseState
                    ? "mkt-dialog-return-button-purchase mkt-dialog-return-button"
                    : "mkt-dialog-return-button"
                }
                onClick={() => {
                  this.setState({ open: false, purchaseState: false });
                }}
              >
                Return to your mock test
              </ButtonMT>
            </div>
          </div>
        </Dialog>

        <Grid item style={{ marginBottom: 16 }}>
          <div className="col question-header">
            <h3 className="question-title">
              {mockTest != undefined ? `${mockTest.name}` : ""}
            </h3>
          </div>
          {/*{this.state.type === "listening" && (*/}
          <ExamDescription
            overview={
              <>
                <p className="questions-description">
                  This AI practice test comprises of 4 modules in PTE Academic:
                  Speaking, Writing, Reading and Listening. There should be on
                  average 70-75 questions and test timing is set in the
                  analogous pattern as the actual test, which would help the
                  candidates to know what to expect on the test day and check
                  their skills level.
                </p>
                <br />
                <p className="questions-description">
                  The test replicates the real exam format and upon completion,
                  a full score report will be generated. The test-taker should
                  be able to check their answers to identify areas for
                  improvement.
                </p>
              </>
            }
            details={
              <>
                <p className="questions-description">
                  The following scores should be displayed on the score report:
                </p>
                <p className="questions-description">- Communicative scores:</p>
                <ul className="questions-lists">
                  <li>Speaking</li>
                  <li>Writing</li>
                  <li>Reading</li>
                  <li>Listening</li>
                </ul>
                <p className="questions-description">- Enabling scores:</p>
                <ul className="questions-lists">
                  <li>Grammar</li>
                  <li>Fluency</li>
                  <li>Pronunciation</li>
                  <li>Vocabulary</li>
                  <li>Spelling</li>
                  <li>Written Discourse</li>
                </ul>
              </>
            }
            decoration={
              <>
                <div className="mkt-box">
                  <div className="mkt-box-content">
                    <div className="mkt-list-button">
                      {status === "INPROGRESS"
                        ?
                        (
                        <ButtonMT
                          className="mkt-inprogress-btn mkt-btn"
                          startIcon={<PauseIcon />}
                          onClick={(e) => this.onConfirmStartExam(e, mockTest)}
                          disabled={this.state.loading}
                        >
                          {
                            this.state.loading ? (
                              <CircularProgress
                                size={20}
                                style={{ marginRight: 15 }}
                              />
                            ) : status
                          }
                        </ButtonMT>
                      )
                        :
                      (
                        <ButtonMT
                          className="mkt-start-btn mkt-btn"
                          startIcon={<PlayArrowIcon />}
                          onClick={(e) => this.onConfirmStartExam(e, mockTest)}
                          disabled={this.state.loading}
                        >

                          {
                            this.state.loading ? (
                              <CircularProgress
                                size={20}
                                style={{ marginRight: 15 }}
                              />
                            ) : "Start"
                          }
                        </ButtonMT>
                      )}
                    </div>
                    <p className="questions-description">
                      PTE Magic Scored Mock Test will take approximately 3 hours.
                      The test questions are collected from the real exams. Upon
                      completion the candidate might check the scores breakdown.
                    </p>
                  </div>
                </div>
              </>
            }
          />
          {/*)}*/}
        </Grid>
        <Card className="card-profile-payment">
          <div className="card-payment-head">
            <h5 className="h3 mb-0">Exam history</h5>
          </div>
          <CardContent>
            <>
              {data && (
                <>
                  <MaterialTable
                    title={null}
                    data={data}
                    columns={columns}
                    options={{
                      paging: false,
                      pageSize: 10,
                      search: false,
                      toolbar: false,
                      sorting: false,
                    }}
                  />
                  <Paging
                    total={data.length}
                    page={page}
                    limit={pageSize}
                    onChange={this.onPageChange}
                  />
                </>
              )}
            </>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default ExamHistory;
