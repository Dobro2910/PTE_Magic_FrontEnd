import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  UncontrolledTooltip,
  Media,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
import { truncateText } from "../../utils/common-utils";
import { AVATAR_TICTOK } from "../../config/constants";
import { Link } from "react-router-dom";
import "./AdminNavbar.scss";

// material ui
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Accordions from "../../components/Accordions/Accordions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";

//icons
import SwimmingFloatIcon from "../Icons/AccordionIcons/SwimmingFloatIcon";
import ChatIcon from "../Icons/AccordionIcons/ChatIcon";
import SpeakIcon from "../Icons/AccordionIcons/SpeakIcon";
import ExpertIcon from "../Icons/AccordionIcons/ExpertIcon";
import DevelopersIcon from "../Icons/AccordionIcons/DevelopersIcon";
import StarIcon from "../Icons/AccordionIcons/StarIcon";
import SystemCodeIcon from "../Icons/AccordionIcons/SystemCodeIcon";
import MoneyIcon from "../Icons/AccordionIcons/MoneyIcon";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
// @ts-ignore
import logo from "../../assets/img/logo/pte_magic_logo.svg";

class AdminNavbar extends React.Component<any, any> {
  // function that on mobile devices makes the search open
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      accordion: "none",
      menu: "block",
      width: 0,
    };
  }

  openSearch = () => {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  };
  // function that on mobile devices makes the search close
  closeSearch = () => {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  };

  handleClick = (event) => {
    // this.setState({ anchorEl: event.currentTarget });
    // this.setState({ open: !this.state.open });
    window.location.href = "https://ptemagicpractice.com/";
  };

  handleClickEBook = () => {
    window.location.href = "https://offer.ptemagicpractice.com/ebook";
  };

  handleClickCourse = () => {
    window.location.href =
      "https://ptemagic.com.au/online-pte-training-courses/";
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: !this.state.open });
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  handlesResponsive = () => {
    if (this.state.menu !== "none" && this.state.accordion != "block") {
      this.setState({ menu: "none", accordion: "block" });
    } else {
      this.setState({ menu: "block", accordion: "none" });
    }
  };

  handleProfile = () => {};

  render() {
    return (
      <>
        <div
          className="nav-menu"
          style={{
            display: this.state.width < 1300 ? this.state.menu : "none",
          }}
        >
          <AppBar
            className={classnames(
              "navbar-top navbar-expand border-bottomnavbar-light navbar-dark bg-benit app-bar"
            )}
          >
            <Toolbar>
              <img src={logo} alt="" width={120} />
              <span
                className="avatar avatar-sm rounded-circle"
                style={{
                  position: "absolute",
                  width: "28px",
                  height: "28px",
                  right: "52px",
                }}
              >
                <Link to="/platform/user/profile">
                  <img
                    alt="..."
                    src={this.props.user.avatar || AVATAR_TICTOK}
                  />
                </Link>
              </span>
              <div className="handle-button">
                <IconButton
                  edge="end"
                  aria-label="menu"
                  onClick={this.handlesResponsive}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <div
          className="nav-accordion"
          style={{
            display: this.state.width < 1300 ? this.state.accordion : "none",
          }}
        >
          <div style={{ height: "64px" }}>
            <AppBar
              className={classnames(
                "navbar-top navbar-expand border-bottomnavbar-light navbar-dark bg-benit app-bar"
              )}
            >
              <Toolbar>
                <img src={logo} alt="" width={120} />
                <span className="handle-button">
                  <IconButton
                    edge="end"
                    aria-label="menu"
                    onClick={this.handlesResponsive}
                  >
                    <CloseIcon />
                  </IconButton>
                </span>
              </Toolbar>
            </AppBar>
          </div>
          <Accordions user={this.props.user} />
        </div>

        <div className="navbar-dropdown">
          <AppBar
            className={classnames(
              "navbar-top navbar-expand border-bottomnavbar-light navbar-dark bg-benit app-bar"
            )}
          >
            <Toolbar className="justify-center">
              <div
                className="justify-center"
                style={{
                  maxWidth: 1240,
                  width: "100%",
                  margin: "0 auto",
                  display: "flex",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div className="logo-nav">
                    <img src={logo} alt="" width={120} />
                  </div>
                  <div className="navbar-link-item space-items">
                    <span>
                      <Button
                        aria-describedby="simple-popover"
                        onClick={this.handleClick}
                        className="dropdown-name button-app-bar"
                      >
                        <h4 className="">Home</h4>
                      </Button>
                      <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="box-container-dropdown">
                          <div>
                            <Grid
                              container
                              direction="row"
                              style={{ width: "500px" }}
                            >
                              <Grid
                                item
                                lg={6}
                                md={6}
                                xs={6}
                                style={{ width: "40%" }}
                              >
                                <Grid
                                  container
                                  direction="column"
                                  className="part-box"
                                >
                                  <Grid item className="space-bottom">
                                    <span>
                                      <SwimmingFloatIcon />
                                    </span>
                                    <span className="black-title space-title">
                                      Help Center
                                    </span>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <span>
                                      <ChatIcon />
                                    </span>
                                    <span className="black-title space-title-icon">
                                      Community
                                    </span>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <span>
                                      <SpeakIcon />
                                    </span>
                                    <span className="black-title space-title-icon">
                                      Product Updates
                                    </span>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <span>
                                      <ExpertIcon />
                                    </span>
                                    <span className="black-title space-title-icon">
                                      Expert Marketplace
                                    </span>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <span>
                                      <DevelopersIcon />
                                    </span>
                                    <span className="black-title space-title-icon">
                                      API & Developers
                                    </span>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <span>
                                      <StarIcon />
                                    </span>
                                    <span className="black-title space-title-icon">
                                      Partner Program
                                    </span>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <span>
                                      <SystemCodeIcon />
                                    </span>
                                    <span className="black-title space-title-icon">
                                      System status
                                    </span>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                lg={6}
                                md={6}
                                xs={6}
                                style={{ width: "23%" }}
                              >
                                <Grid
                                  container
                                  direction="column"
                                  className="part-box border-box"
                                >
                                  <Grid item className="space-bottom">
                                    <div className="gray-title">Learn</div>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <div>
                                      <span>
                                        <MoneyIcon />
                                      </span>
                                      <span className="black-title space-title-icon">
                                        Success by livechat
                                      </span>
                                    </div>
                                    <div className="little-title">
                                      More than a business blog!
                                    </div>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <div>
                                      <span className="black-title">
                                        Customer Service Report
                                      </span>
                                    </div>
                                    <div className="little-title">
                                      Discover the latest data
                                    </div>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <div>
                                      <span className="black-title">
                                        Local Benchmark
                                      </span>
                                    </div>
                                    <div className="little-title">
                                      Compare your result
                                    </div>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <div>
                                      <span className="black-title">
                                        Webinars
                                      </span>
                                    </div>
                                    <div className="little-title">
                                      Live Chat workshop
                                    </div>
                                  </Grid>
                                  <Grid item className="space-bottom">
                                    <div>
                                      <span className="black-title">
                                        Privacy Policy Generator
                                      </span>
                                    </div>
                                    <div className="little-title">
                                      Become GDPR compliant
                                    </div>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </Popover>
                    </span>
                    <span>
                      <Button
                        aria-describedby="simple-popover"
                        onClick={this.handleClickEBook}
                        className="dropdown-name button-app-bar"
                      >
                        <h4>E-Book</h4>
                      </Button>
                    </span>
                    <span>
                      <Button
                        aria-describedby="simple-popover"
                        onClick={this.handleClickCourse}
                        className="dropdown-name button-app-bar"
                      >
                        <h4>Online Training Courses</h4>
                      </Button>
                    </span>

                    <span>
                      <Link to="/#">
                        <Button
                          aria-describedby="simple-popover"
                          // onClick={this.handleClickBlog}
                          className="dropdown-name button-app-bar"
                        >
                          <h4>Blog</h4>
                        </Button>
                      </Link>
                    </span>
                    {/* <span>
                      <Button
                        aria-describedby="simple-popover"
                        onClick={this.handleClick}
                        className="dropdown-name button-app-bar"
                      >
                        <h4>Contact Us</h4>
                      </Button>
                    </span> */}
                  </div>
                </div>

                <Nav className="align-items-center ml-md-auto cart cart" navbar>
                  <NavItem className="d-xl-none">
                    <div
                      className={classnames(
                        "pr-3 sidenav-toggler",
                        { active: this.props.sidenavOpen },
                        { "sidenav-toggler-dark": this.props.theme === "dark" }
                      )}
                      onClick={this.props.toggleSidenav}
                    >
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                      </div>
                    </div>
                  </NavItem>
                  <NavItem>
                    <Tooltip
                      className="shopping-cart-tooltip"
                      title="Your shopping cart"
                    >
                      <Link to={`/platform/user/cart`}>
                        {this.props.carts && this.props.carts.length > 0 ? (
                          <>
                            <div className={`header-icon icon-cart`}></div>
                            <span className="badge-cart">
                              {this.props.carts.length}
                            </span>
                          </>
                        ) : (
                          <>
                            <div
                              className={`header-icon icon-cart-empty`}
                            ></div>
                          </>
                        )}
                      </Link>
                    </Tooltip>
                  </NavItem>
                  {this.props.isAdmin && (
                    <NavItem>
                      {this.props.isAdmin && (
                        <NavLink
                          className="nav-link-icon color-title"
                          href="/admin/dashboard"
                          id="tooltip601201423"
                        >
                          <i className="ni ni-settings-gear-65" />
                        </NavLink>
                      )}
                      <UncontrolledTooltip delay={0} target="tooltip601201423">
                        Administration
                      </UncontrolledTooltip>
                    </NavItem>
                  )}
                </Nav>
                <Nav className="align-items-center ml-auto ml-md-0 cart" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="nav-link pr-0" color="" tag="a">
                      <Media className="align-items-center">
                        <span className="avatar avatar-sm rounded-circle">
                          <img
                            alt="..."
                            src={this.props.user.avatar || AVATAR_TICTOK}
                          />
                        </span>
                        <Media className="ml-2 d-none d-lg-block">
                          <span className="mb-0 text-sm font-weight-bold color-title">
                            {truncateText(this.props.user.fullName, 10)}
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
                          to="/platform/user/change_password"
                        >
                          <i className="ni ni-lock-circle-open" />
                          <span>Change password</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          className="dropdown-item padding-dropdown-item"
                          to="/platform/user/profile"
                        >
                          <i className="ni ni-single-02" />
                          <span>My profile</span>
                        </Link>
                      </DropdownItem>
                      {this.props.isAdmin && (
                        <DropdownItem>
                          <Link
                            className="dropdown-item padding-dropdown-item"
                            to="/admin/dashboard"
                          >
                            <i className="ni ni-settings-gear-65" />
                            <span>Administration</span>
                          </Link>
                        </DropdownItem>
                      )}
                      <DropdownItem divider />
                      <DropdownItem>
                        <Link
                          className="dropdown-item padding-dropdown-item"
                          to="/platform/auth/logout"
                        >
                          <i className="ni ni-user-run" />
                          <span>Logout</span>
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </>
    );
  }
}

export default AdminNavbar;