import React, { Component } from "react";
import axios from "axios";
// reactstrap components
// reactstrap components
import {
  Card, 
  CardBody,
  CardTitle, 
  Container, 
  Progress,
  Row, 
  Col,
} from "reactstrap";
// connect
import { withRouter, Link } from "react-router-dom";
import BenitHeader from "src/components/Headers/BenitHeader";

import connect from "redux-connect-decorator";
import banner, { getBanner } from "src/reducers/banner";
import cart, { saveOne } from "src/reducers/cart";
import pack, { getPackages } from "src/reducers/pack";
import { IRootState } from "../../../../reducers";
import { BannerImage } from "../../components/BannerImage"; 
import {
  calculateProgress,
  calculateProgressColor,
} from "src/utils/common-utils"; 
import CountUp from "react-countup"; 

import tutorials from "src/assets/data/video_tutorials.json";
import YouTube from "react-youtube";

@connect(
  ({ cart, pack, banner }: IRootState) => ({
    cart: cart.cart,
    loading: cart.loading,
    packs: pack.packs,
    banner: banner.banner,
  }),
  {
    saveOne,
    getPackages,
    getBanner,
  }
)
class MagicShop extends Component<any, any> {
  state = {
    type: null,
    selectedGroupPackage: null,
    packages: [],
    totalSpeaking: 0,
    numberTestedSpeaking: 0,
    totalWriting: 0,
    numberTestedWriting: 0,
    totalReading: 0,
    numberTestedReading: 0,
    totalListening: 0,
    numberTestedListening: 0,

    totalRepeatedSpeaking: 0,
    totalRepeatedWriting: 0,
    totalRepeatedReading: 0,
    totalRepeatedListening: 0,
  };

  async componentDidMount() {
    this.props.getPackages();
    this.props.getBanner();

    let response = await axios.get(`/api/questions-count-info`);
    let totalSpeaking = 0;
    let numberTestedSpeaking = 0;
    let totalWriting = 0;
    let numberTestedWriting = 0;
    let totalReading = 0;
    let numberTestedReading = 0;
    let totalListening = 0;
    let numberTestedListening = 0;
    if (response.data && response.data.length !== 0) {
      response.data.forEach((item) => {
        let numberTested = item.numberTested ? item.numberTested : 0;
        if (item.type.indexOf("SPEAKING_") !== -1) {
          totalSpeaking = totalSpeaking + item.total;
          numberTestedSpeaking = numberTestedSpeaking + numberTested;
        } else if (item.type.indexOf("WRITING_") !== -1) {
          totalWriting = totalWriting + item.total;
          numberTestedWriting = numberTestedWriting + numberTested;
        } else if (item.type.indexOf("READING_") !== -1) {
          totalReading = totalReading + item.total;
          numberTestedReading = numberTestedReading + numberTested;
        } else if (item.type.indexOf("LISTENING_") !== -1) {
          totalListening = totalListening + item.total;
          numberTestedListening = numberTestedListening + numberTested;
        }
      });
      // Set stata
      this.setState({
        totalSpeaking,
        numberTestedSpeaking,
        totalWriting,
        numberTestedWriting,
        totalReading,
        numberTestedReading,
        totalListening,
        numberTestedListening,
      });
    }

    let responseRepeated = await axios.get(
      `/api/questions-repeated-count-info`
    );
    let totalRepeatedSpeaking = 0;
    let totalRepeatedWriting = 0;
    let totalRepeatedReading = 0;
    let totalRepeatedListening = 0;
    if (responseRepeated.data && responseRepeated.data.length !== 0) {
      responseRepeated.data.forEach((item) => {
        if (item.type.indexOf("SPEAKING_") !== -1) {
          totalRepeatedSpeaking = totalRepeatedSpeaking + item.total;
        } else if (item.type.indexOf("WRITING_") !== -1) {
          totalRepeatedWriting = totalRepeatedWriting + item.total;
        } else if (item.type.indexOf("READING_") !== -1) {
          totalRepeatedReading = totalRepeatedReading + item.total;
        } else if (item.type.indexOf("LISTENING_") !== -1) {
          totalRepeatedListening = totalRepeatedListening + item.total;
        }
      });
      // Set stata
      this.setState({
        totalRepeatedSpeaking,
        totalRepeatedWriting,
        totalRepeatedReading,
        totalRepeatedListening,
      });
    }
  }

