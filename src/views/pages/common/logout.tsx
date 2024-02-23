import React from 'react';
import connect from 'redux-connect-decorator';
import { Redirect } from 'react-router-dom';

import AuthHeader from '../../../components/Headers/AuthHeader';
import { logout } from '../../../reducers/authentication';
import { IRootState } from '../../../reducers';

@connect(
  (storeState: IRootState) => ({}),
  {
    logout
  }
)
export default class Logout extends React.Component<any, any> {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <>
        <AuthHeader
          title="Logged out successfully!"
          lead=""
        />
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      </>
    );
  }
}
