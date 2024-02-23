
/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class UserFooter extends React.Component {
  render() {
    return (
      <>
        {/* <Container fluid>
          <footer className="footer pt-0 bg-transparent">
            <Row className="align-items-center justify-content-lg-between">
              <Col lg="6">
                <div className="copyright text-center text-lg-left text-copyright">
                  © {new Date().getFullYear()}{" "} <a target="_blank" href="https://benit.io">Benit</a>
                </div>
              </Col>
              <Col lg="6">
                <Nav className="nav-footer justify-content-center justify-content-lg-end">
                  <NavItem>
                    <NavLink className="text-copyright"
                      href="#"
                      target="_blank"
                    >
                      Blog
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="text-copyright"
                      href="#"
                      target="_blank"
                    >
                      License
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </footer>
        </Container> */}
      </>
    );
  }
}

export default UserFooter;