  renderQuestionBoxInfo = () => (
    <>
      <Row>
        <Col md="6" xl="3">
          <Card className="bg-white border-0">
            <CardBody>
              <Link to={`/platform/user/banks/view-speaking`}>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase mb-0 text-dark"
                    >
                      Speaking
                      <span className="ml-2 badge badge-question-type-speaking">
                        AI
                      </span>
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-dark">
                      {this.state.totalSpeaking ? (
                        <CountUp
                          end={this.state.totalSpeaking}
                          duration={2}
                          separator=","
                        />
                      ) : (
                        "--"
                      )}
                    </span>
                    <Progress
                      className="progress-xs mt-3 mb-0"
                      max="100"
                      value={calculateProgress(
                        this.state.numberTestedSpeaking,
                        this.state.totalSpeaking
                      )}
                      color={calculateProgressColor(
                        this.state.numberTestedSpeaking,
                        this.state.totalSpeaking
                      )}
                    />
                  </div>
                  <Col className="col-auto" style={{ width: "65px" }}>
                    <div className="benit-icon size-45 icon-speaking"></div>
                  </Col>
                </Row>
              </Link>
              <p className="mt-3 mb-0 text-sm">
                <span className="mr-2">
                  <i className="ni ni-user-run" />
                  &nbsp;&nbsp;
                  {calculateProgress(
                    this.state.numberTestedSpeaking,
                    this.state.totalSpeaking
                  )}
                  %
                </span>
              </p>
              <Link
                className="text-dark"
                to={`/platform/user/banks/view-speaking?repeated=true`}
              >
                <div className="text-sm repeated-label-home">
                  <span className="badge badge-primary">
                    Repeated {this.state.totalRepeatedSpeaking || "--"}
                  </span>
                </div>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" xl="3">
          <Card className="bg-white border-0">
            <CardBody>
              <Link to={`/platform/user/banks/view-writing`}>
                <Row>
                  <div className="col">
                    <CardTitle tag="h5" className="text-uppercase mb-0">
                      Writing
                      {/* <span className="ml-2 badge badge-question-type-speaking">
                          AI
                        </span> */}
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      {this.state.totalWriting ? (
                        <CountUp
                          end={this.state.totalWriting}
                          duration={2}
                          separator=","
                        />
                      ) : (
                        "--"
                      )}
                    </span>
                    <Progress
                      className="progress-xs mt-3 mb-0"
                      max="100"
                      value={calculateProgress(
                        this.state.numberTestedWriting,
                        this.state.totalWriting
                      )}
                      color={calculateProgressColor(
                        this.state.numberTestedWriting,
                        this.state.totalWriting
                      )}
                    />
                  </div>
                  <Col className="col-auto" style={{ width: "65px" }}>
                    <div className="benit-icon size-45 icon-writing"></div>
                  </Col>
                </Row>
              </Link>
              <p className="mt-3 mb-0 text-sm">
                <span className="mr-2">
                  <i className="ni ni-user-run" />
                  &nbsp;&nbsp;
                  {calculateProgress(
                    this.state.numberTestedWriting,
                    this.state.totalWriting
                  )}
                  %
                </span>
              </p>
              <Link
                className="text-dark"
                to={`/platform/user/banks/view-writing?repeated=true`}
              >
                <div className="text-sm repeated-label-home">
                  <span className="badge badge-primary">
                    Repeated {this.state.totalRepeatedWriting || "--"}
                  </span>
                </div>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" xl="3">
          <Card className="bg-white border-0">
            <CardBody>
              <Link to={`/platform/user/banks/view-reading`}>
                <Row>
                  <div className="col">
                    <CardTitle tag="h5" className="text-uppercase mb-0">
                      Reading
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      {this.state.totalReading ? (
                        <CountUp
                          end={this.state.totalReading}
                          duration={2}
                          separator=","
                        />
                      ) : (
                        "--"
                      )}
                    </span>
                    <Progress
                      className="progress-xs mt-3 mb-0"
                      max="100"
                      value={calculateProgress(
                        this.state.numberTestedReading,
                        this.state.totalReading
                      )}
                      color={calculateProgressColor(
                        this.state.numberTestedReading,
                        this.state.totalReading
                      )}
                    />
                  </div>
                  <Col className="col-auto" style={{ width: "65px" }}>
                    <div className="benit-icon size-45 icon-reading"></div>
                  </Col>
                </Row>
              </Link>
              <p className="mt-3 mb-0 text-sm">
                <span className="mr-2">
                  <i className="ni ni-user-run" />
                  &nbsp;&nbsp;
                  {calculateProgress(
                    this.state.numberTestedReading,
                    this.state.totalReading
                  )}
                  %
                </span>
              </p>
              <Link
                className="text-dark"
                to={`/platform/user/banks/view-reading?repeated=true`}
              >
                <div className="text-sm repeated-label-home">
                  <span className="badge badge-primary">
                    Repeated {this.state.totalRepeatedReading || "--"}
                  </span>
                </div>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" xl="3">
          <Card className="bg-white border-0">
            <CardBody>
              <Link to={`/platform/user/banks/view-listening`}>
                <Row>
                  <div className="col">
                    <CardTitle tag="h5" className="text-uppercase mb-0">
                      Listening
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      {this.state.totalListening ? (
                        <CountUp
                          end={this.state.totalListening}
                          duration={2}
                          separator=","
                        />
                      ) : (
                        "--"
                      )}
                    </span>
                    <Progress
                      className="progress-xs mt-3 mb-0"
                      max="100"
                      value={calculateProgress(
                        this.state.numberTestedListening,
                        this.state.totalListening
                      )}
                      color={calculateProgressColor(
                        this.state.numberTestedListening,
                        this.state.totalListening
                      )}
                    />
                  </div>
                  <Col className="col-auto" style={{ width: "65px" }}>
                    <div className="benit-icon size-45 icon-listening"></div>
                  </Col>
                </Row>
              </Link>
              <p className="mt-3 mb-0 text-sm">
                <span className="mr-2">
                  <i className="ni ni-user-run" />
                  &nbsp;&nbsp;
                  {calculateProgress(
                    this.state.numberTestedListening,
                    this.state.totalListening
                  )}
                  %
                </span>
              </p>
              <Link
                className="text-dark"
                to={`/platform/user/banks/view-listening?repeated=true`}
              >
                <div className="text-sm repeated-label-home">
                  <span className="badge badge-primary">
                    Repeated {this.state.totalRepeatedListening || "--"}
                  </span>
                </div>
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );

  render() {
    const {  banner } = this.props;
    const opts = {
      width: "100%",
    };
    return (
      <>
        <BenitHeader name="Study Center" parentName="Home" />
        <Container className="mt--6" fluid>
          {this.renderQuestionBoxInfo()}

          <Row className="justify-content-center mb-3">
            <Col md="12" lg="12">
              {banner && <BannerImage {...banner} />}
            </Col>
          </Row>
          <Row className="card-wrapper">
            {/* { isFreeUser && <LockContent /> } */}
            {tutorials &&
              tutorials.map((item, i) => (
                <Col lg="6" key={`col-video-player-${i}`}>
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-3" tag="h3">
                        {item.title}
                      </CardTitle>
                      <div className="mb-4">
                        {/* <VideoPlayer key={`video-player-${i}`} {...item} /> */}
                        <YouTube
                          videoId={item.youtube_id}
                          opts={opts}
                          // onReady={this._onReady}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(MagicShop);
