import axios from 'axios';
import moment from 'moment';
import React, { Component } from "react";
// reactstrap components
import { confirmAlert } from 'react-confirm-alert';
import TimeAgo from 'react-timeago';
// reactstrap components
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Container,
  Button,
  Media,
  UncontrolledTooltip,
  Modal,
  Form,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
// core components
import Paging from '../../../../components/Paging';

// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import connect from 'redux-connect-decorator';
import { IRootState } from '../../../../../../reducers';
import { PteLoadingSpinner } from '../../../../components/LoadingSpinner/pte-loading-spinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { QUESTION_TYPE_FULL, QUESTION_TYPE } from 'src/config/constants';
const { SearchBar } = Search;
import Skeleton from '@yisheng90/react-loading';
import withScoreInfoModal from 'src/views/pages/components/withScoreInfoModal';

const formatScore =  (cell, row) => {
  let activity = row;
  return (
    <>
      <div className="d-flex justify-content-between pt-0 mb-2">
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
      </div>
      {/* <Row>
        { activity.param3 && 
            <>
                <audio controls controlsList="nodownload" id={ `player-${activity.id}` } src= { activity.param3 }></audio>
            </>
        }
      </Row> */}
      { activity.param8 && <>
        <div className="text-sm nav-link-text">
            { (activity.param2 === QUESTION_TYPE.SPEAKING_READ_ALOUD 
            || activity.param2 === QUESTION_TYPE.SPEAKING_REPEAT_SENTENCE
            || activity.param2 === QUESTION_TYPE.SPEAKING_DESCRIBE_IMAGE
            || activity.param2 === QUESTION_TYPE.SPEAKING_RETELL_LECTURE
            || activity.param2 === QUESTION_TYPE.SPEAKING_ANSWER_SHORT_QUESTION ) &&
              <Row>
                <Col md="3"><span className="label-benit-sm btn-benit-yellow"><strong>Total</strong>: { parseFloat(activity.param8).toFixed(1)}</span></Col>
              </Row>
            }
            { (activity.param2 === QUESTION_TYPE.WRITING_SUMMARIZE_WRITTEN_TEXT) &&
              <Row>
                <Col md="3"><span className="label-benit-sm btn-benit-yellow"><strong>Total</strong>: { parseFloat(activity.param13).toFixed(1)}</span></Col>
              </Row>
            }
            { (activity.param2 === QUESTION_TYPE.WRITING_ESSAY) &&
              <Row>
                <Col md="3"><span className="label-benit-sm btn-benit-yellow"><strong>Total</strong>: { parseFloat(activity.param8).toFixed(1)}</span></Col>
              </Row>
            }
        </div>
      </>
      }
    </>
  );
}

const formatTopic = (cell, row) => {
  return <Media className="align-items-center">
      <a className="topic mr-3" onClick={e => e.preventDefault()}>
        <div className={`bg-topic bg-topic-users`}></div>
      </a>
      <Media>
        <Row>
          <Col md="12">
            <div className="name mb-0 text-sm">
              { `Me` }
            </div>
          </Col>
          <Col md="12">
            <div>{ row.device_code }</div>
          </Col>
        </Row>
      </Media>
    </Media>;
}

@withScoreInfoModal()
class BoardMe extends Component<any, any> {

  async componentDidMount() {
    this.filterData();
  }

  componentWillUnmount() {
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      total: 0,
      page: 1,
      pageSize: 5,
      data: []
    };
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.questionId != nextProps.questionId) {
      this.filterData();
    }
  }

  loadAll = () => {
    this.filterData();
  }

  filterData = async (page = 1, pageSize = 5) => {
    this.setState({ loading: true, data : [] });
    let res = await axios.post('api/account/search-exam-history-me', { page, pageSize, data : { param1: this.props.questionId }});
    this.setState({ data: res.data.data, page, total: res.data.total, loading: false });
  }

  onPageChange = (page, pageSize) => {
    this.filterData(page, pageSize);
  }

  formatDate = (cell, row) => {
    return <span><TimeAgo date={ cell } /></span>;
  }

  formatLink = (cell, row) => {
    return <Link to={cell}>Link</Link>;
  }

  onScoreInfo = (row) => {
    this.setState({ selectedData: row });
    this.props.openModal(row);
  }

  addActionButton = (cell, row) => {
    return (
        <>
          <Button className="btn-benit-sm btn-benit-red" onClick={ () => this.onScoreInfo(row) }>
            <span className="btn-inner--text hidden-lg-down">Score Info</span>
          </Button>
        </>
    )
  }

  render() {
    const { loading, data, total, page, pageSize } = this.state;
    return (
      <>
        <Card>
          <CardHeader>
            <h3 className="mb-0">My Records</h3>
          </CardHeader>
          { loading ? 
            <Card>
              <CardHeader>
                <Skeleton width="100%" height="2rem" />
                <Skeleton width="100%" height="2rem" />
                <Skeleton width="100%" height="2rem" />
                <Skeleton width="100%" height="2rem" />
                <Skeleton width="100%" height="2rem" />
                <Skeleton width="100%" height="2rem" />
              </CardHeader>
            </Card>
          : 
          <>
            { data && <ToolkitProvider
              data={ data }
              keyField="id"
              columns={[
                {
                  dataField: "login",
                  text: "User",
                  sort: true,
                  formatter: formatTopic
                },
                {
                  dataField: "score",
                  text: "score",
                  formatter: formatScore
                },
                {
                  dataField: "createdDate",
                  text: "Date",
                  sort: true,
                  formatter: this.formatDate
                },
                {
                  dataField: "action",
                  text: "Action",
                  searchable: false,
                  sort: false,
                  formatter: this.addActionButton
                } 
              ]}
              search
            >
              {props => (
                <div className="table-responsive align-items-center table-flush table">
                  <BootstrapTable
                    {...props.baseProps}
                    bootstrap4={true}
                    bordered={false}
                  />
                  <Paging total={total} page={page} limit={pageSize} onChange={this.onPageChange} />
                </div>
              )}
            </ToolkitProvider>
            }
          </>
          }
        </Card>
      </>
    );
  }
}

export default BoardMe;
