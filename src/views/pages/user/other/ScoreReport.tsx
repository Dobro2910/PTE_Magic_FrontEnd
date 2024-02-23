
import React, { Component } from "react";
// reactstrap components
// reactstrap components
import {
  Card,
  CardHeader,
  Media,
  Progress,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button
} from "reactstrap";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// connect
import queryString from 'query-string';
import { withRouter, Link } from 'react-router-dom';
import BenitHeader from 'src/components/Headers/BenitHeader';
import { QUESTION_PACK_NUMBER, SERVER_API_URL, APP_TIMESTAMP_FORMAT, AVATAR_DEFAULT, APP_TIMESTAMP_FORMAT_TEXT } from 'src/config/constants';
import connect from 'redux-connect-decorator';
import { IRootState } from '../../../../reducers';
import { getExamDetail } from 'src/reducers/exam';
import moment from 'moment';
import ReactEcharts from "echarts-for-react";
import Image from 'react-image-webp';

const { SearchBar } = Search;

const Banner = props => (
  <Navbar
          className="navbar-score navbar-main navbar-dark navbar-transparent"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand to="/" tag={Link}>
              {/* <img
                alt="..."
                className="h66"
                src={require("assets/img/brand/pte-logo.png")}
              /> */}
              <Image className="h66"
                  src={require("assets/img/brand/pte-logo.png")}
                  webp={require("assets/img/brand/pte-logo.webp")}
              />
            </NavbarBrand>
            <button
              aria-controls="navbar-collapse"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-collapse"
              data-toggle="collapse"
              id="navbar-collapse"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              className="navbar-custom-collapse"
              navbar
              toggler="#navbar-collapse"
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/admin/dashboard">
                      <img
                        alt="..."
                        src={"assets/img/brand/blue.png"}
                      />
                    </Link>
                  </Col>
                </Row>
              </div>
              <Nav className="mr-auto" navbar>
                <NavItem className="nav-item-score">
                    <span className="nav-link-inner--text">Mock Test Score Report</span>
                </NavItem>
              </Nav>
              <hr className="d-lg-none" />
            </UncontrolledCollapse>
          </Container>
        </Navbar>
)

@connect(
  ({ authentication, exam }: IRootState) => ({
    user: authentication.user,
    examInfo: exam.examInfo
  }),
  {
    getExamDetail
  }
)
class ScoreReport extends Component<any, any> {
  state = {
    examId: 0
  };

  componentDidMount() {
    // this.props.getAll();
    // Build package
    this.props.getExamDetail(this.state.examId);
  }

