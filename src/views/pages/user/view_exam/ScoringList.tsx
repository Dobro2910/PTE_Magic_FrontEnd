
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
  Row
} from "reactstrap";

// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// connect
import connect from 'redux-connect-decorator';
import { getAllAiScoring, reset } from '../../../../reducers/question_bank';
import { IRootState } from '../../../../reducers';
import queryString from 'query-string';
import { withRouter, Link } from 'react-router-dom';
import BenitHeader from 'src/components/Headers/BenitHeader';
import { QUESTION_PACK_NUMBER } from 'src/config/constants';
import { Translate } from 'src/utils/language/translate';
import { randomProgress, pagination, calculateProgressEachPack } from 'src/utils/common-utils';

const { SearchBar } = Search;

const formatAlignRight = (cell, row) => {
  return <div style={{ textAlign: "right" }}>{cell}</div>
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

const formatTags = (cell, row) => {
  return <>
    <span className="badge badge-warning">HOT</span>
    <span className="badge badge-primary">TRENDING</span>
    <span className="badge badge-success">NEW</span>
  </>;
}

const renderName = (cell, questionType) => {
  return <>
    <Media className="align-items-center">
          <div className="topic mr-3">
            { questionType == 'SPEAKING_READ_ALOUD' && <i className="icon-ra text-gray" style={{ fontSize: '30px', }}></i>}
            { questionType == 'SPEAKING_REPEAT_SENTENCE' && <i className="icon-rs text-gray" style={{ fontSize: '30px', }}></i>}
          </div>
          <Media>
            <span className="name mb-0 text-sm">
              { cell.toUpperCase() }
            </span>
          </Media>
        </Media>
  </>
}

@connect(
  ({ questionBank, acl }: IRootState) => ({
    data: questionBank.questionBank,
    loading: questionBank.loading,
    acl: acl.acl
  }),
  {
    getAllAiScoring,
    reset
  }
)
class ScoringList extends Component<any, any> {
  state = {
    type: null,
    data: []
  };

  componentDidMount() {
    this.props.getAllAiScoring();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentWillReceiveProps({location, data, acl}) {
    if (!acl || !data) {
      return;
    }
    console.log(data)
    console.log(acl)
    const pathname = this.props.location.pathname;
    let type;
    if (pathname.indexOf('read_aloud') > 0) {
      type = 'SPEAKING_READ_ALOUD';
    } else if (pathname.indexOf('repeat_sentence') > 0) {
      type = 'SPEAKING_REPEAT_SENTENCE';
    }
    const result = this.filter(type, data, acl);
    console.log(result)
    this.setState({ type, data: result })
  }
  
  constructor(props) {
    super(props);
  }

  formatName = (cell, row) => {
    return (
      <>
        { row.actived 
          ? <Link to={ `/platform/exam/scoring?page=${row.page}&total=${row.total}&type=${row.questionType}` }>
              { renderName(cell, row.questionType) }
            </Link> 
          : <>{ renderName(cell, row.questionType) }</>
        }
      </>
    );
  }

  filter = (type, data, acl) => {
    if (!data || !acl) return [];
    let result = [];

    let total;
    let allQuestionIds;
    let testedQuestionIds;
    if (type === 'SPEAKING_READ_ALOUD') {
      total = data.speakingRA.total;
      allQuestionIds = data.speakingRA.allQuestionIds;
      testedQuestionIds = data.speakingRA.questionIds;
    } else {
      total = data.speakingRS.total;
      allQuestionIds = data.speakingRS.allQuestionIds;
      testedQuestionIds = data.speakingRS.questionIds;
    }

    const maxPage = Math.ceil(total / QUESTION_PACK_NUMBER);
    let actived = (acl.numberAiScoring + acl.subscriptionAiScoring) > 0;
    for (let i = 0; i < maxPage; i++) {
      const item = {
        name: `Pack #${i + 1}`,
        questionType: type,
        page: i,
        total: total,
        allQuestionIds,
        packQuestionIds: allQuestionIds.split(',').slice(i * QUESTION_PACK_NUMBER, (QUESTION_PACK_NUMBER * (i + 1))),
        testedQuestionIds,
        actived
      };
      result.push(item);
    }

    return result;
  }

  addActionButton = (cell, row) => {
    return (
      <div className="table-actions">
          { row.actived ? 
            <Link to={ `/platform/exam/scoring?page=${row.page}&total=${row.total}&type=${row.questionType}` }>
              <Button className="btn-benit-sm btn-benit-yellow" type="button">
                <span className="btn-inner--icon">
                  <i className="fas fa-play" />
                </span>
                <span className="ml-1 btn-inner--text hidden-lg-down">Start</span>
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

  formatPack = (cell, row) => {
    return <> 
      { row.actived  
        ? <Link to={ `/platform/exam/scoring?page=${row.page}&total=${row.total}&type=${row.questionType}` }>
            <div style={{ textAlign: "center" }}><span className="badge badge-default text-sm">{row.page * QUESTION_PACK_NUMBER + 1} - {row.page * QUESTION_PACK_NUMBER + QUESTION_PACK_NUMBER} <span className="hidden-lg-down">questions</span></span></div>
          </Link>
        : <>
          <div style={{ textAlign: "center" }}><span className="badge badge-default text-sm">{row.page * QUESTION_PACK_NUMBER + 1} - {row.page * QUESTION_PACK_NUMBER + QUESTION_PACK_NUMBER} <span className="hidden-lg-down">questions</span></span></div>
        </>
      }
      </> 
  }
  

  render() {
    const { data } = this.state;
    const { acl } = this.props;

    return (
      <>
        <BenitHeader name="AI Scoring" parentName="Home" />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">AI Scoring - Speaking</h3>
                  <p className="text-sm mb-0">remain: { acl && acl.numberAiScoring }
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
                  { acl && (acl.subscriptionAiScoring + acl.numberAiScoring == 0) &&
                    <>
                      <div className={ `header-icon icon-idea` }></div>
                      <span className="text-sm text-danger">Buy Ai Scoring pack to access fully content</span>
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
                    {
                      dataField: "tags",
                      text: "Tags",
                      sort: true,
                      formatter: formatTags,
                      classes: 'hidden-lg-down',
                      headerClasses: 'hidden-lg-down'
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

export default withRouter(ScoringList);
