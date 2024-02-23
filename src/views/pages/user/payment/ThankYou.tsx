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
// import AuthHeader from "components/Headers/AuthHeader";
import { loginUser, logout } from '../../../../reducers/authentication';
import { Redirect, Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import FacebookLogin from 'react-facebook-login';

import {CircularProgress} from "@material-ui/core";

import Grid from '@material-ui/core/Grid';

// material-ui icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { connect } from 'react-redux';
import {LoginBackground} from "../../components/LoginBackground/pte-login-background";

const google = require("assets/img/google.svg")
const facebook = require("assets/img/facebook.png")
const logo = require("../../../../assets/img/logo/pte_magic_logo.svg")

function ThankYou(props) {
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
                <LoginBackground message="thanks"/>
            </Grid>
            <Grid className="login-form">
                <Grid style={{width: "600px"}}>
                    <Card className="bg-secondary border-0 mb-0 h-100 background-login">
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="logo-position">
                                <img src={logo} alt="" className="logo-login"/>
                            </div>
                            <div style={{ textAlign: "center"}}>
                                <h1>
                                    Thank You for acquiring course
                                </h1>
                            </div>
                            <Link to="/platform/user/home">
                                <div style={{ textAlign: "center"}}>
                                    <Button className="reset-button" type="submit" disabled={auth.loading}>
                                        Return to my page
                                    </Button>
                                </div>
                            </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
