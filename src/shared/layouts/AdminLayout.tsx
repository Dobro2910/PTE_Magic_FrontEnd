
import React, { Component } from "react";
// react library for routing
import { Route, Switch, Redirect } from "react-router-dom";
// core components
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import AdminFooter from "../../components/Footers/AdminFooter";
import Sidebar from "../../components/Sidebar/Sidebar";
import connect from 'redux-connect-decorator';
import routes from "../../routes-admin";
import { hasAnyAuthority } from '../../utils/common-utils';
import withTracker from 'src/views/pages/components/withTracker';

@connect(
  state => ({
    auth: state.auth,
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: hasAnyAuthority(state.auth.user.authorities, ['ROLE_ADMIN']),
    user: state.auth.user
  }),
  {
    // getUserInfo
  }
)
class AdminLayout extends Component<any, any> {
  state = {
    sidenavOpen: true
  };
  componentDidUpdate(e) {
    if (e.history.pathname !== e.location.pathname) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      // this.refs.mainContent.scrollTop = 0;
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={withTracker(prop.component)}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  // toggles collapse between mini sidenav and normal
  toggleSidenav = e => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    this.setState({
      sidenavOpen: !this.state.sidenavOpen
    });
  };
  getNavbarTheme = () => {
    return this.props.location.pathname.indexOf(
      "admin/alternative-dashboard"
    ) === -1
      ? "dark"
      : "light";
  };
  closeSidenav = () => {

  }

  renderContent = () => (
    <>
      <Sidebar
        {...this.props}
        routes={routes}
        toggleSidenav={this.toggleSidenav}
        sidenavOpen={this.state.sidenavOpen}
        logo={{
          innerLink: "/",
          imgSrc: require("assets/img/brand/argon-react.png"),
          imgAlt: "..."
        }}
      />
      <div
        className="main-content"
        ref="mainContent"
        onClick={this.closeSidenav}
      >
        <AdminNavbar
          {...this.props}
          theme={this.getNavbarTheme()}
          toggleSidenav={this.toggleSidenav}
          sidenavOpen={this.state.sidenavOpen}
          brandText={this.getBrandText(this.props.location.pathname)}
          isAdmin={this.props.isAdmin}
          user={this.props.user}
        />
        <Switch>{this.getRoutes(routes)}</Switch>
        <AdminFooter />
      </div>
      {this.state.sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={this.toggleSidenav} />
      ) : null}
    </>
);

  render() {
    const { isAuthenticated, loading, auth } = this.props;

    if (auth) {
      if (!isAuthenticated) {
        return <Redirect
          to={{
            pathname: '/auth/login',
            search: this.props.location.search,
            state: { from: this.props.location }
          }}
        />
      } else {
        return this.renderContent();
      }
    } else {
      return <div />;
    }
  }
}

export default AdminLayout;
