
import React, { Component } from "react";
// material ui core components
import {
  Card,
  CardHeader,
  Container,
  Button,
  LinearProgress,
  Modal,
  CardMedia,
  Grid
} from "@material-ui/core"
import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
// core components
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// connect
import connect from 'redux-connect-decorator';
import { getAll, scoreMock } from '../../../../reducers/mock_test';
import { getAccessControlList } from '../../../../reducers/acl';
import { IRootState } from '../../../../reducers';
import BenitHeader from 'src/components/Headers/BenitHeader';
import { Link, withRouter } from 'react-router-dom';
import { Translate } from 'src/utils/language/translate';
import {QUESTION_TYPE_FULL, SERVER_API_URL} from 'src/config/constants';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Skeleton from '@yisheng90/react-loading';
import moment from 'moment';
import QuestionBankDescription from "user/view_exam/QuestionBankDescription";
import tracks from "src/components/CustomPostcardPlayer/tracks";
import AudioPlayer from "../../../../components/CustomPostcardPlayer/AudioPlayer";
import CardContent from "@material-ui/core/CardContent";
import {calculateProgress} from "src/utils/common-utils";
import {getExamActivity, getExamHistory} from "src/reducers/account";

const mockTest = require("assets/img/gif/mock-test.gif")
const { SearchBar } = Search;

const formatName = (cell, row) => {
  return (
  <Grid container direction="row">
    <Grid item className="align-self-center">
      <CardMedia>
        <div className="name text-sm ml-3">
            { cell.toUpperCase() }
        </div>
      </CardMedia>
    </Grid>
  </Grid>
  )
}

const formatStatus = (cell, row) => {
  const status = row.examHistory.status;
  let classStatus;
  switch (status) {
    case "NO_TEST" :
      classStatus = "st-no-test"
      break;
    case "INPROGRESS" :
      classStatus = "st-progress"
      break;
    case "FINISH" :
      classStatus = "bg-success"
      break;
    case "SCORED" :
      classStatus = "st-scored"
      break
    case "DONE" :
      classStatus = "bg-primary"
      break;
    case "WAIT_SCORE" :
      classStatus = "bg-danger"
      break;
    default :
      break;
  }
  return <span className="badge-dot mr-4 badge badge-">
          <Button
            variant="contained"
            color="default"
            className={`${classStatus} status-style`}
            // startIcon={<CloudUploadIcon />}
          >
         <span className="status"><Translate contentKey={'mock-test.status.' + status}>Title</Translate></span>
          </Button>

        </span>;
}

const BadgeCode = (props) => {
  return (
    <>
      <Grid container direction="row" spacing={1}>
        <Grid item>
          <div className="category-shortname">
            {QUESTION_TYPE_FULL[props.questionType].code}
          </div>
        </Grid>
        <Grid item>
          <div className="imgAI"></div>
        </Grid>
      </Grid>
    </>
  );
};

// const useStyles = makeStyles((theme: Theme) => createStyles({
//   colorPrimary: {
//     backgroundColor: 'white',
//   },
//   barColorPrimary: {
//     backgroundColor: '#ffbe2e',
//   },
// }));


// const StyledProgress = withStyles(useStyles)(formatScore);

