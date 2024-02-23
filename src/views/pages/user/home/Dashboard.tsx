
import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Progress,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import AlternativeHeader from 'src/components/Headers/AlternativeHeader';
import { Link } from 'react-router-dom';
import AdSlider from 'src/components/AdSlider';
import MoveNotificationAround from 'src/components/MoveNotificationAround';
import { BannerImage } from '../../components/BannerImage';
import { BannerYoutube } from '../../components/BannerYoutube';
import axios from 'axios';
import CardsHeader from "src/components/Headers/CardsHeader";

class Dashboard extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <>
        <MoveNotificationAround />
        {/* <AlternativeHeader /> */}
        <CardsHeader name="Default" parentName="Dashboards" />
        <Container className="mt--6" fluid>
          {/* <Row>
            <AdSlider />
          </Row> */}
          <Row className="justify-content-center mb-3">
              <Col md="6" lg="6">
                <BannerImage />
              </Col>
          </Row>
          <Row>
            <Col md="6" xl="3">
              <Link to={ `/platform/user/banks/view-speaking` }>
                <Card className="bg-white border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase mb-0 text-dark"
                        >
                          Speaking
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-dark">
                          2412
                        </span>
                        <Progress
                          className="progress-xs mt-3 mb-0"
                          max="100"
                          value="30"
                          color="success"
                        />
                      </div>
                      <Col className="col-auto" style={{width: '65px'}}>
                        <div className="benit-icon size-45 icon-speaking"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="mr-2">
                        <i className="ni ni-user-run" />
                        &nbsp;&nbsp;30%
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col md="6" xl="3">
              <Link to={ `/platform/user/banks/view-writing` }>
                <Card className="bg-white border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase mb-0"
                        >
                          Writing
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          140
                        </span>
                        <Progress
                          className="progress-xs mt-3 mb-0"
                          max="100"
                          value="50"
                          color="danger"
                        />
                      </div>
                      <Col className="col-auto" style={{width: '65px'}}>
                        <div className="benit-icon size-45 icon-writing"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="mr-2">
                        <i className="ni ni-user-run" />
                        &nbsp;&nbsp;50%
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Link> 
            </Col>
            <Col md="6" xl="3">
              <Link to={ `/platform/user/banks/view-reading` }>
                <Card className="bg-white border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase mb-0"
                        >
                          Reading
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          837
                        </span>
                        <Progress
                          className="progress-xs mt-3 mb-0"
                          max="100"
                          value="80"
                          color="success"
                        />
                      </div>
                      <Col className="col-auto" style={{width: '65px'}}>
                        <div className="benit-icon size-45 icon-reading"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="mr-2">
                        <i className="ni ni-user-run" />
                        &nbsp;&nbsp;80%
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col md="6" xl="3">
              <Link to={ `/platform/user/banks/view-listening` }>
                <Card className="bg-white border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase mb-0"
                        >
                          Listening
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          753
                        </span>
                        <Progress
                          className="progress-xs mt-3 mb-0"
                          max="100"
                          value="90"
                          color="success"
                        />
                      </div>
                      <Col className="col-auto" style={{width: '65px'}}>
                        <div className="benit-icon size-45 icon-listening"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="mr-2">
                        <i className="ni ni-user-run" />
                        &nbsp;&nbsp;90%
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Dashboard;
