
import React from "react";
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";
import connect from 'redux-connect-decorator';
import { IRootState } from '../../reducers';

@connect(
  ({ authentication }: IRootState) => ({
    isAuthenticated: authentication.isAuthenticated,
  }),
  {
    // getAll
  }
)
class IndexHeader extends React.Component<any, any> {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <>
        <div className="header bg-benit-bubble pt-2 pb-3">
          <Container>
            <div className="">
              <Row className="align-items-center">
                <Col lg="6">
                  <div className="pl-3">
                    <h1 className="display-2 text-black font-weight-bold mb-0">
                      PTE Magic PLATFORM
                    </h1>
                    <h2 className="display-4 text-black font-weight-light">
                    ONLINE PTE PRACTICE
                    </h2>
                    <p className="text-black mt-4">
                    Access our best real materials for your PTE 
                    </p>
                    { !isAuthenticated && <div className="mt-5">
                      <Link to={ `/auth/register` } className="btn-benit btn-benit-white mr-2 mb-3">
                        Sign up
                      </Link>
                      <Link to={ `/auth/register` } className="btn-benit btn-benit-default mb-3">
                        Free trial
                      </Link>
                    </div>
                    }
                  </div>
                </Col>
                <Col lg="6">
                  <Row className="pt-5">
                    <Col md="6">
                      <Card>
                        <CardBody>
                          <div className="mb-2">
                            <div className={`bg-icon-60 bg-topic-default bg-topic-money-home-60`}></div>
                          </div>
                          <h5 className="h3 text-uppercase">REAL EXAM QUESTIONS</h5>
                          <p>
                          Practice with the most updated real exam question bank
                          </p>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>
                          <div className="mb-2">
                            <div className={`bg-icon-60 bg-topic-default bg-topic-target-60`}></div>
                          </div>
                          <h5 className="h3 text-uppercase">SCORED MOCK TESTS</h5>
                          <p>
                          Familiarise yourself with mock tests and get score 
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="pt-lg-5 pt-4" md="6">
                      <Card className="mb-4">
                        <CardBody>
                          <div className="mb-2">
                            <div className={`bg-icon-60 bg-topic-default bg-topic-global-60`}></div>
                          </div>
                          <h5 className="h3 text-uppercase">30+ COUNTRIES</h5>
                          <p>
                          Reliable platform for PTE aspirants across the world
                          </p>
                        </CardBody>
                      </Card>
                      <Card className="mb-4">
                        <CardBody>
                          <div className="mb-2">
                            <div className={`bg-icon-60 bg-topic-default bg-topic-user-home-60`}></div>
                          </div>
                          <h5 className="h3 text-uppercase">8000+ USERS </h5>
                          <p>
                          Daily registration of PTE Magic and other students
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
          {/* <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div> */}
        </div>
      </>
    );
  }
}

export default IndexHeader;
