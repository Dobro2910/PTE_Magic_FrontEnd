import React, { Component, Suspense } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Button, Row } from "reactstrap";
import BenitHeader from "src/components/Headers/BenitHeader";
import queryString from "query-string";
import connect from "redux-connect-decorator";
import { IRootState } from "src/reducers/index";
import { activateAccount, resetActivate } from "src/reducers/activate";
import { Link } from "react-router-dom";
import { LoginBackground } from "../components/LoginBackground/pte-login-background";
import { Grid } from "@material-ui/core";

const logo = require("../../../assets/img/logo/pte_magic_logo.svg");

const successAlert = (
  <>
    <div className="text-center text-success">
      <strong>Your user account has been activated.</strong>
    </div>
    <Button className="reset-button" type="submit">
      Sign In
    </Button>
  </>
);

const failureAlert = (
  <>
    <div className="text-center text-danger">
      <strong>Your user could not be activated.</strong> Please use the
      registration form to sign up.
    </div>
  </>
);

const keyNotfound = (
  <>
    <div className="text-center">
      <span className="text-danger">Key not found.</span>
    </div>
  </>
);

@connect(
  ({ activate }: IRootState) => ({
    activationSuccess: activate.activationSuccess,
    activationFailure: activate.activationFailure,
  }),
  {
    activateAccount,
    resetActivate,
  }
)
class Activation extends Component<any, any> {
  state = {
    key: queryString.parse(this.props.location.search).key,
    message: null,
  };

  componentWillUnmount() {
    this.props.resetActivate();
  }

  componentDidMount() {
    if (this.state.key) {
      this.props.activateAccount(this.state.key);
    } else {
      this.setState({ message: "Key not found" });
    }
  }

  componentWillReceiveProps({ acl }) {}

  constructor(props) {
    super(props);
  }

  render() {
    const { activationSuccess, activationFailure } = this.props;

    return (
      <>
        <Grid className="login-background">
          <LoginBackground />
        </Grid>
        <Grid className="login-form">
          <Card className="bg-secondary border-0 mb-0 background-login">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="logo-position">
                <img src={logo} alt="" className="logo-login" />
              </div>
              <h2 className="text-center">
                {this.state.message && keyNotfound}
                {activationSuccess && successAlert}
                {activationFailure && failureAlert}
              </h2>
            </CardBody>
          </Card>
        </Grid>

        {/* <Container className="mt--6" fluid>
          <Suspense fallback={<div>Loading...</div>}>
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="text-center">
                    <h3 className="mb-0">Activation</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="text-center">
                      {this.state.message && keyNotfound}
                      {activationSuccess && successAlert}
                      {activationFailure && failureAlert}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Row>
          </Suspense>
        </Container> */}
      </>
    );
  }
}

export default Activation;
