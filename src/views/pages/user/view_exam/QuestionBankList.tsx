
import React, { Component } from "react";
import axios from 'axios';
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Button,
  Media,
  Progress,
  Row
} from "reactstrap";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// connect
import queryString from 'query-string';
import { withRouter, Link } from 'react-router-dom';
import BenitHeader from 'src/components/Headers/BenitHeader';
import { pagination, randomProgress, calculateProgressEachPack } from 'src/utils/common-utils';
import { Translate } from 'src/utils/language/translate';
import { QUESTION_PACK_NUMBER } from 'src/config/constants';
import connect from 'redux-connect-decorator';
import { IRootState } from '../../../../reducers';
// import { getAll, reset, getAllRepeated } from '../../../../reducers/question_bank';

const { SearchBar } = Search;

const formatAlignRight = (cell, row) => {
  return <div style={{ textAlign: "right" }}>{cell}</div>
}

const renderName = (cell, type) => {
  return <>
    <Media className="align-items-center">
      <div className="topic mr-3">
        { type == 'speaking' && <div className="grid-icon icon-speaking"></div> }
        { type == 'writing' && <div className="grid-icon icon-writing"></div>}
        { type == 'reading' && <div className="grid-icon icon-reading"></div>}
        { type == 'listening' && <div className="grid-icon icon-listening"></div> }
      </div>
      <Media>
        <span className="name mb-0 text-sm">
          { cell.toUpperCase() }
        </span>
      </Media>
    </Media>
  </>
}

const formatQuestionType = (cell, row) => {
  return <div className="col">
      <small className="text-black"><Translate contentKey={'question-type.title.' + cell}>Question bank</Translate></small>
      <Progress
        className="progress-xs my-2"
        max="100"
        value={ calculateProgressEachPack(row.packQuestionIds, row.testedQuestionIds) }
        color="success"
      />
    </div>;
}

// const formatTags = (cell, row) => {
//   return <>
//     <span className="badge badge-warning">HOT</span>
//     <span className="badge badge-primary">TRENDING</span>
//     <span className="badge badge-success">NEW</span>
//   </>;
// }

@connect(
  ({ authentication, acl, questionBank }: IRootState) => ({
    user: authentication.user,
    acl: acl.acl
  }),
  {
  }
)
class QuestionBankList extends Component<any, any> {
  state = {
    repeated: queryString.parse(this.props.location.search).repeated,
    type: queryString.parse(this.props.location.search).type,
    total: queryString.parse(this.props.location.search).total,
    questionType: queryString.parse(this.props.location.search).question_type,
    groupTitle: null,
    data: []
  };

  formatPack = (cell, row) => {
    let maxItem = ((row.page * QUESTION_PACK_NUMBER + QUESTION_PACK_NUMBER) < parseInt(this.state.total.toString())) ? (row.page * QUESTION_PACK_NUMBER + QUESTION_PACK_NUMBER) : this.state.total;
    return <> 
      { row.actived  
        ? <Link to={ row.actived ? `/platform/exam/question_bank?page=${row.page}&total=${row.total}&type=${row.questionType}${ this.state.repeated ? '&repeated=true' : '' }` : "#" }>
            <div style={{ textAlign: "center" }}><span className="badge badge-default text-sm">{row.page * QUESTION_PACK_NUMBER + 1} - { maxItem } <span className="hidden-lg-down">questions</span></span></div>
          </Link>
        : <>
          <div style={{ textAlign: "center" }}><span className="badge badge-default text-sm">{row.page * QUESTION_PACK_NUMBER + 1} - { maxItem } <span className="hidden-lg-down">questions</span></span></div>
        </>
      }
      </> 
  }

  formatRowData = async () => {
    if (this.props.acl) {
      let allQuestionIds = "";
      let testedQuestionIds;
      if (this.state.repeated) {
        let response = await axios.get(`/api/questions-repeated-count-info?questionType=${this.state.questionType}`);
        if (response.data && response.data.length === 1) {
          allQuestionIds = response.data[0].allQuestionIds;
          testedQuestionIds = response.data[0].questionIds;
        }
      } else {
        let response = await axios.get(`/api/questions-count-info?questionType=${this.state.questionType}`);
        if (response.data && response.data.length === 1) {
          allQuestionIds = response.data[0].allQuestionIds;
          testedQuestionIds = response.data[0].questionIds;
        }
      }
      
      let data = [];
      let maxPage = Math.ceil(parseInt(this.state.total.toString()) / QUESTION_PACK_NUMBER);
      for (let i = 0; i < maxPage; i++) {
        let actived;
        if (this.props.acl.subscriptionDays > 0) {
          actived = true;
        } else {
          if(this.state.type == "speaking") actived = false;
          else if (i == 0)  actived = true;
          else actived = false;
        }
        const item = {
          name: `Pack #${i + 1}`,
          questionType: this.state.questionType,
          page: i,
          total: this.state.total,
          allQuestionIds,
          packQuestionIds: allQuestionIds.split(',').slice(i * QUESTION_PACK_NUMBER, (QUESTION_PACK_NUMBER * (i + 1))),
          testedQuestionIds,
          actived
        };
        data.push(item);
      }
      console.log(`data`, data)
      this.setState({ data })
    }
  }