  componentWillMount() {
    let examId = queryString.parse(this.props.location.search).id;  // resume
    this.setState({ examId });
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { examInfo, user } = this.props;

    return (
      <>
        <Container style={{marginTop: 24}} fluid>
          { examInfo &&        
          <>
          <div className="justify-content-center row">
          <div className="score-bg">
          <Row>
            <div className="col">
              <Banner />
            </div>
          </Row>
          <Row>
            <Col md="6">
              <div className="score-avatar">
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img
                    alt="..."
                    height="100px"
                    className=""
                    src={ this.props.user.avatar || AVATAR_DEFAULT }
                  />
                </a>
              </div>
              <div style={{ display: 'inline-block'}}>
                <div style={{ position: 'absolute', top: '50px'}}>
                  <div className="score-item-text"><strong>{ examInfo.examTypeDTO.name}</strong></div>
                  <div className="score-item-text">Exam ID: { `PTE` + examInfo.examDTO.id }</div>
                  <div className="score-item-text">Reg ID: { examInfo.examDTO.id }</div>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="justify-content-center row">
                <div className="donut-container mt-6 border-radius-13" style = {{ background: 'transparent' }} >
                    <div className="donut-inner-overall">
                        <div className="donut-lable-overall">
                          { Math.round((examInfo.examDTO.comReading 
                            + examInfo.examDTO.comSpeaking 
                            + examInfo.examDTO.comListening 
                            + examInfo.examDTO.comWriting )/4)
                          }
                        </div>
                    </div>
                    <div className="text-score-overall-main">Overall Score</div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-3">
            <Row>
              <div className="score-main-title">
                Communicative Skills
              </div>
            </Row>
            <Row className="skill-score">
                <Col md="3 mb-3">
                <div>
                  <div  className="donut-container" style = {{ background: '#F4CC2D' }}>
                    <div className="bg-circle"></div>
                    <div className="donut-inner">
                        <div className="donut-label">{ examInfo.examDTO.comListening }</div>
                    </div>
                    <div className="text-score-overall">Listening</div>
                  </div>
                </div>
                </Col>
                <Col md="3 mb-3">
                <div>
                  <div className="donut-container" style = {{ background: '#C0C0C0' }} >
                    <div className="bg-circle"></div>
                      <div className="donut-inner">
                          <div className="donut-label">{ examInfo.examDTO.comReading }</div>
                      </div>
                      <div className="text-score-overall">Reading</div>
                  </div>
                </div>
                </Col>
                <Col md="3 mb-3">
                <div>
                  
                  <div className="donut-container" style = {{ background: '#CD7F32' }} >
                  <div className="bg-circle"></div>
                      <div className="donut-inner">
                          <div className="donut-label">{ examInfo.examDTO.comSpeaking }</div>
                      </div>
                      <div className="text-score-overall">Speaking</div>
                  </div>
                </div>
                </Col>
                <Col md="3 mb-3">
                <div>
                  <div className="donut-container" style = {{ background: '#FFFFFF' }} >
                  <div className="bg-circle"></div>
                      <div className="donut-inner">
                          <div className="donut-label">{ examInfo.examDTO.comWriting }</div>
                      </div>
                      <div className="text-score-overall">Writing</div>
                  </div>
                </div>
                </Col>
            </Row>
            <Row className="mt-5 p-r">
              <div className="bg-stamp-completed"></div>
              <Col md="8">
                <div className="score-main-title m-l-15">Skill breakdown</div>
                <ReactEcharts
                  style={{ height: '200px' }}
                  option={{
                    color: ['#F4CC2D'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        height: 150,
                        left: '90',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'value',
                            max: 90
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: ['Listening', 'Reading', 'Speaking', 'Writing'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'Score',
                            type: 'bar',
                            barWidth: '60%',
                            data: [ examInfo.examDTO.comListening
                              , examInfo.examDTO.comReading
                              , examInfo.examDTO.comSpeaking
                              , examInfo.examDTO.comWriting
                            ],
                            label: {
                              show: true,
                              position: 'inside',
                              color: "black"
                            },
                            markLine: {
                              data: [
                                  {type: 'average', name: 'Overall'}
                              ],
                              itemStyle: {
                                normal: {
                                    color: 'black',
                                    // lineStyle: {
                                    //     type: 'solid',
                                    //     width: 4
                                    // }
                                }
                              },
                            }
                        }
                    ]
                  }}
                />
                <ReactEcharts
                  option={{
                    color: ['#F4E269'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '40',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'value',
                            max: 90
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: ['Grammar', 'Oral Fluency', 'Pronunciation', 'Spelling', 'Vocabulary', 'Written Discourse'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'Score',
                            type: 'bar',
                            barWidth: '20',
                            data: [ examInfo.examDTO.enaGrammar
                              , examInfo.examDTO.enaOraFluency
                              , examInfo.examDTO.enaPronunciation
                              , examInfo.examDTO.enaSpelling
                              , examInfo.examDTO.enaVocabulary
                              , examInfo.examDTO.enaWrittenDiscourse
                            ],
                            markLine: {
                              data: [
                                  {type: 'average', name: 'Overall'},
                              ],
                              itemStyle: {
                                normal: {
                                    color: 'black',
                                    // lineStyle: {
                                    //     type: 'solid',
                                    //     width: 4
                                    // }
                                }
                              },
                            },
                            label: {
                              show: true,
                              position: 'inside',
                              color: "black"
                            }
                        }
                    ]
                  }}
                />
              </Col>
              <Col md="4" className="">
                <Row>
                  <div className="score-main-title mb-3">Test Center Information</div>
                  <div className="score-item-text text-bold">Test Date: { moment(examInfo.examDTO.createdDate).format(APP_TIMESTAMP_FORMAT_TEXT) }</div>
                  <div className="score-item-text text-bold">Report Issue Date: { moment(examInfo.examDTO.createdDate).format(APP_TIMESTAMP_FORMAT_TEXT) }</div>
                  <div className="score-item-text text-bold">Test Centre Country: PTE MAGIC</div>
                </Row>
                <Row>
                  <div className="score-main-title mb-3 mt-3">Candidate Information</div>
                  <div className="score-item-text">Name: { user.fullName || '--'  }</div>
                  <div className="score-item-text">Email: { user.email || '--' }</div>
                  <div className="score-item-text">Phone: { user.phonenumber || '--' }</div>
                </Row>
              </Col>
            </Row>
          </div>
          <Row>
            <div className="col mt-3 mb-3" style={{backgroundColor: '#f9db0175'}}>
            </div>
          </Row>
          </div>
          </div>
          </> }
        </Container>
      </>
    );
  }
}

export default ScoreReport;
