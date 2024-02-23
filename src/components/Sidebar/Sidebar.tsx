
import React from "react";
// react library for routing
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from "react-perfect-scrollbar";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
import Image from 'react-image-webp';

class Sidebar extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      ...this.getCollapseStates(props.routes)
    };
  }

  componentDidMount() {
    this.onMouseEnterSidenav();
    this.onMouseLeaveSidenav();
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // makes the sidenav normal on hover (actually when mouse enters on it)
  onMouseEnterSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  };
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  };
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  closeSidenav = () => {
    if (window.innerWidth < 1200) {
      this.props.toggleSidenav();
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.hideSidebar) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !this.state[prop.state];
        return (
          <NavItem key={key}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={this.state[prop.state]}
              className={classnames({
                active: this.getCollapseInitialState(prop.views)
              })}
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              {prop.icon ? <i className={prop.icon} /> : null}
              <span className="nav-link-text">{prop.name}</span>
            </NavLink>
            <Collapse isOpen={this.state[prop.state]}>
              <Nav className="nav-sm flex-column">
                {this.createLinks(prop.views)}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }
      return (
        <NavItem
          className={`${this.activeRoute(prop.layout + prop.path)} ${prop.navItemClass}`}
          key={key}
        >
          <NavLink
            to={prop.layout + prop.path}
            activeClassName=""
            onClick={this.closeSidenav}
            tag={NavLinkRRD}
          >
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <span className="nav-link-text">
                  {prop.name}
                  {prop.extraIcon ? <i className={prop.extraIcon} /> : null}
                </span>
              </>
            ) : (
              prop.name
            )}
          </NavLink>
        </NavItem>
      );
    });
  };
  render() {
    const { routes, logo, questionBankRoutes, resourceRoutes, mockTestRoutes } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    const scrollBarInner = (
      <div className="scrollbar-inner">
        <div className="sidenav-header d-flex align-items-center" style={{ padding: '10px'}}>
          {logo ? (
            <NavbarBrand {...navbarBrandProps} className="nav-benit">
              {/* <img
                alt={logo.imgAlt}
                className="userlayout-nav-img"
                src={logo.imgSrc}
              /> */}
              <Image
                  src={require("assets/img/brand/pte-logo.png")}
                  webp={require("assets/img/brand/pte-logo.webp")}
              />
            </NavbarBrand>
          ) : null}
          <div className="ml-auto">
            <div
              className={classnames("sidenav-toggler ", {
                active: this.props.sidenavOpen
              })}
              onClick={this.props.toggleSidenav}
            >
              <div className="sidenav-toggler-inner">
                <i className="sidenav-toggler-line" />
                <i className="sidenav-toggler-line" />
                <i className="sidenav-toggler-line" />
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-inner">
          <Collapse navbar isOpen={true}>
            <Nav navbar>{this.createLinks(routes)}</Nav>
            <hr className="my-3" />
            <h6 className="navbar-heading p-0 text-muted">QUESTION BANK</h6>
            <Nav navbar>{this.createLinks(questionBankRoutes)}</Nav>
            <hr className="my-3" />
            <h6 className="navbar-heading p-0 text-muted">MOCK TEST</h6>
            <Nav navbar>{this.createLinks(mockTestRoutes)}</Nav>
            <hr className="my-3" />
            <h6 className="navbar-heading p-0 text-muted">OTHERS</h6>
            <Nav className="" navbar>
              <NavItem>
                <NavLink
                  href="https://course.ptemagicpractice.com/express"
                  target="_blank"
                >
                  <i className="benit-icon icon-youtube" />
                  <span className="nav-link-text">Video Course</span>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="" navbar>
              <NavItem>
                <NavLink
                  href="https://offer.ptemagicpractice.com/ebook"
                  target="_blank"
                >
                  <i className="benit-icon icon-reading" />
                  <span className="nav-link-text">PTE EBook</span>
                </NavLink>
              </NavItem>
            </Nav>
            {/* <Nav navbar>{this.createLinks(resourceRoutes)}</Nav> */}
            <Nav className="" navbar>
              <NavItem>
                <NavLink
                  href="https://ptemagic.com.au/online-pte-training-courses/"
                  target="_blank"
                >
                  <i className="benit-icon icon-friend" />
                  <span className="nav-link-text">PTE Online Classes</span>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="" navbar>
              <NavItem>
                <NavLink
                  href="https://ptemagicpractice.com/faqs"
                  target="_blank"
                >
                  <i className="benit-icon icon-vocabulary" />
                  <span className="nav-link-text">FAQs</span>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="" navbar>
              <NavItem>
                <NavLink
                  href="https://ptemagicpractice.com/pte-practice-test"
                  target="_blank"
                >
                  <i className="benit-icon icon-grammar" />
                  <span className="nav-link-text">PTE Practice Resources</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </div>
    );
    return (
      <Navbar
        className="sidenav navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white"
        onMouseEnter={this.onMouseEnterSidenav}
        onMouseLeave={this.onMouseLeaveSidenav}
      >
        {navigator.platform.indexOf("Win") > -1 ? (
          <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
        ) : (
          scrollBarInner
        )}
      </Navbar>
    );
  }
}

export default Sidebar;
