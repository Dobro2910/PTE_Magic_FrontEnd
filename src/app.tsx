import React from "react";
import { BrowserRouter } from "react-router-dom";
import connect from "redux-connect-decorator";
import { getUserInfo } from "./reducers/authentication";
import cart, { getAll } from "src/reducers/cart";
import acl, { getAccessControlList } from "src/reducers/acl";
import { IRootState } from "./reducers";
// import Intercom from 'react-intercom';
// import { INTERCOM_APP_ID } from './config/constants';
import AppRoutes from "src/pte-routers";

@connect(
  ({ authentication, cart, acl }: IRootState) => ({
    loading: authentication.loading,
    isAuthenticated: authentication.isAuthenticated,
    user: authentication.user,
    sessionHasBeenFetched: authentication.sessionHasBeenFetched,
    carts: cart.carts,
    acl: acl.acl,
  }),
  {
    getUserInfo,
    getAll,
    getAccessControlList,
  }
)
export class App extends React.Component<any, any> {
  // async componentDidMount() {
  //   try {
  //     await this.props.getUserInfo();
  //   } catch (err) {

  //   }
  //   this.props.getAll();
  //   this.props.getAccessControlList();
  // }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

// export default App;
export default App;
