
import React from "react";
// nodejs library that concatenates classes
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { GOOGLE_APP_ID, FACEBOOK_APP_ID } from '../../../config/constants';
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
import {loginUser, logout, register} from '../../../reducers/authentication';
// import connect from 'redux-connect-decorator';
import { Redirect, Link } from "react-router-dom";
import YouTube from "react-youtube";
import Grid from "@material-ui/core/Grid";
import {LoginBackground} from "../components/LoginBackground/pte-login-background";
import logo from "../../../assets/img/logo/pte_magic_logo.svg";
import {CircularProgress} from "@material-ui/core";

class Register extends React.Component {
  state = {
    btnEnable: false
  };

  handleValidSubmit = (event, values) => {
    event.preventDefault();

    // compare password
    if (values.password !== values.confirmPassword) {
      toast.error('Password not equal.')
      return;
    }

    this.props.register(values.email, values.password, values.fullName, values.phonenumber);
  };

  responseFacebook = response => {
    // tslint:disable-next-line
    console.log(response);
    const email = response.email;
    const password = 'no-password';
    const socialNetwork = 'facebook';
    const fullName = response.name;
    const phonenumber = null;
    const socialToken = response.accessToken;
    this.props.register(email, password, fullName, phonenumber, socialNetwork, socialToken);
  };

  responseGoogleSuccess = response => {
    // tslint:disable-next-line
    console.log(response);
    const email = response.profileObj.email;
    const password = 'no-password';
    const socialNetwork = 'google';
    const fullName = response.profileObj.name;
    const phonenumber = null;
    const socialToken = response.tokenId;
    this.props.register(email, password, fullName, phonenumber, socialNetwork, socialToken);
  }

  responseGoogleFail(response) {
    // tslint:disable-next-line
    console.log(response);
    // toast.error('Login with Google fail.');
  }

  render() {
    const { result, auth } = this.props;
    const opts = {
      width: "100%",
    };
    return (
      <>
        { result && <Redirect to={'/platform/auth/login'} />}
            <Grid className="login-background">
              <LoginBackground/>
            </Grid>
            <Grid className="login-form">
              <Grid style={{width: "600px"}}>
                <Card className="bg-secondary border-0 mb-0 h-100 background-login">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="logo-position">
                      <img src={logo} alt="" className="logo-login"/>
                    </div>
                    <p className="login-input-title">Email</p>
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
                      <p className="login-input-title">Password</p>
                      <FormGroup>
                        <InputGroup className="input-group-merge input-group-alternative form-auth input-login">
                          <AvInput
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            validate={{
                              required: { value: true, errorMessage: "Your password is required." },
                              minLength: { value: 4, errorMessage: "Your password is required to be at least 4 characters." },
                              maxLength: { value: 50, errorMessage: "Your password cannot be longer than 50 characters." }
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                      <p className="login-input-title">Confirm Password</p>
                      <FormGroup>
                        <InputGroup className="input-group-merge input-group-alternative form-auth input-login">
                          <AvInput
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            required
                            validate={{
                              required: { value: true, errorMessage: "Your password is required." },
                              minLength: { value: 4, errorMessage: "Your password is required to be at least 4 characters." },
                              maxLength: { value: 50, errorMessage: "Your password cannot be longer than 50 characters." }
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                      <p className="login-input-title">Full Name</p>
                      <FormGroup>
                        <InputGroup className="input-group-merge input-group-alternative form-auth input-login">
                          <AvField
                            name="fullName"
                            placeholder="Full name"
                            type="text"
                            required
                          />
                        </InputGroup>
                      </FormGroup>
                      <div>
                        <Button className="signin-button" type="submit" disabled={auth.loading}>
                          {auth.loading ? (
                            <CircularProgress style={{color: "#000000"}} size={20} />
                          ) : (
                            auth.isAuthenticated ? (
                              <CircularProgress style={{color: "#000000"}} size={20} />
                            ) : (
                              <>Sign up</>
                            )
                          )}
                        </Button>
                      </div>
                    </AvForm>
                    <div className="create-account">
                      <Link
                        className="text-dark"
                        to="/platform/auth/login"
                      >
                        <span style={{ fontSize: '15px', color: "blue" }}>Sign In</span>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Grid>
            </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authentication,
    result: state.authentication.result,
    errors: state.errors  };
};

const mapDispatchToProps = {
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
