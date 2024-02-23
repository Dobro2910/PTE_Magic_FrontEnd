
import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

class AuthHeader extends React.Component<any, any> {
  render() {
    return (
      <>
        <div className="header bg-landingpage py-4 py-lg-6 pt-lg-4">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col className="px-5" lg="6" md="8" xl="5">
                  {this.props.title ? (
                    <h1 className="text-black">{this.props.title}</h1>
                  ) : null}
                  {this.props.lead ? (
                    <p className="text-lead text-black">{this.props.lead}</p>
                  ) : null}
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default AuthHeader;
