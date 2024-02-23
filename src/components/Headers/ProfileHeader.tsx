
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

class ProfileHeader extends React.Component<any, any> {
  render() {
    return (
      <>
        <div
          className="header-profile d-flex align-items-center"
        >
          <Container className="d-flex align-items-center" style={{paddingLeft: 0}}>
            <Row>
              <Col lg="12" md="10">
                <h1 className="display-2 text-black">Hello { this.props.fullName }</h1>
                <p className="text-black mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your work
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default ProfileHeader;
