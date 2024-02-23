
import React from "react";
// react library for routing
import { Route, Switch } from "react-router-dom";

// core components
import AuthFooter from "../../components/Footers/AuthFooter";
import IndexNavbar from "../../components/Navbars/IndexNavbar";

import routes from "../../routes";
import HeaderLoadingBar from '../../components/Navbars/LoadingBar';

import { IRootState } from '../../reducers';
import connect from 'redux-connect-decorator';

@connect(
  ({ authentication }: IRootState) => ({
    user: authentication.user
  }),
  {
    // getAll
  }
)
class AuthLayout extends React.Component<any, any> {
  componentDidMount() {
    document.body.classList.add("bg-benit");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-benit");
  }
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
      if (prop.layout === "/auth") {
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
  };
  closeSidenav = () => {
    
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <HeaderLoadingBar />
        <div className="main-content" ref="mainContent">
          <IndexNavbar hideLoginBtn />
          <Switch>{this.getRoutes(routes)}</Switch>
        </div>
        {/* <div className="seperator-benit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#fc0" fill-opacity="1" d="M0,192L60,186.7C120,181,240,171,360,160C480,149,600,139,720,154.7C840,171,960,213,1080,202.7C1200,192,1320,128,1380,96L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
        </div> */}
        <AuthFooter />
      </>
    );
  }
}

export default AuthLayout;
