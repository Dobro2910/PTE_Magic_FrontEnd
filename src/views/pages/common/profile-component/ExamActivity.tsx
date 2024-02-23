import axios from 'axios';
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import $ from 'jquery';
import ReactPlayer from 'react-player';
// core components

// import connect from 'redux-connect-decorator';
// import { IRootState } from 'src/reducers/index';
// import { getExamActivity } from 'src/reducers/account';
import { APP_TIMESTAMP_FORMAT, APP_LOCAL_DATE_FORMAT, QUESTION_TYPE_FULL, QUESTION_TYPE } from 'src/config/constants';
import moment from 'moment';
import Paging from '../../components/Paging';
import Skeleton from '@yisheng90/react-loading';
import TimeAgo from 'react-timeago';

const ExamTimeline = props => {
  const { activity } = props;
  return (
    <div className="timeline-block mt--2">
      <span className="timeline-step badge-white size-45">
        { activity.activityCode !== "EXAM_MOCK_TEST" && <i className="benit-icon icon-ai size-45 ml-2" /> }
        { activity.activityCode === "EXAM_MOCK_TEST" && <i className="benit-icon icon-mock size-45 ml-2" /> }
      </span>
      <div className="profile-content">
        { activity.activityCode === 'SCORE_GOOGLE_SPEECH_API' && <AiScoringContent {...props} /> }
        { activity.activityCode === 'EXAM_MOCK_TEST' && <MockTestContent {...props} /> }
      </div>
    </div>
  );
}

const playAudio = (id) => {
  $(`#player-${id}`).play()
}

const AiScoringContent = props => {
  const { activity } = props;
  return (
    <>
      <div className="d-flex justify-content-between pt-0">
        <div>
          <h5 className="mt-0 mb-0 text-primary">
            <span>AI Scoring </span>
          </h5>
        </div>
        <div className="text-right">
          <small className="text-muted">
            <i className="fas fa-clock mr-1" /><TimeAgo date={ activity.createdDate } />
          </small>
        </div>
      </div>
      <div className="d-flex justify-content-between pt-0">
        <div>
          <div className="mt--1">
            <span className="text-sm text-muted">
              { QUESTION_TYPE_FULL[activity.param2].name }
            </span>
            <span className="ml-2 badge badge-question-type-speaking">
              { QUESTION_TYPE_FULL[activity.param2].code }
            </span>
          </div>
        </div>
        <div className="text-right">
          <small className="text-muted">
            <span className="text-danger"><i className="fas fa-arrow-down mr-1"></i>1</span> { activity.param4 && <span>(Remain: {activity.param4})</span> }
          </small>
        </div>
      </div>
      <div style={{ maxWidth: '300px'}}>
        { activity.param3 && 
          <>
            <audio  controls controlsList="nodownload" id={ `player-${activity.id}` } src= { activity.param3 }></audio>
          </>
        }
      </div>
      { activity.param8 && <>
        <div className="d-flex justify-content-between pt-1">
          <div>
            <div className="mt-0">
              <span className="text-sm nav-link-text">{activity.param9} - Score Info</span>
            </div>
          </div>
        </div>
        <div className="text-sm nav-link-text">
            { (activity.param2 === QUESTION_TYPE.SPEAKING_READ_ALOUD 
            || activity.param2 === QUESTION_TYPE.SPEAKING_REPEAT_SENTENCE
            || activity.param2 === QUESTION_TYPE.SPEAKING_DESCRIBE_IMAGE
            || activity.param2 === QUESTION_TYPE.SPEAKING_RETELL_LECTURE
            || activity.param2 === QUESTION_TYPE.SPEAKING_ANSWER_SHORT_QUESTION ) &&
              <Row>
                <Col md="3"><span className="label-benit-sm btn-benit-tag">C: { activity.param5 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag">P: { activity.param6 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag">F: { activity.param7 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-yellow"><strong>Total</strong>: { parseFloat(activity.param8).toFixed(1)}</span></Col>
              </Row>
            }
            { (activity.param2 === QUESTION_TYPE.WRITING_SUMMARIZE_WRITTEN_TEXT) &&
              <Row>
                <Col md="3"><span className="label-benit-sm btn-benit-tag">C: { activity.param5 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag">F: { activity.param6 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag">G: { activity.param8 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag">V: { activity.param11 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-yellow"><strong>Total</strong>: { parseFloat(activity.param13).toFixed(1)}</span></Col>
              </Row>
            }
            { (activity.param2 === QUESTION_TYPE.WRITING_ESSAY) &&
              <Row>
                <Col md="3"><span className="label-benit-sm btn-benit-tag mb-1">C: { activity.param5 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag mb-1">F: { activity.param6 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag mb-1">S: { activity.param7 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag mb-1">G: { activity.param8 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag mb-1">GI: { activity.param10 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag mb-1">V: { activity.param11 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-tag mb-1">S: { activity.param12 }</span></Col>
                <Col md="3"><span className="label-benit-sm btn-benit-yellow"><strong>Total</strong>: { parseFloat(activity.param8).toFixed(1)}</span></Col>
              </Row>
            }
        </div>
      </>
      }
    </>
  );
}

const MockTestContent = props => {
  const { activity } = props;
  return (
    <>
      <div className="d-flex justify-content-between pt-1">
        <div>
          <h5 className="mt-3 mb-0">
            <span>Mock test</span>
          </h5>
        </div>
        <div className="text-right">
          <small className="text-muted">
            <i className="fas fa-clock mr-1" /><TimeAgo date={ activity.createdDate } />
          </small>
        </div>
      </div>
      <div className="mt-3">
        <Badge color="default" pill>
          Mock test
        </Badge>
      </div>
    </>
  );
}

// @connect(
//   ({ acl, account }: IRootState) => ({
//     examActivity: account.examActivity,
//   }),
//   {
//     getExamActivity
//   }
// )
class ExamActivity extends React.Component<any, any> {
  state = {
    total: 0,
    page: 1,
    pageSize: 5,
    examActivity: null,
    loading: false
  }

  componentDidMount() {
    this.loadData(this.state.page, this.state.pageSize);
  }

  loadData = async (page, pageSize) => {
    this.setState({ loading: true });
    let response = await axios.post(`api/account/search-exam-history`, {page, pageSize});
    this.setState({ page: page, examActivity: response.data.data, total: response.data.total, loading: false });
  }

  onPageChange = (page, pageSize) => {
    this.loadData(page, pageSize);
  }

  render() {
    const { loading, total, page, pageSize, examActivity } = this.state;
    return (
      <>
        <Card>
          <CardHeader className="bg-transparent">
            <h3 className="mb-0">AI Scoring Activity</h3>
          </CardHeader>
          <CardBody>
              { loading ? 
                <>
                  <Skeleton width="100%" height="2rem" />
                  <Skeleton width="100%" height="2rem" />
                  <Skeleton width="100%" height="2rem" />
                  <Skeleton width="100%" height="2rem" />
                  <Skeleton width="100%" height="2rem" />
                  <Skeleton width="100%" height="2rem" />
                </> 
                : <>
                  { examActivity && 
                    <>
                      <div className="timeline timeline-one-side"
                        data-timeline-axis-style="dashed"
                        data-timeline-content="axis">
                          { examActivity.map((item, i) => 
                              <ExamTimeline key={`exam-timeline-${i}`} activity={ item } />
                            )
                          }
                      </div>
                      <Paging total={total} page={page} limit={pageSize} onChange={this.onPageChange} />
                    </>
                  }
                </>
              }
          </CardBody>
        </Card>
      </>
    );
  }
}

export default ExamActivity;
