import React, {useState} from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
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
import { loginUser, logout } from './../../../reducers/authentication';
import { Redirect, Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import FacebookLogin from 'react-facebook-login';

import { GOOGLE_APP_ID, FACEBOOK_APP_ID,AUTH_TOKEN_KEY } from '../../../config/constants';
import {CircularProgress} from "@material-ui/core";

import Grid from '@material-ui/core/Grid';

// material-ui icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import login from "../../../assets/img/login.png"
import AuthFooter from "../../../components/Footers/AuthFooter";
import logo from '../../../assets/img/logo/pte_magic_logo.svg'

import { connect } from 'react-redux';
import {LoginBackground} from "../components/LoginBackground/pte-login-background";

const google = require("assets/img/google.svg")
const facebook = require("assets/img/facebook.png")

function Login(props) {
  let [eyeIcon, setEyeIcon] = useState(false)

  const handleSubmit = (event, errors, { username, password }) => {
    const userData = {
      username,
      password
    };
    localStorage.clear();
    // setLoading(true)
    setTimeout(() => {
      props.loginUser(userData);
    }, 1000)
  };

  const responseFacebook = response => {
    // tslint:disable-next-line
    console.log(response);
    if (response.accessToken && response.id) {
      const username = response.email ? response.email : `${response.id}@gmail.com`;
      const fullName = response.name;
      const password = 'no-password';
      const socialNetwork = 'facebook';
      const socialToken = response.accessToken;
      const avatar = `https://graph.facebook.com/${response.id}/picture`;
      const userData = {
        username,
        password,
        socialNetwork,
        socialToken,
        avatar,
        fullName
      };
      localStorage.clear();
      props.loginUser(userData);
    }
  };

  const responseGoogleSuccess = response => {
    // tslint:disable-next-line
    console.log(response);
    const username = response.profileObj.email;
    const password = 'no-password';
    const socialNetwork = 'google';
    const socialToken = response.tokenId;
    const avatar = response.profileObj.imageUrl;
    const fullName = response.profileObj.name;
    const userData = {
      username,
      password,
      socialNetwork,
      socialToken,
      avatar,
      fullName
    };
    localStorage.clear();
    props.loginUser(userData);
  }

  const responseGoogleFail = (response) => {
    // tslint:disable-next-line
    console.log(response);
    // toast.error('Login with Google fail.');
  }

  const handleShowPass = () => {
    setEyeIcon(!eyeIcon)
  }

  let { auth, location } = props;
  let { from } = location.state || { from: { pathname: '/platform/user/home', search: location.search } };
    return (
      <>
        { auth.isAuthenticated && <Redirect to={from} />}
        <Grid className="login-background">
          <LoginBackground/>
        </Grid>
        <Grid className="login-form">
          <Grid style={{width: "600px"}}>
            <Card className="bg-secondary border-0 mb-0 h-100 background-login">
              <CardBody className="px-lg-5 py-lg-5">
                {/*<div className="text-black text-center mt-2 mb-3">*/}
                {/*  <span className="label-sign-in">Sign in to your account</span>*/}
                {/*</div>*/}

                {/*<div class="seperator-or mt-2 mb-4"> or </div>*/}
                <div className="logo-position">
                  <img src={logo} alt="" className="logo-login"/>
                </div>
                <p className="login-input-title">Email</p>
                <AvForm role="form" onSubmit={handleSubmit}>
                  <FormGroup
                    className={classnames("mb-3")}
                  >
                    <InputGroup className="input-group-merge input-group-alternative form-auth input-login">
                      <AvField
                        required
                        name="username"
                        placeholder="Email"
                        type="email"
                        validate={{
                          required: { value: true, errorMessage: "Your email is required." },
                          minLength: { value: 5, errorMessage: "Your email is required to be at least 5 characters." },
                          maxLength: { value: 50, errorMessage: "Your email cannot be longer than 50 characters." }
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                  <p className="login-input-title">Password</p>
                  <FormGroup>
                    <InputGroup className="input-login">
                      <AvInput
                        name="password"
                        type={eyeIcon ? "text" : "password"}
                        placeholder="Password"
                        validate={{
                          required: { value: true, errorMessage: "Your password is required." },
                          minLength: { value: 4, errorMessage: "Your password is required to be at least 4 characters." },
                          maxLength: { value: 50, errorMessage: "Your password cannot be longer than 50 characters." }
                        }}
                      />
                      <div onClick={handleShowPass}>
                        <InputGroupAddon addonType="append">
                          <InputGroupText className="eye-icon">
                            <div>
                              {eyeIcon ? (
                                <VisibilityIcon/>
                              ) : (
                                <VisibilityOffIcon/>
                              )}
                            </div>
                          </InputGroupText>
                        </InputGroupAddon>
                      </div>
                    </InputGroup>
                  </FormGroup>
                  <div className="info-login">
                    <span>By clicking Sign In, you agree to our <strong>Terms of User</strong> and our <strong>Privacy Policy</strong>.</span>
                  </div>
                  <div className="d-flex" style={{ justifyContent: "space-between" }}>
                    <Link
                      className="text-dark"
                      to="/platform/auth/reset/init"
                    >
                      <span style={{ fontSize: '15px', color: "blue" }}>Forgot password?</span>
                    </Link>
                  </div>
                  <div>
                    <Button className="signin-button" type="submit" disabled={auth.loading}>
                      {auth.loading ? (
                        <CircularProgress style={{color: "#000000"}} size={20} />
                      ) : (
                        auth.isAuthenticated ? (
                          <CircularProgress style={{color: "#000000"}} size={20} />
                        ) : (
                          <>Sign in</>
                        )
                      )}
                    </Button>
                  </div>
                </AvForm>
                <div className="other-login">Or log in using:</div>
                <Grid container className="btn-wrapper text-center" direction="row" spacing={1} justifyContent="flex-start">
                  {/*<Grid item>*/}
                  {/*  <FacebookLogin*/}
                  {/*    appId={FACEBOOK_APP_ID}*/}
                  {/*    autoLoad={false}*/}
                  {/*    // fields="name,email,picture"*/}
                  {/*    render={renderProps => (*/}
                  {/*      <button*/}
                  {/*        onClick={renderProps.onClick}*/}
                  {/*        className="login-account"*/}
                  {/*      >*/}
                  {/*        <img src={facebook} alt="" style={{width: "17px", height: "17px"}}/>*/}
                  {/*      </button>*/}
                  {/*    )}*/}
                  {/*    // textButton="Facebook"*/}
                  {/*    // cssClass="padding-facebook-btn fb connect m-r-20"*/}
                  {/*    callback={responseFacebook}*/}
                  {/*    isMobile={false}*/}
                  {/*  />*/}
                  {/*</Grid>*/}
                  <Grid item>
                    <GoogleLogin
                      // clientId="327312592375-cql0oujncvnmenrf7trbbcce1a61r51n.apps.googleusercontent.com"
                      clientId={GOOGLE_APP_ID}
                      // className="btn-social-google btn-icon"
                      render={renderProps => (
                        <button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="login-account"
                        >
                          <img src={google} alt="" style={{width: "17px", height: "17px"}}/>
                        </button>
                      )}
                      onSuccess={responseGoogleSuccess}
                      onFailure={responseGoogleFail}
                      // cookiePolicy={'single_host_origin'}
                    />
                  </Grid>
                </Grid>
                <div className="create-account">
                  <Link
                    className="text-dark"
                    to="/platform/auth/register"
                  >
                    <span style={{ fontSize: '15px' }}>Not a member yet? <span style={{color: "blue"}}>Sign up for free</span></span>
                  </Link>
                </div>
                <div className="footer-auth">
                  <AuthFooter />
                </div>
              </CardBody>
            </Card>
          </Grid>
        </Grid>
      </>
    );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authentication
  };
};

const mapDispatchToProps = {
    loginUser,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
