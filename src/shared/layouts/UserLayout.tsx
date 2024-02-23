import React from "react";
// react library for routing
import { Route, Switch, Redirect } from "react-router-dom";
// core components
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import AdminFooter from "../../components/Footers/AdminFooter";
import Sidebar from "../../components/Sidebar/Sidebar";
import connect from 'redux-connect-decorator';

import routes from "src/routes-user";
import questionBankRoutes from "src/routes-question-bank";
import resourceRoutes from "src/routes-resource";
import cart, { getAll } from 'src/reducers/cart';
import acl, { getAccessControlList } from 'src/reducers/acl';

import { IRootState } from '../../reducers';
import HeaderLoadingBar from '../../components/Navbars/LoadingBar';
import Login from '../../components/Footers/AuthFooter';
import { PteLoadingSpinner } from 'src/views/pages/components/LoadingSpinner/pte-loading-spinner';
@connect(
  ({ authentication, cart, acl }: IRootState) => ({
    loading: authentication.loading,
    isAuthenticated: authentication.isAuthenticated,
    user: authentication.user,
    sessionHasBeenFetched: authentication.sessionHasBeenFetched,
    carts: cart.carts,
    acl: acl.acl,
    aclHasBeenFetched: acl.aclHasBeenFetched
  }),
  {
    getAll,
    getAccessControlList
  }
)
class UserLayout extends React.Component<any, any> {
  state = {
    sidenavOpen: false,
    theme: "dark",
    waitLoading: false
  };

  componentWillMount() {
  }

  componentDidMount() {
    this.props.getAll();
    this.props.getAccessControlList();
    setTimeout(() => {
      this.setState({waitLoading: true})
    }, 700)
  }

  componentDidUpdate(e) {
    if (e.history.pathname !== e.location.pathname) {
      // document.documentElement.scrollTop = 0;
      // document.scrollingElement.scrollTop = 0;
      // this.refs.mainContent.scrollTop = 0;
    }

  }
  getRoutes = routes => {
    let routesTmp = routes;
    routesTmp = routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/platform/user") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
    routesTmp.push(
      <Route
        exact
        path="/platform/user/"
        component={Login}
        key="0"
      />
    );
    return routesTmp;
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

  closeSidenav = () => {
  }

  renderContent = (user) => (
      <>
        <HeaderLoadingBar />
        <Sidebar
          {...this.props}
          routes={routes}
          questionBankRoutes={questionBankRoutes}
          resourceRoutes={resourceRoutes}
          toggleSidenav={this.toggleSidenav}
          sidenavOpen={this.state.sidenavOpen}
          logo={{
            innerLink: "/",
            imgSrc: require("assets/img/brand/pte-logo.png"),
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
            theme={this.state.theme}
            toggleSidenav={this.toggleSidenav}
            sidenavOpen={this.state.sidenavOpen}
            brandText={this.getBrandText(this.props.location.pathname)}
            isAdmin={this.props.isAdmin}
            user={this.props.user}
            carts={this.props.carts}
          />
          <Switch>{this.getRoutes([...routes, ...questionBankRoutes, ...resourceRoutes])}</Switch>
          <AdminFooter />
        </div>
        {/* {this.state.sidenavOpen ? (
          <div className="backdrop d-xl-none" onClick={this.toggleSidenav} />
        ) : null} */}
      </>
  );

  render() {
    const { isAuthenticated, sessionHasBeenFetched, aclHasBeenFetched, user } = this.props;
    if (!this.state.waitLoading && !sessionHasBeenFetched || !aclHasBeenFetched) {
      return <PteLoadingSpinner />
    } else {
      if (!isAuthenticated) {
        return <Redirect
          to={{
            pathname: '/auth/login',
            search: this.props.location.search,
            state: { from: this.props.location }
          }}
        />
        return null;
      } else {
        return this.renderContent(user);
      }
    }
  }
}

export default UserLayout;
