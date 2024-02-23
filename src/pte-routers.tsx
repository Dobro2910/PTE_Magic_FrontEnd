import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import Loadable from 'react-loadable';
import withTracker from './views/pages/components/withTracker'; 
import Login from "./views/pages/common/Login";
import AuthRouter from './shared/layouts/router/NoAuthRouter';

import { getUserInfo } from './reducers/authentication';
import { getAll } from 'src/reducers/cart';
import { getAccessControlList } from 'src/reducers/acl';
import { IRootState } from './reducers';

const ExamModule = Loadable({
  loader: () => import(/* webpackChunkName: "exam" */ 'src/shared/modules/exam'),
  loading: () => <div></div>
});

const AppModule = Loadable({
  loader: () => import(/* webpackChunkName: "app" */ 'src/shared/modules/app'),
  loading: () => <div></div>
});

const NoAuthModule = Loadable({
  loader: () => import(/* webpackChunkName: "app" */ 'src/shared/modules/no-auth'),
  loading: () => <div></div>
});

@connect(
  ({ authentication, cart, acl }: IRootState) => ({
    loading: authentication.loading,
    isAuthenticated: authentication.isAuthenticated,
    user: authentication.user,
    sessionHasBeenFetched: authentication.sessionHasBeenFetched,
    carts: cart.carts,
    acl: acl.acl
  }),
  {
    getUserInfo,
    getAll,
    getAccessControlList
  }
)
class AppUser extends React.Component<any, any> {
  async componentDidMount() {
    try {
      console.log('aaaaaaa');
      
      await this.props.getUserInfo();
    } catch (err) {

    }
    this.props.getAll();
    this.props.getAccessControlList();
  }

  render() {
    return (
      <Switch>
        <Route path="/platform/user" component ={ AppModule } key="router-AppModule" />
        <Route path="/platform/exam" component ={ ExamModule } key="router-ExamModule" />
        <Redirect from="*" to="/platform/auth/login" />
      </Switch>
    );
  }
}
// tslint:enable

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <AuthRouter path="/platform/auth/login" component={ withTracker(Login) } />
      <Route path="/platform/auth" component ={ NoAuthModule } key="router-NoAuthModule"  />
      <Route path="/platform/" component ={ AppUser } key="router-PrivateModule"/> 

      <Redirect from="*" to="/platform/auth/login" />
    </Switch>
  </div>
);

export default Routes;
