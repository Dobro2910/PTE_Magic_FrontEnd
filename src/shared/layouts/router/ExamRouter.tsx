import React from "react";
// react library for routing
import { Route, Switch, Redirect } from "react-router-dom";
// core components
import connect from "redux-connect-decorator";
import routes from "../../../routes-user";
import questionBankRoutes from "../../../routes-question-bank";
import resourceRoutes from "src/routes-resource";
import mockTestRoutes from "src/routes-mock-test";

import { IRootState } from "../../../reducers";
import HeaderLoadingBar from "../../../components/Navbars/LoadingBar";
import ExamSidebar from "src/components/Sidebar/ExamSidebar";
import ExamSidebarRight from "src/components/Sidebar/ExamSidebarRight";
import { ExamSharedProvider } from "src/context/exam.context";

import "src/assets/css/migrate.css";
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/animate.min.css";
import QuestionSidebar from "src/components/Sidebar/QuestionSidebar";
import Footer from "src/components/Footers/Footer";

@connect(
  ({ authentication }: IRootState) => ({
    loading: authentication.loading,
    isAuthenticated: authentication.isAuthenticated,
    user: authentication.user,
    sessionHasBeenFetched: authentication.sessionHasBeenFetched,
  }),
  {
    // getUserInfo
  }
)
class ExamRouter extends React.Component<any, any> {
  state = {
    sidenavOpen: true,
  };

  componentWillMount() {}

  componentDidUpdate(e) {
    // if (e.history.pathname !== e.location.pathname) {
    //   document.documentElement.scrollTop = 0;
    //   document.scrollingElement.scrollTop = 0;
    // }
  }

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
  };
  getNavbarTheme = () => {
    return this.props.location.pathname.indexOf(
      "user/alternative-dashboard"
    ) === -1
      ? "dark"
      : "light";
  };

  renderContent = () => (
    <React.Fragment>
      <ExamSharedProvider>
        <HeaderLoadingBar />
        <section style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <div className="main-content-exam">
            <Route {...this.props} />
          </div>
        </section>
        {!this.props.location.pathname.includes("/mock_test") && (
          <QuestionSidebar />
        )}

        <Footer />
      </ExamSharedProvider>
    </React.Fragment>
  );

  render() {
    const { isAuthenticated, sessionHasBeenFetched } = this.props;
    if (!sessionHasBeenFetched) {
      return <div />;
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
        return this.renderContent();
      }
    }
  }
}

export default ExamRouter;
