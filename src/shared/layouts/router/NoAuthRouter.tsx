
import React from "react";
// react library for routing
import { Route, Switch } from "react-router-dom";
// core components
import AuthFooter from "../../../components/Footers/AuthFooter";
import IndexNavbar from "../../../components/Navbars/IndexNavbar";
import HeaderLoadingBar from '../../../components/Navbars/LoadingBar';
import {
  UncontrolledCollapse,
  NavbarBrand,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  UncontrolledTooltip,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import Image from 'react-image-webp';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { FACEBOOK_MESSENGER_APP_ID,FACEBOOK_MESSENGER_PAGE_ID} from 'src/config/constants';

class NoAuthRouter extends React.Component<any, any> {
  // componentDidMount() {
  //   document.body.classList.add("bg-benit");
  // }
  // componentWillUnmount() {
  //   document.body.classList.remove("bg-benit");
  // }
  render() {
    return (
      <>
        {/* <HeaderLoadingBar /> */}

        <div style={{ background: "white" }}>
          <div className="auth-background">
            <div className="auth-form">
              {/*<Navbar*/}
              {/*  className="navbar-horizontal navbar-main navbar"*/}
              {/*  expand="lg"*/}
              {/*  id="navbar-main"*/}
              {/*>*/}
              {/*  <Container>*/}
              {/*    <NavbarBrand to="/" className="nav-benit">*/}
              {/*      <Image*/}
              {/*        src={require("assets/img/brand/pte-logo.png")}*/}
              {/*        webp={require("assets/img/brand/pte-logo.webp")}*/}
              {/*      />*/}
              {/*    </NavbarBrand>*/}
              {/*  </Container>*/}
              {/*</Navbar>*/}
              <div className="d-flex">
                <Route {...this.props} />
              </div>
            </div>
          </div>
          {/*<div style={{ background: "#fff" }}>*/}
          {/*  <Container>*/}
          {/*    <h1 className="auth-h1">See Our Amazing Student Results</h1>*/}
          {/*    <Row>*/}
          {/*      <Col className="py-4 text-center" md={6}>*/}
          {/*        <h2 className="text-center">All Bands PTE 90+</h2>*/}
          {/*        <img style={{ width: 300 }} src="https://cdn.msgsndr.com/location%2FNIfCPYj2vq7jfxk71g0d%2Fimages%2Fa4548dcd-8a0c-48de-9127-fe92db5b81f1.jpg?alt=media&token=8096733c-1d38-47cf-90d7-045783423837" alt="" />*/}
          {/*      </Col>*/}
          {/*      <Col className="py-4 text-center" md={6}>*/}
          {/*        <h2 className="text-center">Pearson PTE Academic 79+</h2>*/}
          {/*        <img style={{ width: 300 }} src="https://cdn.msgsndr.com/location%2FNIfCPYj2vq7jfxk71g0d%2Fimages%2F79d41922-9d5a-44e5-8dda-e3eee4ee5232.jpeg?alt=media" alt="" />*/}
          {/*      </Col>*/}
          {/*      <Col className="py-4 text-center" md={6}>*/}
          {/*        <h2 className="text-center">All Bands PTE 90+</h2>*/}
          {/*        <img style={{ width: 300 }} src="https://cdn.msgsndr.com/location%2FNIfCPYj2vq7jfxk71g0d%2Fimages%2F646905fc-129a-4265-9f3a-0ea1d26310f5.png?alt=media" alt="" />*/}
          {/*      </Col>*/}
          {/*      <Col className="py-4 text-center d-flex" style={{ flexDirection: "column" }} md={6}>*/}
          {/*        <h2 className="text-center">Pearson PTE Academic 84</h2>*/}
          {/*        <div style={{ flex: 1 }}>*/}
          {/*          <img*/}
          {/*            style={{ width: 300 }}*/}
          {/*            className="h-100"*/}
          {/*            src="https://cdn.msgsndr.com/location%2FNIfCPYj2vq7jfxk71g0d%2Fimages%2F2b968f2b-6341-45f4-827d-5f187b19a267.png?alt=media&token=e06264ed-0f8d-4744-aa75-1edff6a5eb82"*/}
          {/*            alt=""*/}
          {/*          />*/}
          {/*        </div>*/}
          {/*      </Col>*/}
          {/*    </Row>*/}
          {/*  </Container>*/}
          {/*</div>*/}
          {/*<AuthFooter />*/}
          <MessengerCustomerChat
            pageId={FACEBOOK_MESSENGER_PAGE_ID}
            appId={FACEBOOK_MESSENGER_APP_ID}
          />
        </div>

      </>
    );
  }
}

export default NoAuthRouter;
