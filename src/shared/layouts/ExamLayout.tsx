import React from "react";
// react library for routing
import { Route, Switch, Redirect } from "react-router-dom";
// core components
import connect from 'redux-connect-decorator';
import routes from "../../routes-user";
import questionBankRoutes from "../../routes-question-bank";
import examRoutes from "../../routes-exam";
import resourceRoutes from "src/routes-resource";
import mockTestRoutes from "src/routes-mock-test";

import { IRootState } from '../../reducers';
import HeaderLoadingBar from '../../components/Navbars/LoadingBar';
import Login from '../../components/Footers/AuthFooter';
import ExamSidebar from 'src/components/Sidebar/ExamSidebar';
import ExamSidebarRight from 'src/components/Sidebar/ExamSidebarRight';
import { ExamSharedProvider } from 'src/context/exam.context';
import withTracker from 'src/views/pages/components/withTracker';

@connect(
  ({ authentication }: IRootState) => ({
    loading: authentication.loading,
    isAuthenticated: authentication.isAuthenticated,
    user: authentication.user,
    sessionHasBeenFetched: authentication.sessionHasBeenFetched
  }),
  {
    // getUserInfo
  }
)
class ExamLayout extends React.Component<any, any> {
  state = {
    sidenavOpen: true
  };

  componentWillMount() {
  }

  componentDidUpdate(e) {
    if (e.history.pathname !== e.location.pathname) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  getRoutes = routes => {
    let routesTmp = routes;
    routesTmp = routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/exam") {
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
    routesTmp.push(
      <Route
        exact
        path="/exam/"
        component={withTracker(Login)}
        key="0"
      />
    );
    return routesTmp;
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
      "user/alternative-dashboard"
    ) === -1
      ? "dark"
      : "light";
  };

  renderContent = () => (
      <>
        <ExamSharedProvider>
          <HeaderLoadingBar />
          <ExamSidebar
            {...this.props}
            routes={routes}
            questionBankRoutes={questionBankRoutes}
            mockTestRoutes={mockTestRoutes}
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
            className="main-content position-relative"
            ref="mainContent"
          >
            <Switch>{this.getRoutes([...routes, ...examRoutes, ...resourceRoutes])}</Switch>

            <ExamSidebarRight />
          </div>
        </ExamSharedProvider>
      </>
  );

  render() {
    const { isAuthenticated, sessionHasBeenFetched } = this.props;
    if (!sessionHasBeenFetched) {
      return <div />
    } else {
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
    }
  }
}

export default ExamLayout;
