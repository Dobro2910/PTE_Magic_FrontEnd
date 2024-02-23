import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  CardBody,
  CardImg,
  CardTitle,
  FormGroup,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Progress,
  Container,
  Badge,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
// core components
import ProfileHeader from "src/components/Headers/ProfileHeader";

import connect from "redux-connect-decorator";
import { IRootState } from "src/reducers/index";
import { getPaymentHistory } from "src/reducers/account";
import {
  AVATAR_DEFAULT,
  VOUCHER_TYPE,
  APP_LOCAL_DATETIME_FORMAT,
  APP_TIMESTAMP_FORMAT,
  APP_LOCAL_DATE_FORMAT,
  AVATAR_TICTOK,
} from "src/config/constants";
import voucher, {
  getVoucherInfo,
  activeVoucher,
  resetVoucher,
} from "src/reducers/voucher";
import moment from "moment";
import ExamActivity from "./profile-component/ExamActivity";
import PaymentHistory from "./profile-component/PaymentHistory";
import VoucherHistory from "./profile-component/VoucherHistory";
import BookmarkHistory from "./profile-component/BookmarkHistory";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from "@material-ui/core/CircularProgress";
const userBanner = require("assets/img/mountains-1412683_1280.png");
@connect(
  ({ authentication, acl, account, voucher }: IRootState) => ({
    user: authentication.user,
    acl: acl.acl,
    paymentHistory: account.paymentHistory,
    voucher: voucher.voucher,
    voucherLoading: voucher.voucherLoading,
  }),
  {
    getVoucherInfo,
    activeVoucher,
    resetVoucher,
  }
)
class Profile extends React.Component<any, any> {
  componentDidMount() {
    // this.props.getPaymentHistory();
    this.props.resetVoucher();
  }

  state = {
    show_payment: true,
    show_exam: false,
    show_voucher: false,
    show_bookmark: false,
    voucher: false,
    voucherCode: "",
    loading: false
  };

  onCheckVoucherCode = (e) => {
    let inputValue = this.state.voucherCode;
    if (inputValue != "") {
      // Call API check voucher
      this.props.getVoucherInfo(VOUCHER_TYPE.POINT, inputValue);
    } else {
      this.props.resetVoucher();
    }
  };

  onChangeVoucherCode = (e) => {
    let inputValue = e.target.value;
    this.setState({ voucherCode: inputValue });
    // console.log(inputValue);
    if (inputValue != "") {
      // this.props.getVoucherInfo(VOUCHER_TYPE.DISCOUNT, inputValue);
    } else {
      this.props.resetVoucher();
    }
  };

  onApplyVoucher = async () => {
    this.setState({
      loading: true
    })
    let inputValue = this.state.voucherCode;
    if (inputValue != "") {
      // Call API check voucher
      await this.props.getVoucherInfo(VOUCHER_TYPE.POINT, inputValue);
      if (this.props.voucher && this.props.voucher.success){
        console.log("!23")
        await this.props.activeVoucher(inputValue);

        this.setState({ voucherCode: "" , loading: false });
      }else {
        this.setState({ loading: false });
      }
    } else {
      await this.props.resetVoucher();
      this.setState({ loading: false });
    }
  };

  onChangeTab = (type) => {
    let data = {
      show_payment: false,
      show_exam: false,
      show_voucher: false,
      show_bookmark: false,
    };
    switch (type) {
      case "show_payment":
        data.show_payment = true;
        break;
      case "show_exam":
        data.show_exam = true;
        break;
      case "show_voucher":
        data.show_voucher = true;
        break;
      case "show_bookmark":
        data.show_bookmark = true;
        break;
      default:
        break;
    }
    this.setState({ ...data });
  };

