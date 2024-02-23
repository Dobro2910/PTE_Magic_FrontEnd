import axios from 'axios';
import moment from 'moment';
import React, { Component } from "react";
// reactstrap components
import { confirmAlert } from 'react-confirm-alert';
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
import SimpleHeader from "../../../../components/Headers/SimpleHeader";
import Paging from '../../components/Paging';

// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import connect from 'redux-connect-decorator';
import { IRootState } from '../../../../reducers';
import { PteLoadingSpinner } from '../../components/LoadingSpinner/pte-loading-spinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { QUESTION_TYPE_FULL } from 'src/config/constants';
const { SearchBar } = Search;
import Skeleton from '@yisheng90/react-loading';

const formatTopic = (cell, row) => {
  return <Media className="align-items-center">
      <Link className="topic mr-3" to={ row.link} >
        <div style={{ fontSize: '25px', color: 'red' }}>{ QUESTION_TYPE_FULL[cell].code }</div>
      </Link>
      <Media>
        <Row>
          <Col md="12">
            <div className="name mb-0 text-sm">
              { cell ?  QUESTION_TYPE_FULL[cell].name : cell}
            </div>
          </Col>
          <Col md="12">
            <div>{ row.questionId }</div>
          </Col>
        </Row>
      </Media>
    </Media>;
}

class BookmarkHistory extends Component<any, any> {

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

  loadAll = () => {
    this.filterData();
  }

  filterData = async (page = 1, pageSize = 5) => {
    this.setState({ loading: true, data : [] });
    let res = await axios.post('api/bookmark/search-bookmark', { page, pageSize});
    this.setState({ data: res.data.data, page, total: res.data.total, loading: false });
  }

  onPageChange = (page, pageSize) => {
    this.filterData(page, pageSize);
  }

  formatDate = (cell, row) => {
    return <span>{ moment(cell).format('DD-MM-YYYY HH:mm') }</span>;
  }

  formatLink = (cell, row) => {
    return <Link to={cell}>Link</Link>;
  }

  onRemoveBookmark = async (e, row) => {
    e.preventDefault();
    // Add
    await axios.delete(`/api/bookmark/${row.questionId}`);
    this.loadAll();
  }

  addActionButton = (cell, row) => {
    return (
        <div className="table-actions">
            <a
              className="table-action table-action-transcript"
              href="#"
              id={ `tooltip2-${row.id}`}
              onClick={e => this.onRemoveBookmark(e, row)}
            >
              <i className="fas fa-trash-alt" />
            </a>
            <UncontrolledTooltip delay={0} target={ `tooltip2-${row.id}`}>
              Delete
            </UncontrolledTooltip>
        </div>
    )
  }

  render() {
    const { loading, data, total, page, pageSize } = this.state;
    return (
      <>
        <Card>
          <CardHeader>
            <h3 className="mb-0">Bookmark</h3>
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
                  dataField: "questionType",
                  text: "Question",
                  sort: true,
                  formatter: formatTopic
                },
                {
                  dataField: "createdDate",
                  text: "Date",
                  sort: true,
                  formatter: this.formatDate
                },
                {
                  dataField: "link",
                  text: "Link",
                  formatter: this.formatLink
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

export default BookmarkHistory;
