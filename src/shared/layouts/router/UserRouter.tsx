import React from "react";
// react library for routing
import { Route, Redirect } from "react-router-dom";
// core components
import AdminNavbar from "../../../components/Navbars/AdminNavbar";
import connect from "redux-connect-decorator";
import { getAll } from "src/reducers/cart";
import { getAccessControlList } from "src/reducers/acl";
import { getUserInfo, onCloseModal } from "src/reducers/authentication";

import { IRootState } from "../../../reducers";
import { PteLoadingSpinner } from "src/views/pages/components/LoadingSpinner/pte-loading-spinner";
import { Col, Row } from "reactstrap";
import Hidden from "@material-ui/core/Hidden";
import "src/assets/css/migrate.css";
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import PteSidebar from "src/components/Sidebar/PteSidebar";
import Footer from "src/components/Footers/Footer";
import PteSidebarMobile from "src/components/Sidebar/PteSidebarMobile";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import StudyCenterFooter from "src/components/Footers/StudyCenterFooter";
import { withRouter } from "react-router-dom";
@connect(
  ({ authentication, cart, acl }: IRootState) => ({
    loading: authentication.loading,
    isAuthenticated: authentication.isAuthenticated,
    user: authentication.user,
    sessionHasBeenFetched: authentication.sessionHasBeenFetched,
    carts: cart.carts,
    acl: acl.acl,
    notiOpen: authentication.notiOpen,
    aclHasBeenFetched: acl.aclHasBeenFetched,
  }),
  {
    getAll,
    getAccessControlList,
    getUserInfo,
    onCloseModal,
  }
)
class UserRouter extends React.Component<any, any> {
  state = {
    sidenavOpen: false,
    theme: "dark",
    openMenu: false,
  };

  componentWillMount() {}

  componentDidMount() {
    console.log(this.props);
    this.props.getAll();
    this.props.getAccessControlList();
    this.props.getUserInfo();
    // this.props.getAll();
    setTimeout(() => {
      console.log(`componentDidMount sidenavOpen: ${this.state.sidenavOpen}`);
    });
  }

  componentDidUpdate(e) {}

  // toggles collapse between mini sidenav and normal
  toggleSidenav = (e) => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    this.setState({
      sidenavOpen: !this.state.sidenavOpen,
    });
    setTimeout(() => {
      console.log(`sidenavOpen: ${this.state.sidenavOpen}`);
    });
  };

  closeSidenav = () => {};
  onClickHere = () => {
    console.log(this.props);
  };

  handleMenuToggle = () => {
    this.setState({ openMenu: !this.state.openMenu });
  };

     myFunction() {
        var elmnt = document.getElementById("myDIV");
        var x = elmnt.scrollLeft;
        var y = elmnt.scrollTop;
        console.log(y, 'gt')
    }


  renderContent = (user) => (
    <>
      {/* <HeaderLoadingBar /> */}
        <div id="myDIV" onClick={this.myFunction}>

        <AdminNavbar
        {...this.props}
        theme={this.state.theme}
        toggleSidenav={this.toggleSidenav}
        sidenavOpen={this.state.sidenavOpen}
        isAdmin={this.props.isAdmin}
        user={this.props.user}
        carts={this.props.carts}
      />
      <section
        style={{
          flex: 1,
          backgroundColor: `${
            this.props.location.pathname.includes("/banks") ||
            this.props.location.pathname.includes("/cart") ||
            this.props.location.pathname.includes("/profile") ||
            this.props.location.pathname.includes("/mock_test")
              ? "#fff4d2"
              : "#ffffff"
          }`,
          paddingTop: "76px",
        }}
        className="font-family"
      >
        <div
          className="main-content"
          ref="mainContent"
          onClick={this.closeSidenav}
        >
          <Row className="main-content-layout">
            <Hidden smDown>
              <Col className="sidebar-container">
                <PteSidebar />
              </Col>
            </Hidden>
            <Col>
              <Route {...this.props} />
            </Col>
          </Row>
        </div>
      </section>
      <StudyCenterFooter />
      <Hidden mdUp>
        {this.state.openMenu || (
          <div className="toogle-button-menu" onClick={this.handleMenuToggle}>
            <ChevronRightIcon />
          </div>
        )}
        <PteSidebarMobile
          open={this.state.openMenu}
          onToggle={this.handleMenuToggle}
          onClose={this.handleMenuToggle}
        />
      </Hidden>
        </div>

    </>
  );

  render() {
    let { isAuthenticated, sessionHasBeenFetched, aclHasBeenFetched, user } =
      this.props;

    if ( !sessionHasBeenFetched || !aclHasBeenFetched) {
      return <PteLoadingSpinner />;
    } else {
      if (!isAuthenticated) {
        return (
          <Redirect
            to={{
              pathname: "/platform/auth/login",
              search: this.props.location.search,
              state: { from: this.props.location },
            }}
          />
        );
      } else {
        return this.renderContent(user);
      }
    }
  }
}

export default withRouter(UserRouter);
