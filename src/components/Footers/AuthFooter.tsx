
/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <div className="bg-landingpage" id="footer-main">
                <div className="copyright">
                  © {new Date().getFullYear()}{" "} BENIT | All rights reserved.
                </div>
              {/*<Col xl="6">*/}
              {/*  <Nav className="nav-footer justify-content-center justify-content-xl-end">*/}
              {/*    /!*<NavItem>*!/*/}
              {/*    /!*  <NavLink className="text-copyright"*!/*/}
              {/*    /!*    href="#"*!/*/}
              {/*    /!*  >*!/*/}
              {/*    /!*    About Us*!/*/}
              {/*    /!*  </NavLink>*!/*/}
              {/*    /!*</NavItem>*!/*/}
              {/*    /!*<NavItem>*!/*/}
              {/*    /!*  <NavLink className="text-copyright"*!/*/}
              {/*    /!*    href="#"*!/*/}
              {/*    /!*  >*!/*/}
              {/*    /!*    Blog*!/*/}
              {/*    /!*  </NavLink>*!/*/}
              {/*    /!*</NavItem>*!/*/}
              {/*  </Nav>*/}
              {/*</Col>*/}
        </div>
      </>
    );
  }
}

export default Login;
