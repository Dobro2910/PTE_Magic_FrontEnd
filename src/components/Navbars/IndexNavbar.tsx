
declare var require: any;
import React from "react";
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  UncontrolledTooltip,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import connect from 'redux-connect-decorator';
import { AVATAR_DEFAULT } from '../../config/constants';
import { truncateText } from '../../utils/common-utils';
import { IRootState } from '../../reducers';
import Image from 'react-image-webp';
@connect(
  ({ authentication }: IRootState) => ({
    loading: authentication.loading,
    isAuthenticated: authentication.isAuthenticated,
    user: authentication.user,
    isAdmin: authentication.isAdmin,
    sessionHasBeenFetched: authentication.sessionHasBeenFetched
  }),
  {
    // getUserInfo
  }
)
class IndexNavbar extends React.Component<any, any> {
  renderUserInfo = () => {
    if (this.props.hideLoginBtn) {
      return <div />;
    }

    if (this.props.isAuthenticated) {
      // render user info + Admin icon (if have)
      return <Nav className="align-items-center ml-auto ml-md-0" navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle className="nav-link pr-0" color="" tag="a">
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={ this.props.user.avatar || AVATAR_DEFAULT }
                />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold color-title">
                  {  truncateText(this.props.user.fullName, 10) }
                </span>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem className="noti-title" header tag="div">
              <h6 className="text-overflow m-0">Welcome!</h6>
            </DropdownItem>
            <DropdownItem>
              <Link
                className="dropdown-item padding-dropdown-item"
                to="/platform/user/home"
                >
                  <i className="ni ni-shop" />
                  <span>Dashboard</span>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link
                className="dropdown-item padding-dropdown-item"
                to="/user/change_password"
                >
                  <i className="ni ni-lock-circle-open" />
                  <span>Change password</span>
              </Link>
            </DropdownItem>
            <DropdownItem
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <i className="ni ni-single-02" />
              <span>My profile</span>
            </DropdownItem>
            { this.props.isAdmin && <DropdownItem>
              <Link
              className="dropdown-item padding-dropdown-item"
              to="/admin/dashboard"
              >
                <i className="ni ni-settings-gear-65" />
                <span>Administration</span>
              </Link>
            </DropdownItem>
            }
            <DropdownItem divider />
            <DropdownItem>
              <Link
                className="dropdown-item padding-dropdown-item"
                to="/auth/logout"
                >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>;
    } else {
      return <Nav className="align-items-lg-center ml-lg-auto" navbar>
        <NavItem className="d-lg-block ml-lg-4">
          <Button
            className="my-2 btn-benit-sm btn-benit-yellow mr-2"
            color="default"
            to="/auth/login"
            tag={Link}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-sign-in-alt mr-2" />
            </span>
            <span className="nav-link-inner--text">Login</span>
          </Button>
          <Button
            className="my-2 btn-benit-sm btn-benit-default"
            color="default"
            to="/auth/register"
            tag={Link}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-user-plus mr-2" />
            </span>
            <span className="nav-link-inner--text">Register</span>
          </Button>
        </NavItem>
      </Nav>;
    }
    return <div />
  }

  render() {
    return (
      <>
        <Navbar
          className="navbar-horizontal bg-nav navbar-main navbar"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand to="/" tag={Link} className="nav-benit">
              {/* <img
                className="h66"
                alt="..."
                src={require("assets/img/brand/pte-logo.png")}
              /> */}
              <Image
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
              <i className="fas fa-bars"></i>
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
                        src={require("assets/img/brand/argon-react.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
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
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="mr-auto nav-ccl" navbar>
                { this.props.isAuthenticated && <NavItem>
                  <NavLink to="/platform/user/home" tag={Link} className="navlink-ccl">
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </NavItem> }
              </Nav>
              <hr className="d-lg-none" />
              
              { this.renderUserInfo() }
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default IndexNavbar;
