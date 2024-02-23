
import React from "react";

// reactstrap components
import {
  CardText,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  Col
} from "reactstrap";
// core components
import AuthHeader from "../../../components/Headers/AuthHeader";

class Platform extends React.Component {
  render() {
    return (
      <>
        <AuthHeader title="PLATFORM" lead="" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="10">
              <div className="pricing card-group flex-column flex-md-row mb-3">
                <Card className="card-pricing border-0 text-center mb-4">
                  <CardHeader className="bg-transparent">
                    <h4 className="text-uppercase ls-1 text-info py-3 mb-0">
                      Free pack
                    </h4>
                  </CardHeader>
                  <CardBody className="px-lg-7">
                    <div className="display-2">No fee</div>
                    <span className="text-muted">per user</span>
                    <ul className="list-unstyled my-4">
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                              <i className="fas fa-terminal" />
                            </div>
                          </div>
                          <div>
                            <span className="pl-2">5 dialogues</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                              <i className="fas fa-pen-fancy" />
                            </div>
                          </div>
                          <div>
                            <span className="pl-2">
                              50 glossaries
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                              <i className="fas fa-hdd" />
                            </div>
                          </div>
                          <div>
                            <span className="pl-2">Games with limit content</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <Button href="/auth/login" className="mb-3" color="info" type="button" >
                      Start free trial
                    </Button>
                  </CardBody>
                </Card>
                <Card className="card-pricing bg-gradient-success zoom-in shadow-lg rounded border-0 text-center mb-4">
                  <CardHeader className="bg-transparent">
                    <h4 className="text-uppercase ls-1 text-white py-3 mb-0">
                      Subscription pack
                    </h4>
                  </CardHeader>
                  <CardBody className="px-lg-7">
                    <div className="display-1 text-white">$--</div>
                    <span className="text-white">per user</span>
                    <ul className="list-unstyled my-4">
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-muted">
                              <i className="fas fa-terminal" />
                            </div>
                          </div>
                          <div>
                            <span className="pl-2 text-white">
                              Full dialogues
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-muted">
                              <i className="fas fa-pen-fancy" />
                            </div>
                          </div>
                          <div>
                            <span className="pl-2 text-white">
                              Full glossaries
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-muted">
                              <i className="fas fa-hdd" />
                            </div>
                          </div>
                          <div>
                            <span className="pl-2 text-white">
                              Full Games with content
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-muted">
                              <i className="fas fa-hdd" />
                            </div>
                          </div>
                          <div>
                            <span className="pl-2 text-white">
                              Video tutorials
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <Button href="/auth/login" className="mb-3" color="secondary" type="button">
                      Start free trial
                    </Button>
                  </CardBody>
                  <CardFooter className="bg-transparent">
                    <a
                      className="text-white"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Contact sales
                    </a>
                  </CardFooter>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Platform;
