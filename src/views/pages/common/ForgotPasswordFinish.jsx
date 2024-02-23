import React from "react";
// nodejs library that concatenates classes
import { AvForm, AvField } from "availity-reactstrap-validation";
import { toast } from "react-toastify";
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
  Col,
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader";
import { handlePasswordResetFinish } from "../../../reducers/account";
import connect from "redux-connect-decorator";
import { Redirect, Link } from "react-router-dom";
import { getUrlParameter } from "../../../utils/common-utils";
import { LoginBackground } from "../components/LoginBackground/pte-login-background";
import { Grid } from "@material-ui/core";

@connect(
  (state) => ({
    loading: state.account.loading,
    result: state.account.result,
  }),
  {
    handlePasswordResetFinish,
  }
)
class ForgotPasswordFinish extends React.Component {
  state = {
    btnEnable: false,
    key: getUrlParameter("key", this.props.location.search),
  };

  componentDidMount() {
    // console.log(`key: ${getUrlParameter('key', this.props.location.search)}`);
  }

  handleValidSubmit = (event, values) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      toast.error("Password not match");
      return;
    }

    this.props.handlePasswordResetFinish(this.state.key, values.password);
    // this.props.handlePasswordResetFinish(this.state.key, values.newPassword);
  };

  render() {
    const { result } = this.props;
    return (
      <>
        {result && <Redirect to={"/auth/login"} />}

        <Grid className="login-background">
          <LoginBackground />
        </Grid>
        <Grid className="login-form">
          <Card className="bg-secondary border-0 mb-0 background-login">
            <CardBody className="px-lg-5 py-lg-5">
              <h2>RESET YOUR PASSWORD</h2>
              <p>
                Welcome to PTE MAGIC! Enter the email address you used to
                register.
              </p>
              <AvForm role="form" onValidSubmit={this.handleValidSubmit}>
                <FormGroup>
                  <InputGroup className="input-group-merge input-group-alternative form-auth input-login">
                    <AvField
                      name="password"
                      type="password"
                      // className="login-input"
                      placeholder="Password"
                      required
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Your password is required.",
                        },
                        minLength: {
                          value: 4,
                          errorMessage:
                            "Your password is required to be at least 4 characters.",
                        },
                        maxLength: {
                          value: 50,
                          errorMessage:
                            "Your password cannot be longer than 50 characters.",
                        },
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-merge input-group-alternative form-auth input-login">
                    <AvField
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      required
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Your password is required.",
                        },
                        minLength: {
                          value: 4,
                          errorMessage:
                            "Your password is required to be at least 4 characters.",
                        },
                        maxLength: {
                          value: 50,
                          errorMessage:
                            "Your password cannot be longer than 50 characters.",
                        },
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="reset-button" type="submit">
                    Reset password
                  </Button>
                </div>
              </AvForm>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <Link className="text-dark" to="/auth/register">
                  <span style={{ fontSize: "15px" }}>Create new account?</span>
                </Link>
                <Link className="text-dark" to="/auth/login">
                  <span style={{ fontSize: "15px" }}>Sign In</span>
                </Link>
              </div>
            </CardBody>
          </Card>
        </Grid>

        {/* <Grid className="login-background">
          <LoginBackground />
        </Grid>
        <Grid className="login-form">
          <Card className="bg-secondary border-0 mb-0 background-login">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Reset Password</small>
              </div>
              <AvForm role="form" onValidSubmit={this.handleValidSubmit}>
                <FormGroup>
                  <InputGroup className="input-group-merge input-group-alternative form-auth input-login">
                    <AvField
                      name="password"
                      type="password"
                      // className="login-input"
                      placeholder="Password"
                      required
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Your password is required.",
                        },
                        minLength: {
                          value: 4,
                          errorMessage:
                            "Your password is required to be at least 4 characters.",
                        },
                        maxLength: {
                          value: 50,
                          errorMessage:
                            "Your password cannot be longer than 50 characters.",
                        },
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-login">
                    <AvField
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      required
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Your password is required.",
                        },
                        minLength: {
                          value: 4,
                          errorMessage:
                            "Your password is required to be at least 4 characters.",
                        },
                        maxLength: {
                          value: 50,
                          errorMessage:
                            "Your password cannot be longer than 50 characters.",
                        },
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-4 btn-benit btn-benit-yellow"
                    type="submit"
                  >
                    Reset password
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
          {/* <Row className="mt-3">
            <Col xs="6">
              <Link className="text-white" to="/auth/login">
                <small>Login</small>
              </Link>
            </Col>
            <Col className="text-right" xs="6">
              <Link className="text-white" to="/auth/register">
                <small>Create new account</small>
              </Link>
            </Col>
          </Row> 
        </Grid> */}
      </>
    );
  }
}

export default ForgotPasswordFinish;
