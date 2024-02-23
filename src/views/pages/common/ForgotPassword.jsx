
import React from "react";
// nodejs library that concatenates classes
import { AvForm, AvField } from 'availity-reactstrap-validation';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader";
import { handlePasswordResetInit } from '../../../reducers/account';
import connect from 'redux-connect-decorator';
import { Redirect, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {LoginBackground} from "../components/LoginBackground/pte-login-background";

@connect(
  state => ({
    loading: state.account.loading,
  }),
  {
    handlePasswordResetInit
  }
)
class ForgotPassword extends React.Component {
  state = {
    btnEnable: false
  };

  handleValidSubmit = (event, values) => {
    event.preventDefault();

    this.props.handlePasswordResetInit(values.email);
  };

  render() {
    const { result } = this.props;
    return (
      <>
        { result && <Redirect to={'/auth/login'} />}
        {/* <AuthHeader
          title="RESET YOUR PASSWORD"
          lead="Welcome to PTE MAGIC! Enter the email address you used to register."
        /> */}
        <Grid className="login-background">
          <LoginBackground/>
        </Grid>
        <Grid className="login-form">
              <Card className="bg-secondary border-0 mb-0 background-login">
                <CardBody className="px-lg-5 py-lg-5">
                  {/* <div className="text-center text-muted mb-4">
                    <small>Forgot Password</small>
                  </div> */}
                  <h2>RESET YOUR PASSWORD</h2>
                  <p>Welcome to PTE MAGIC! Enter the email address you used to register.</p>
                  <AvForm role="form" onValidSubmit={this.handleValidSubmit}>
                    <FormGroup>
                      <InputGroup className="input-group-merge input-group-alternative form-auth input-login">
                        <AvField
                          name="email"
                          placeholder="Email"
                          type="email"
                          validate={{
                            required: { value: true, errorMessage: "Your email is required." },
                            minLength: { value: 5, errorMessage: "Your email is required to be at least 5 characters." },
                            maxLength: { value: 50, errorMessage: "Your email cannot be longer than 50 characters." }
                          }}
                          autoFocus
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="reset-button" type="submit">
                        Reset password
                      </Button>
                    </div>
                  </AvForm>
                  <div className="d-flex" style={{ justifyContent: "space-between" }}>
                    <Link
                      className="text-dark"
                      to="/auth/register"
                    >
                      <span style={{ fontSize: '15px' }}>Create new account?</span>
                    </Link>
                    <Link
                      className="text-dark"
                      to="/auth/login"
                    >
                      <span style={{ fontSize: '15px' }}>Sign In</span>
                    </Link>
                  </div>
                </CardBody>
              </Card>

            </Grid>
      </>
    );
  }
}

export default ForgotPassword;
