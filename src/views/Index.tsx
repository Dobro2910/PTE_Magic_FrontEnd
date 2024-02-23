/*eslint-disable*/
import React from "react";
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar";
import IndexHeader from "../components/Headers/IndexHeader";
import AuthFooter from "../components/Footers/AuthFooter";
import { hasAnyAuthority } from '../utils/common-utils';
import connect from 'redux-connect-decorator';
import { IRootState } from '../reducers';
import WhyUs from 'src/components/LandingPage/WhyUs';
import Courses from 'src/components/LandingPage/Courses';
import IntroPackages from 'src/components/LandingPage/IntroPackages';
import ContactInfo from 'src/components/LandingPage/ContactInfo';
import withTracker from 'src/views/pages/components/withTracker';
@connect(
  ({ authentication }: IRootState) => ({
    isAdmin: hasAnyAuthority(authentication.user.authorities, ['ROLE_ADMIN']),
    user: authentication.user
  }),
  {
    // getUserInfo
  }
)
@withTracker
class Index extends React.Component<any, any> {
  render() {
    const { user } = this.props;
    return (
      <>
        <IndexNavbar {...this.props} />
        <div className="main-content bg-landingpage">
          <IndexHeader />
          
          <WhyUs />

          <IntroPackages />

          <Courses />

          <ContactInfo />
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Index;