@connect(
  ({ account, mockTest, acl }: IRootState) => ({
    data: mockTest.mockTests,
    loading: mockTest.loading,
    acl: acl.acl
  }),
  {
    getAccessControlList,
    getAll,
    scoreMock
  }
)
class MockTestList extends Component<any, any> {
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.props.getAll();
    this.props.getAccessControlList();
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedData: null,
      defaultModal: null,
    };
    this.onShowInfo = this.onShowInfo.bind(this);
  }

  addActionButton = (cell, row) => {
    const status = row.examHistory.status;
    // const sendMailId = row.examHistory.logSendMailId ? row.examHistory.logSendMailId : null;
    // const reportId = row.examHistory.reportId;

    return (
        <div className="table-actions">
            {/* <Link to={ '/user/home' } >
              <Button className="btn-benit-sm btn-benit-yellow mr-2">
                <span className="btn-inner--icon mr-1">
                  <i className="fas fa-cart-plus" />
                </span>
                <span className="btn-inner--text hidden-lg-down">Buy</span>
              </Button>
            </Link> */}
            { ( status === 'NO_TEST' && this.props.acl.numberExamMock > 0 ) &&
              <Button className="btn-benit-sm btn-benit-yellow mr-2" type="button"
                onClick={e =>  this.onConfirmStartExam(e, row) }
                disabled={ this.props.acl.numberExamMock === 0}>
                <span className="btn-inner--icon">
                  <i className="fas fa-play" />
                </span>
                <span className="ml-1 btn-inner--text hidden-lg-down">Start</span>
              </Button>
            }
            { status === 'INPROGRESS' &&
                <Button className="btn-benit-sm btn-benit-white mr-2" type="button"
                  onClick={() =>  this.onResumeMock(row) }
                >
                  <span className="btn-inner--icon mr-2">
                    <i className="fas fa-pause" />
                  </span>
                  <span className="btn-inner--text hidden-lg-down">Resume</span>
                </Button>
            }
            <Link to={`/platform/user/resource/exam_history?id=${row.id}`}  className="">
                <Button className="btn-benit-sm btn-benit-red mr-2" color="primary" type="button">
                  <span className="btn-inner--icon mr-1">
                    <i className="far fa-chart-bar" />
                  </span>
                  <span className="btn-inner--text hidden-lg-down">History</span>
                </Button>
            </Link>
            { this.props.acl.numberScoreMock > 0 && status === 'FINISH' && 
                <Button className="btn-benit-sm btn-benit-default mr-2" type="button"
                  onClick={ () => this.onScoreMock(row)}
                  disabled={ this.props.acl.numberScoreMock === 0}>
                  <span className="btn-inner--icon mr-1">
                    <i className="far fa-edit" />
                  </span>
                  <span className="btn-inner--text hidden-lg-down">Score</span>
                </Button>
            }
        </div>
    )
  }

  onConfirmStartExam = (e, row) => {
    // <Link to={ `/exam/mock_test?type=${row.id}` }>
    e.preventDefault();
    confirmAlert({
      title: 'Start a new exam',
      // message: `Are you sure to start new Mock Test? You will have ${this.props.acl.numberExamMock - 1} times left to do Mock Test.`,
      message: `Are you sure to start new Mock Test? Your account will be deducted 1 time of Mock Test.`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.history.push(`/platform/exam/mock_test?type=${row.id}`);
          }
        },
        {
          label: 'No',
          onClick: null
        }
      ]
    });
  }

  rowStyle = (row, rowIndex) => {
    const { acl } = this.props;
    if (acl.numberScoreMock === 0 && acl.numberExamMock === 0) {
      return { opacity : '0.5' };
    }
    return {};
  }

  // // <Link to={ `/exam/mock_test?examid=${row.examHistory.examId}` }>
  onResumeMock = (row) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui-pte">
            <h1 style={{ color: 'white'}}>Resume exam</h1>
            <div style={{ fontSize: '18px'}}>
              Are you sure to resume the latest {row.name}?
            </div>
            <div style={{ fontSize: '14px', fontStyle:'italic', color: '#dee2e6 !important'}}>
              To resume previous {row.name} please check out: {' '}
              <a className="confirm-link-resume" href="/platform/user/resource/exam_history">
                this link
              </a>
            </div>
            <div className="confirm-div-btn">
              <button className="btn-benit-sm btn-benit-yellow mr-4" 
              onClick={ () => { this.props.history.push(`/platform/exam/mock_test?examid=${row.examHistory.examId}`); onClose();} }>Yes</button>
              <button className="btn-benit-sm btn-benit-white" onClick={onClose}>No</button>
            </div>
          </div>
        );
      },
      closeOnClickOutside: true
    });
  };

  onScoreMock = (row) => {
    confirmAlert({
      title: 'Confirm score exam',
      message: `Are you sure to score this Mock Test? You will have ${this.props.acl.numberScoreMock - 1} times left for scoring Mock.`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.scoreMock(row.examHistory.examId);
          }
        },
        {
          label: 'No',
          onClick: null
        }
      ]
    });
  }

  onShowInfo = (row) => {
    console.log('onShowInfo');
    this.setState({ selectedData: row });
    this.toggleModal("defaultModal");
  }

  closeModal = () => {
    this.toggleModal("defaultModal");
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  renderInfoModalDialog = () => {
    return (
      <Modal
          // backdrop="static"
        // size="lg"
        className="modal-dialog-centered"
        open={this.state.defaultModal}
        // toggle={() => this.props.toggleModal("defaultModal")}
      >
        <>
          <div className="modal-header">
            <div className="grid-icon size-30 icon-info icon-modal-benit ml-3 mt--1"></div>
            <h6 className="modal-title" id="modal-title-default">
              <div>Mock information</div>
            </h6>
            <button aria-label="Close" className="close" data-dismiss="modal"
                    type="button"
                    onClick={() => this.closeModal()}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>

          <div className="modal-body">
            { this.state.selectedData &&
            <>
              <div>Name: { this.state.selectedData.name }</div>
              <div>Total question: { this.state.selectedData.totalQuestion }</div>
              <div>Created date: { this.state.selectedData.examHistory.createdDate }</div>
            </>
            }
          </div>
          <div className="modal-footer">
            <Button
                data-dismiss="modal"
                className="btn-benit-sm btn-benit-yellow"
                type="button"
                onClick={() => this.closeModal()}
            >
              <span className="btn-inner--text">Close</span>
            </Button>
          </div>
        </>
    </Modal>
    );
  }

  handleStatus = (exam) => {
    switch (exam.mockTestStatus){
      case "ATTEMPTED":
        return (
            <div className="attempted-status">
              ATTEMPTED
            </div>
        )
      case "NOT_YET_TAKEN":
        return (
            <div className="taken-status">
              NOT YET TAKEN
            </div>
        )
      case "RESUME":
        return (
            <div className="resume-status">
              IN PROGRESS
            </div>
        )
      default:
        return (
          <div className="temp-status">
            {exam.mockTestStatus}
          </div>
        )
    }
  }

  render() {
    const { data, loading, acl } = this.props;

    console.log(data)
    return (
      <>
        <Grid item style={{marginBottom: 16}}>
          <div className="col question-header">
            <h3 className="question-title">Mock Test</h3>
          </div>
          {/*{this.state.type === "listening" && (*/}
          <QuestionBankDescription
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
              </>
            }
            details={
              <>
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
            decoration={<img src={mockTest} alt="" width={350}/>}
          />
          {/*)}*/}
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          {
            !loading ? (
                data.map((d,index) => {
                  return (
                      <Grid item xs={10} sm={6} md={6} lg={4} className="element-question-bank mkt-element">
                        <Link to={`/platform/user/resource/exam_history?id=${d.id}`}>
                          <Card className="element-card-question">
                            <CardContent className="mkt-header-size">
                              {/* <img src={d.imageUrl} alt={d.name} className="mkt-img"/> */}
                              {this.handleStatus(d)}
                            </CardContent>
                            <div className="mkt-box-container">
                              {/* {this.handleStatus(d)} */}
                              <div className="mkt-name-title">{d.name}</div>
                              <div className="mkt-content">
                                This AI practice test comprises of 4 modules in PTE Academic: Speaking, Writing, Reading and Listening.
                              </div>
                              <ul className="mkt-tag-list">
                                <li className="mkt-tag" style={{background: "red", color: "#ffffff"}}>HOT</li>
                                <li className="mkt-tag">2020</li>
                                <li className="mkt-tag">2021</li>
                              </ul>
                            </div>
                          </Card>
                        </Link>
                      </Grid>
                  )
                })
            ) : (
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Skeleton width="100%" height="300px" />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton width="100%" height="300px" />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton width="100%" height="300px" />
                  </Grid>
                </Grid>
            )
          }
        </Grid>
      </>
    );
  }
}

export default withRouter(MockTestList);