  render() {
    const { user, acl, voucher, voucherLoading } = this.props;

    const {loading} = this.state
    return (
      <>
        <ProfileHeader fullName={user.fullName} />
        <Grid container className="profile-grid">
          <Grid item xs={6}>
            <Card className="card-profile-container mr-2">
              <img src={userBanner} alt="" style={{width: "100%", minHeight: "140px"}}/>
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          user.avatar
                            ? `${user.avatar}?type=large`
                            : AVATAR_TICTOK
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div className="h5 font-weight-300"></div>
                    </div>
                    <div className="card-profile-stats d-flex justify-content-center mb--2 mt--5"></div>
                  </div>
                </Row>
                <div className="text-center">
                  <div className="h5 font-weight-300 mt--4">
                    <i className="ni location_pin mr-2" />
                    {(acl.accountType === "ROLE_SUBSCRIPTION90" ||
                      acl.accountType === "ROLE_SUBSCRIPTION30") && (
                      <div>
                        <span className="text-red">* </span>
                        <span>
                          {" "}
                          AI Scoring daily: {acl.subscriptionAiScoring}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <h5 className="h3">
                    {user.fullName}
                    <span className="font-weight-light"></span>
                  </h5>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {acl.accountType === "ROLE_SUBSCRIPTION90" && (
                      <span>
                        Subscription member90{" "}
                        <i className="ni ni-hat-3 text-red"></i>
                      </span>
                    )}
                    {acl.accountType === "ROLE_SUBSCRIPTION30" && (
                      <span>
                        Subscription member30{" "}
                        <i className="ni ni-hat-3 text-red"></i>
                      </span>
                    )}
                    {acl.accountType === "ROLE_SUBSCRIPTION" && (
                      <span>
                        Subscription member{" "}
                        <i className="ni ni-hat-3 text-primary"></i>
                      </span>
                    )}
                    {acl.accountType === "ROLE_FREE_MEMBER" && (
                      <span>Free member</span>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className="h5 font-weight-300 mt--2">
                    <i className="ni location_pin mr-2" />
                    {(acl.accountType === "ROLE_SUBSCRIPTION" ||
                      acl.accountType === "ROLE_SUBSCRIPTION90" ||
                      acl.accountType === "ROLE_SUBSCRIPTION30") && (
                      <span>
                        (Expired date:{" "}
                        {moment()
                          .add(acl.subscriptionDays, "days")
                          .format(APP_LOCAL_DATE_FORMAT)}
                        )
                      </span>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className="card-profile-container ml-2">
              <CardHeader className="text-center">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mb--2 mt--5">
                      <div>
                        <span className="heading">{acl.subscriptionDays}</span>
                        <span className="description">Subscription days</span>
                      </div>
                      {/* <div>
                            <span className="heading">{ acl.numberAiScoring }</span>
                            <span className="description">AI Scoring</span>
                          </div> */}
                      <div>
                        <span className="heading">{acl.numberExamMock}</span>
                        <span className="description">Mock test</span>
                      </div>
                      {/*<div>*/}
                      {/*  <span className="heading">{acl.numberScoreMock}</span>*/}
                      {/*  <span className="description">Score mock</span>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <div className="h5 font-weight-300 mt--4">
                    <i className="ni location_pin mr-2" />
                    {(acl.accountType === "ROLE_SUBSCRIPTION90" ||
                      acl.accountType === "ROLE_SUBSCRIPTION30") && (
                      <div>
                        <span className="text-red">* </span>
                        <span>
                          {" "}
                          AI Scoring daily: {acl.subscriptionAiScoring}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <Form role="form">
                  <FormGroup>
                    {/* <div className="h5 font-weight-300 text-primary">
                      Have any voucher code?
                    </div> */}
                    <InputGroup
                      className={classnames("input-group-merge", {
                        focused: this.state.voucher,
                      })}
                    >
                      <Input
                        placeholder="Voucher code"
                        type="text"
                        onFocus={(e) => this.setState({ voucher: true })}
                        onBlur={(e) => this.setState({ voucher: false })}
                        onChange={this.onChangeVoucherCode}
                      />
                      {/* <InputGroupAddon addonType="append">
                        <InputGroupText style={{ padding: "0 0.5rem" }}>
                          <Button
                            className="btn-benit-sm btn-benit-white btn-voucher"
                            disabled={!this.state.voucherCode}
                            onClick={this.onCheckVoucherCode}
                          >
                            <span className="btn-inner--icon mr-1">
                              <i className="ni ni-bag-17" />
                            </span>
                            <span className="btn-inner--text hidden-lg-down">
                              Apply
                            </span>
                          </Button>
                        </InputGroupText>
                      </InputGroupAddon> */}
                    </InputGroup>
                    {voucher && !voucher.success && (
                      <div className="text-invalid text-danger">
                        Voucher invalid!
                      </div>
                    )}
                    {voucher && voucher.success && (
                      <div className="text-invalid text-success">
                        {voucher.voucherCampaign.description}
                      </div>
                    )}
                    {voucherLoading && (
                      <div className="text-invalid text-dark">Checking...</div>
                    )}
                  </FormGroup>
                  <div className="text-center" style={{cursor: "pointer"}}>
                    <Button
                      onClick={this.onApplyVoucher}
                      className={loading ? "disabled-button" : "submit-button"}
                      disabled={loading}
                    >
                      Submit
                      {loading && (
                        <CircularProgress style={{position: "absolute",width:20,height:20}} />
                      )}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Grid>
        </Grid>

        <Row>
          <Col md="12">
            <div className="text-center button-tab">
              {/* <Button onClick={ () => { this.onChangeTab('show_payment') } }
                    className={ `btn ${this.state.show_payment ? "btn-benit-sm btn-benit-yellow" : 'btn-tab'}` }>Payment</Button>
                  <Button onClick={ () => { this.onChangeTab('show_voucher') } }
                    className={ `btn ${this.state.show_voucher ? "btn-benit-sm btn-benit-yellow" : 'btn-tab'}` }>Voucher</Button> */}
              <Button
                onClick={() => {
                  this.onChangeTab("show_payment");
                }}
                className={`${
                  this.state.show_payment ? "button-blue" : "button-white"
                }`}
              >
                Payment
              </Button>
              <Button
                onClick={() => {
                  this.onChangeTab("show_voucher");
                }}
                className={`${
                  this.state.show_payment ? "button-white" : "button-blue"
                }`}
              >
                Voucher
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            {this.state.show_payment && <PaymentHistory />}
            {this.state.show_voucher && <VoucherHistory />}
          </Col>
        </Row>
      </>
    );
  }
}

export default Profile;
