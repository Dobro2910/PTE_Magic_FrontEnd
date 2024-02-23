import axios from "axios";
import React, {Component} from "react";
// reactstrap components
import {
  Container,
  Media,
  Progress,
  FormGroup,
  Input,
  Col,
  Table,
  Row,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
// connect
import {withRouter, Link} from "react-router-dom";
import BenitHeader from "src/components/Headers/BenitHeader";
import packages from "src/assets/data/packages.json";
import PaypalExpressBtn from "react-paypal-express-checkout";
import StripeCheckout from "react-stripe-checkout";
import classnames from "classnames";

import connect from "redux-connect-decorator";
import cart, {
  getAll,
  saveAll,
  saveOne,
  reset,
  changeQuantity,
} from "src/reducers/cart";
import {getAccessControlList} from "src/reducers/acl";

import payment, {checkout, resetPayment, createCheckoutSession} from "src/reducers/payment";
import {IRootState} from "../../../../reducers";
import {PAYMENT_METHOD, VOUCHER_TYPE} from "src/config/constants";
import {
  getVoucherInfo,
  activeVoucher,
  resetVoucher,
} from "src/reducers/voucher";
import {PteLoadingPayment} from "../../components/LoadingSpinner/pte-loading-payment";
import {PayPalButton} from "react-paypal-button-v2";
import {toast} from "react-toastify";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import BannerCarousel from "../../../../components/CustomCarousel/BannerCarousel/BannerCarousel";
import {getUserInfo} from 'src/reducers/authentication';
import MaterialTable from "material-table";
import CardContent from "@material-ui/core/CardContent";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// @ts-ignore
import ButtonUI from "../../../../components/CustomButton/Button";
// @ts-ignore
import visaMastercard from "../../../../assets/img/gif/visa-mastercard.gif"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const logo = require("assets/img/fedex.png");
const banner1 = require("assets/img/banner/banner1.png");
const banner2 = require("assets/img/banner/banner2.png");
import Tooltip from '@material-ui/core/Tooltip';

@connect(
  ({cart, payment, voucher, acl, authentication}: IRootState) => ({
    carts: cart.carts,
    loading: cart.loading,
    order: payment.order,
    voucher: voucher.voucher,
    voucherLoading: voucher.voucherLoading,
    user: authentication.user,
  }),
  {
    getAll,
    changeQuantity,
    reset,
    checkout,
    resetPayment,
    getVoucherInfo,
    activeVoucher,
    resetVoucher,
    getAccessControlList,
    createCheckoutSession,
    getUserInfo
  }
)
class Cart extends Component<any, any> {
  state = {
    showPaymentLoading: false,
    voucher: false,
    type: null,
    carts: null,
    total: 0,
    alert: null,
    voucherCode: "",
  };

  componentDidMount() {
    this.props.getAll();
    this.props.getUserInfo();
  }

  componentWillUnmount() {
    this.props.resetPayment();
  }

  componentWillReceiveProps({carts}) {
    let total = 0;
    if (carts) {
      carts.map((item, i) => {
        if (item.packInfo && item.data) {
          total = total + item.data.quantity * item.packInfo.cost; //getPaymentCost(item.packageId);
        }
      });
    }
    this.setState({total, carts});
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({showPaymentLoading: false});
    // You can also log the error to an error reporting service
    toast.error(`Payment error, detail : ${JSON.stringify(error)}`);
  }

  constructor(props) {
    super(props);
  }

  onPaypalSuccess = async (payment) => {
    this.setState({showPaymentLoading: true});
    // Congratulation, it came here means everything's fine!
    console.log("The payment was succeeded!", payment);
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data

    let cartIds = [];
    this.props.carts.map((item, i) => {
      cartIds.push(item.data.id);
    });

    // Create order
    const orderData = {
      ...payment,
      paymentType: PAYMENT_METHOD.PAYPAL,
      // total: this.state.total,
      total: this.getTotalDiscount(),
      cartIds: cartIds.join(","),
      voucherCode: this.state.voucherCode,
    };
    await this.props.checkout(orderData);
    // paid status
    this.setState({showPaymentLoading: false});
  };

  paypalCreateOrder = () => {
    let cartIds = [];
    this.props.carts.map((item, i) => {
      cartIds.push(item.data.id);
    });

    return axios
      .post("api/payment/paypal/create-order", {
        paymentType: PAYMENT_METHOD.PAYPAL,
        // total: this.state.total,
        total: this.getTotalDiscount(),
        cartIds: cartIds.join(","),
        voucherCode: this.state.voucherCode,
      })
      .then(function (res) {
        console.log(res.data);
        return res.data;
      })
      .then(function (data) {
        return data.orderId;
      });
  };

  paypalApproveOrder = async (data) => {
    console.log(`paypalApproveOrder`, data);
    this.setState({showPaymentLoading: true});
    let cartIds = [];
    this.props.carts.map((item, i) => {
      cartIds.push(item.data.id);
    });

    let response = await axios
      .post("api/payment/paypal/capture-order", {
        paymentType: PAYMENT_METHOD.PAYPAL,
        // total: this.state.total,
        total: this.getTotalDiscount(),
        cartIds: cartIds.join(","),
        voucherCode: this.state.voucherCode,
        orderId: data.orderID,
      })
      .then(function (res) {
        return res.data;
      })
      .then(function (details) {
        toast.success("Payment success ...");
      });

    await this.props.getAccessControlList();
    await this.props.getAll();
    this.setState({showPaymentLoading: false});
    return response;
  };

  onPaypalCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    console.log("The payment was cancelled!", data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  onPaypalError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  onStripeToken = async (token) => {
    this.setState({ showPaymentLoading: true });
    console.log(token);
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
    let cartIds = [];
    this.props.carts.map((item, i) => {
      cartIds.push(item.data.id);
    });

    // Create order
    const orderData = {
      payerID: token.email,
      // paymentID
      paymentToken: token.id,
      paymentType: PAYMENT_METHOD.STRIPE,
      // total: this.state.total,
      total: this.getTotalDiscount(),
      cartIds: cartIds.join(','),
      stripeEmail: token.email,
      voucherCode: this.state.voucherCode
    };
    await this.props.checkout(orderData);
    this.setState({ showPaymentLoading: false });
  };

  onChangeQuantity = (e, cartId) => {
    let carts = this.state.carts;
    let total = 0;
    if (carts) {
      carts.map((item, i) => {
        if (cartId === item.data.id) {
          item.data.quantity = e.target.value;
          // Call API update cart
          this.props.changeQuantity({...item.data, quantity: e.target.value});
        }
        total = total + item.data.quantity * item.packInfo.cost; //getPaymentCost(item.packageId);
      });
      this.setState({total});
    }
  };

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  onApplyVoucherCode = (e) => {
    let inputValue = this.state.voucherCode;
    if (inputValue != "") {
      // Call API check voucher
      this.props.getVoucherInfo(VOUCHER_TYPE.DISCOUNT, inputValue);
    } else {
      this.props.resetVoucher();
    }
  };

  onChangeVoucherCode = (e) => {
    let inputValue = e.target.value;
    this.setState({voucherCode: inputValue});
    // console.log(inputValue);
    if (inputValue != "") {
      // Call API check voucher
      // this.props.getVoucherInfo(VOUCHER_TYPE.DISCOUNT, inputValue);
    } else {
      this.props.resetVoucher();
    }
  };

  getTotalDiscount = () => {
    const {voucher} = this.props;
    const {total} = this.state;
    let totalDiscount = total.toFixed(2);
    if (voucher && voucher.success) {
      let discount = voucher.voucherCampaign.value;
      totalDiscount = ((total * (100 - discount)) / 100).toFixed(2);
    }

    return totalDiscount;
  };

  createCheckoutSession = async () => {
    const {carts} = this.state;
    const user = this.props.user
    let pricesID = []

    carts.map(cart => {
      if (cart.packInfo){
        if (cart.packInfo.priceID){
          pricesID.push(cart.packInfo.priceID)
        }
      }
    })

    const data = {
      accountID: user.id,
      pricesID: pricesID
    }
    this.props.createCheckoutSession(data)
  }

  deleteItem = async (cart) => {
    await this.props.changeQuantity({...cart.data, quantity: 0});
  }

  render() {
    let {carts, total} = this.state;
    const {voucher, voucherLoading} = this.props;

    let subtotal = 0
    if (carts) {
      if (carts.length > 0){
        carts.map(cart => {
          if (cart.packInfo){
            subtotal += cart.packInfo.cost
          }
        })
      }
    }
    let discountPrice = 0
    let costTotal = subtotal
    if (voucher && voucher.success){
      discountPrice = (costTotal*voucher.voucherCampaign.value)/100
      costTotal -= discountPrice
    }

    const columns = [
      {
        field: "image",
        title: "IMAGE",
        width: "30%",
        render: (record) => record.packInfo ?
          <div><img src={record.packInfo.linkImage} style={{width: 100, height: 100}}/></div> : "",
      },
      {
        title: "NAME",
        field: "name",
        width: "30%",
        render: (record) => record.packInfo ? <div className="font-weight-500">{record.packInfo.name}</div> : "",
      },
      {
        title: "PRICE",
        field: "price",
        width: "30%",
        render: (record) => record.packInfo ?
          <div className="font-weight-bold">
            <span>AUD </span>
            <span>{record.packInfo.cost}</span>
          </div>
          : ""
      },
      {
        title: "",
        field: "delete",
        width: "10%",
        render: (record) => record ?
          <Tooltip title="Delete">
            <HighlightOffIcon className="delete-item" onClick={() => {this.deleteItem(record)}} />
          </Tooltip>
          : ""
      }
    ];

    const clientPaypal = {
      sandbox:
        "AXUwCqc5g0nB6OPGB5sRsB9k892JEVBwzoArsiaSUf4-9F6QvzwkgcvAU9NWAZGQBVlaiPNfhRBhChTs",
      production:
        "AZr_gQT3K0X9qa_lGxp8bww8_WDkZfuC7KDTW3pAsybPq9qbp67LSrZrsn18ZjU9-Xl2h8Hac819mGUS",
    };
    // const stripeKey = "pk_test_NgyOMjmOwuSPFVOyGYTyIb2I00oQb98uKb";
    // const stripeKey = "pk_live_SblC4lynX8xtNUGzNT1A3Gr400IZITlE9L"; // live
    const stripeKey =
      "pk_test_51HoLXeL1Qbpqxb2kSkbiJKUgRHWcXBUUhpiNe7LzJsqP9tWZ8yucnZVSjVEnvTkVvhcutrT7ZWpCfHHUGoqHuxnE00LfZvYYzk";
    // const stripeKey = "pk_test_51IBUYYIZuU5MVO7U2ZV0wRIQP846fNezxbBrEiQQO0C6jZpZwyjkJxNeb8XyDlJto23UEbgxFua3ly9cFcsrnntL00jzwseNR6"
    const banners = [banner1, banner2]
    return (
      <>
        {this.state.showPaymentLoading && <PteLoadingPayment/>}
        <BannerCarousel pictures={banners} itemPerPage={1}/>
        <Grid container className="cart-container">
          <Grid item xs={12} sm={12} md={8}>
            <Card className="card-profile-payment">
              {carts && carts.length > 0 ? (
                <>
                  <div className="card-payment-head">
                    <h5 className="h3 mb-0">Your orders</h5>
                    <div className="cart-title">Subscribe to {carts[0].packInfo ? carts[0].packInfo.name : ""} {carts.length > 1 ? `and ${carts.length - 1} more` : ""}</div>
                  </div>
                  <CardContent>
                    <MaterialTable
                      title={null}
                      data={carts}
                      columns={columns}
                      options={{
                        paging: false,
                        pageSize: 10,
                        search: false,
                        toolbar: false,
                        sorting: false
                      }}
                    />
                  </CardContent>
                </>
              ) : (
                <CardContent>
                  <div className="text-center">No item in cart</div>
                </CardContent>
              )}
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <Card className="card-checkout">
              <div className="display-flex-row">
                <TextField
                  classes={{
                    root: "text-field-root",
                  }}
                  id="outlined-basic"
                  placeholder="Enter coupon"
                  variant="outlined"
                  onFocus={(e) => this.setState({ voucher: true })}
                  onBlur={(e) => this.setState({ voucher: false })}
                  onChange={this.onChangeVoucherCode}
                />
                <Button
                  classes={{
                    root: "button-apply-root",
                    text: "button-apply-text"
                  }}
                  disabled={!this.state.voucherCode}
                  onClick={this.onApplyVoucherCode}
                >
                  Apply
                </Button>
              </div>
              <div>
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
                  <div className="text-invalid text-dark">
                    Checking...
                  </div>
                )}
              </div>
              <hr className="horizontal-line"/>
              <div className="display-flex-row justify-content-space-between checkout-details">
                <span>Subtotal: </span>
                <div>
                  <span>AUD</span>&nbsp;<span>{subtotal}</span>
                </div>
              </div>
              {
                voucher && voucher.success
                ?
                  <div className="display-flex-row justify-content-space-between checkout-details">
                    <span>Discount: </span>
                    <div>
                      <span className="text-danger">- AUD {discountPrice}</span>
                    </div>
                  </div>
                : ""
              }

              <div className="display-flex-row justify-content-space-between checkout-details">
                <span>Total Amount: </span>
                <div>
                  <span>AUD</span>&nbsp;<span>{costTotal}</span>
                </div>
              </div>
              <hr className="horizontal-line"/>

              <StripeCheckout
                name={ "PTE Magic" }
                description= { " Buy packages from PTE MAGIC " }
                image= "https://cclmagic-data.s3-ap-southeast-2.amazonaws.com/logo-pte-magic.png"
                stripeKey= { stripeKey }
                token={ this.onStripeToken }
                currency={ 'AUD' }
                amount={ Number(this.getTotalDiscount()) * 100 }
              >
                <Button
                  classes={{
                    root: "button-root",
                  }}
                  className="checkout-button"
                  // onClick={this.createCheckoutSession}
                  startIcon={<img src={visaMastercard} style={{width:40,height:40}} alt="visa/mastercard"/>}
                >
                  Visa/MasterCard
                </Button>
              </StripeCheckout>
              <hr className="horizontal-line"/>
              <PayPalButton
                // options={{vault: true}}
                currency="AUD"
                options={{ currency: "AUD" }}
                style={{
                  label: "checkout",
                }}
                createOrder={(data, actions) =>
                  this.paypalCreateOrder()
                }
                onApprove={(data, actions) =>
                  this.paypalApproveOrder(data)
                }
              />
            </Card>
            {/* <Card>
              <CardHeader>
                <h3 className="mb-0">Payment</h3>
                {carts && carts.length > 0 ? (
                  <>
                    {voucher && voucher.success ? (
                      <>
                        <div className="text-sm mb-0">
                          Subtotal ({carts.length} items):{" "}
                          <span
                            className="text-gray"
                            style={{
                              display: "inline-block",
                              textDecoration: "line-through",
                            }}
                          >
                            ${total.toFixed(2)}
                          </span>{" "}
                          <h2
                            className="text-danger"
                            style={{ display: "inline-block" }}
                          >
                            {this.getTotalDiscount()}
                          </h2>
                        </div>
                      </>
                    ) : (
                      <div className="text-sm mb-0">
                        Subtotal ({carts.length} items):{" "}
                        <h2
                          className="text-danger"
                          style={{ display: "inline-block" }}
                        >
                          ${total.toFixed(2)}
                        </h2>
                      </div>
                    )}

                    <Form role="form">
                      <div className="h5 font-weight-300 text-primary">
                        Have any discount voucher code?
                      </div>
                      <FormGroup>
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
                          <InputGroupAddon addonType="append">
                            <InputGroupText style={{ padding: "0 0.5rem" }}>
                              <Button
                                className="btn-benit-sm btn-benit-white btn-voucher"
                                disabled={!this.state.voucherCode}
                                onClick={this.onApplyVoucherCode}
                              >
                                <span className="btn-inner--icon mr-1">
                                  <i className="ni ni-bag-17" />
                                </span>
                                <span className="btn-inner--text hidden-lg-down">
                                  Apply
                                </span>
                              </Button>
                            </InputGroupText>
                          </InputGroupAddon>
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
                          <div className="text-invalid text-dark">
                            Checking...
                          </div>
                        )}
                      </FormGroup>
                    </Form>

                    {total > 0 && (
                      <>
                        {!this.state.voucherCode ||
                        (this.state.voucherCode &&
                          voucher &&
                          voucher.success) ? (
                          <>
                            <hr className="mt-1 mb-4" />
                            <div className="mb-3 text-center">
                              <PayPalButton
                                // options={{vault: true}}
                                currency="AUD"
                                options={{ currency: "AUD" }}
                                style={{
                                  shape: "pill",
                                  label: "checkout",
                                }}
                                createOrder={(data, actions) =>
                                  this.paypalCreateOrder()
                                }
                                onApprove={(data, actions) =>
                                  this.paypalApproveOrder(data)
                                }
                              />
                            </div>
                            <div className="mb-3 text-center">
                              <StripeCheckout
                                name={"PTE Magic"}
                                description={" Buy packages from PTE MAGIC "}
                                image="https://cclmagic-data.s3-ap-southeast-2.amazonaws.com/logo-pte-magic.png"
                                stripeKey={stripeKey}
                                token={this.onStripeToken}
                                currency={"AUD"}
                                amount={Number(this.getTotalDiscount()) * 100}
                              >
                                <button
                                  className="btn-benit-sm btn-benit-gray"
                                  style={{ width: "100%" }}
                                >
                                  <div className="icon-payment-stripe icon-visa"></div>
                                </button>
                              </StripeCheckout>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-sm mb-0">Subtotal (0 items): --</p>
                  </>
                )}
              </CardHeader>
            </Card>
           */}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withRouter(Cart);