  componentDidMount() {
    // this.props.getAll();
    // Build package
    this.formatRowData();
    if (this.state.repeated) {
      this.setState({ groupTitle: 'Repeated questions' });
    } else {
      this.setState({ groupTitle: 'Question bank' });
    }
  }

  componentWillReceiveProps({ acl, data }) {
    if (acl) {
      this.formatRowData();
    }
  }

  componentWillUnmount() {
    // this.props.reset();
  }

  constructor(props) {
    super(props);
  }

  formatName = (cell, row) => {
    return (
      <>
        { row.actived 
          ? <Link to={ `/platform/exam/question_bank?page=${row.page}&total=${row.total}&type=${row.questionType}${ this.state.repeated ? '&repeated=true' : '' }` }>
              { renderName(cell, this.state.type) }
            </Link> 
          : <>{ renderName(cell, this.state.type) }</>
        }
      </>
    );
  }

  addActionButton = (cell, row) => {
    return (
        <div className="table-actions">
          { row.actived ? 
            <Link to={ `/platform/exam/question_bank?page=${row.page}&total=${row.total}&type=${row.questionType}${ this.state.repeated ? '&repeated=true' : '' }` }>
              <Button className="btn-benit-sm btn-benit-yellow" type="button">
                <span className="btn-inner--icon">
                  <i className="fas fa-play" />
                </span>
                <span className="btn-inner--text hidden-lg-down ml-1">Start</span>
              </Button>
            </Link>
            :
            <div className={ `header-icon icon-lock` }></div>
          }
        </div>
    )
  }

  rowStyle = (row, rowIndex) => {
    if (!row.actived) {
      return { opacity : '0.5' };
    }
    return {};
  }

  render() {
    const { data } = this.state;
    const { acl } = this.props;

    console.log(acl)

    return (
      <>
        <BenitHeader name="Question bank" parentName="Home" />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">
                    <Link to={`/platform/user/banks/view-${this.state.type}`}>
                      <span style={{ "textTransform" : "capitalize"}}>{ this.state.groupTitle } - {this.state.type}</span>
                    </Link>
                  </h3>
                  <p className="text-sm mb-0">Need <a href="hhttps://ptemagicpractice.com/faqs" target="_blank">Help?</a>
                    <Link to={ '/platform/user/shop' } >
                      <Button style={{ float: 'right', marginTop: '-20px'}} 
                          className="btn-benit-sm btn-benit-yellow d-lg-block">
                        <span className="btn-inner--icon mr-1">
                          <i className="fas fa-cart-plus" />
                        </span>
                        <span className="btn-inner--text hidden-lg-down">Buy</span>
                      </Button>
                    </Link>
                  </p>
                  { acl && acl.subscriptionDays == 0 &&
                    <>
                      <div className={ `header-icon icon-idea` }></div>
                      <span className="text-sm text-danger">Buy subscription pack to access fully content</span>
                    </>
                  }
                </CardHeader>
                { acl && data && <ToolkitProvider
                  data={ data }
                  keyField="name"
                  columns={[
                    {
                      dataField: "name",
                      text: "Name",
                      sort: true,
                      formatter: this.formatName
                    },
                    {
                      dataField: "questionType",
                      text: "Question type",
                      sort: true,
                      formatter: formatQuestionType,
                      classes: 'hidden-lg-down',
                      headerClasses: 'hidden-lg-down'
                    },
                    {
                      dataField: "remainAttemps",
                      text: "Number questions",
                      sort: true,
                      formatter: this.formatPack
                    },
                    // {
                    //   dataField: "tags",
                    //   text: "Tags",
                    //   sort: true,
                    //   formatter: formatTags,
                    //   classes: 'hidden-lg-down',
                    //   headerClasses: 'hidden-lg-down'
                    // },
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
                    <div className="py-4 table-responsive align-items-center table-flush table">
                      <div
                        id="datatable-basic_filter"
                        className="dataTables_filter px-4 pb-1"
                      >
                        <label>
                          Search:
                          <SearchBar
                            className="form-control-sm"
                            placeholder=""
                            {...props.searchProps}
                          />
                        </label>
                      </div>
                      <BootstrapTable
                        {...props.baseProps}
                        rowStyle={ this.rowStyle }
                        bootstrap4={true}
                        pagination={pagination}
                        bordered={false}
                      />
                    </div>
                  )}
                </ToolkitProvider>
                }
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(QuestionBankList);
