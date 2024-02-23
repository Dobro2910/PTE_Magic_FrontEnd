
import React, { Component } from "react";
import axios from 'axios';
// reactstrap components
// reactstrap components
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  Container,
  Button,
  Media,
  Progress,
  Row,
  Form,
  FormGroup,
  CustomInput,
  Col
} from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
// connect
import { withRouter, Link } from 'react-router-dom';
import BenitHeader from 'src/components/Headers/BenitHeader';
import $ from 'jquery';

import connect from 'redux-connect-decorator';
import banner, { getBanner } from 'src/reducers/banner';
import cart, { saveOne } from 'src/reducers/cart';
import pack, { getPackages } from 'src/reducers/pack';
import { IRootState } from '../../../../reducers';
import { BannerImage } from '../../components/BannerImage';
import { NewCartPack } from '../../components/NewCartPack';
import { toast } from 'react-toastify';
import { calculateProgress, calculateProgressColor } from 'src/utils/common-utils';
import Skeleton from '@yisheng90/react-loading';
import CountUp from 'react-countup';
import AudioWaveform from 'src/components/AudioWaveform/AudioWaveform';

@connect(
  ({ cart, pack, banner }: IRootState) => ({
    cart: cart.cart,
    loading: cart.loading,
    packs: pack.packs,
    banner: banner.banner
  }),
  {
    saveOne ,
    getPackages,
    getBanner
  }
)
class MagicShop extends Component<any, any> {
  state = {
    type: null,
    selectedGroupPackage: null,
    packages: [],
    totalSpeaking : 0,
    numberTestedSpeaking : 0,
    totalWriting : 0,
    numberTestedWriting : 0,
    totalReading : 0,
    numberTestedReading : 0,
    totalListening : 0,
    numberTestedListening : 0,
    
    totalRepeatedSpeaking : 0,
    totalRepeatedWriting : 0,
    totalRepeatedReading : 0,
    totalRepeatedListening : 0
  };

  async componentDidMount() {
    this.props.getPackages();
    this.props.getBanner();

    let response = await axios.get(`/api/questions-count-info`);
    let totalSpeaking = 0;
    let numberTestedSpeaking = 0;
    let totalWriting = 0;
    let numberTestedWriting = 0;
    let totalReading = 0;
    let numberTestedReading = 0;
    let totalListening = 0;
    let numberTestedListening = 0;
    if (response.data && response.data.length !== 0) {
      response.data.forEach(item => {
        let numberTested = item.numberTested ? item.numberTested : 0;
        if (item.type.indexOf('SPEAKING_') !== -1) {
          totalSpeaking = totalSpeaking + item.total;
          numberTestedSpeaking = numberTestedSpeaking + numberTested;
        } else if (item.type.indexOf('WRITING_') !== -1) {
          totalWriting = totalWriting + item.total;
          numberTestedWriting = numberTestedWriting + numberTested;
        } else if (item.type.indexOf('READING_') !== -1) {
          totalReading = totalReading + item.total;
          numberTestedReading = numberTestedReading + numberTested;
        } else if (item.type.indexOf('LISTENING_') !== -1) {
          totalListening = totalListening + item.total;
          numberTestedListening = numberTestedListening + numberTested;
        }
      })
      // Set stata
      this.setState({ 
        totalSpeaking,
        numberTestedSpeaking,
        totalWriting,
        numberTestedWriting,
        totalReading,
        numberTestedReading,
        totalListening,
        numberTestedListening
      });
    }

    let responseRepeated = await axios.get(`/api/questions-repeated-count-info`);
    let totalRepeatedSpeaking = 0;
    let totalRepeatedWriting = 0;
    let totalRepeatedReading = 0;
    let totalRepeatedListening = 0;
    if (responseRepeated.data && responseRepeated.data.length !== 0) {
      responseRepeated.data.forEach(item => {
        if (item.type.indexOf('SPEAKING_') !== -1) {
          totalRepeatedSpeaking = totalRepeatedSpeaking + item.total;
        } else if (item.type.indexOf('WRITING_') !== -1) {
          totalRepeatedWriting = totalRepeatedWriting + item.total;
        } else if (item.type.indexOf('READING_') !== -1) {
          totalRepeatedReading = totalRepeatedReading + item.total;
        } else if (item.type.indexOf('LISTENING_') !== -1) {
          totalRepeatedListening = totalRepeatedListening + item.total;
        }
      })
      // Set stata
      this.setState({ 
        totalRepeatedSpeaking,
        totalRepeatedWriting,
        totalRepeatedReading,
        totalRepeatedListening
      });
    }
  }

  componentWillUnmount() {
  }

  constructor(props) {
    super(props);
  }

  addCart = (e, item) => {
    e.preventDefault();
    item.packageItems.forEach(pack => {
      if ($(`#pack-${pack.id}`).is(':checked')) {
        this.props.saveOne({ quantity: 1, packageId: pack.id });
        $(`#pack-${pack.id}`). prop("checked", false);
      }
    });
  };

  addCartItem = async (e, product) => {
    e.preventDefault();
    let result = await this.props.saveOne({ quantity: 1, packageId: product.id });
    if (result) {
      toast.success(this.renderMessageAddCart(product),
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        // autoClose: false,
        className: 'toast-cart-success'
      })
    }
  };

  renderMessageAddCart = (product) => (
    <>
      <div className="text-center mt-2 mb-2">
        <div className={`grid-icon icon-cart-success`}></div>
      </div>
      <div>
        Product: {product.name}
      </div>
      <div className="text-gray">
        item successfully added to your cart.
      </div>
      <div className="text-center mt-3 mb-2">
          <Button className="btn-benit-sm btn-benit-yellow mr-2"
            onClick={ (e) => {
              e.preventDefault()
              this.props.history.push('/platform/user/cart');
            } }>
            <span className="btn-inner--icon mr-1">
              <i className="fas fa-cart-plus" />
            </span>
            <span className="btn-inner--text hidden-lg-down">Checkout</span>
          </Button>
      </div>
    </>
  )

  renderQuestionBoxInfo = () => (
    <>
      <Row>
        <Col md="6" xl="3">
            <Card className="bg-white border-0">
              <CardBody>
                <Link to={ `/platform/user/banks/view-speaking` }>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase mb-0 text-dark"
                      >
                        Speaking
                        <span className="ml-2 badge badge-question-type-speaking">
                          AI
                        </span>
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0 text-dark">
                        { this.state.totalSpeaking ? 
                          <CountUp end={ this.state.totalSpeaking } duration={2} separator="," />
                          : '--'
                        }
                      </span>
                      <Progress
                        className="progress-xs mt-3 mb-0"
                        max="100"
                        value={ calculateProgress(this.state.numberTestedSpeaking, this.state.totalSpeaking) }
                        color={ calculateProgressColor(this.state.numberTestedSpeaking, this.state.totalSpeaking) }
                      />
                    </div>
                    <Col className="col-auto" style={{width: '65px'}}>
                      <div className="benit-icon size-45 icon-speaking"></div>
                    </Col>
                  </Row>
                </Link>
                <p className="mt-3 mb-0 text-sm">
                  <span className="mr-2">
                    <i className="ni ni-user-run" />
                    &nbsp;&nbsp;{ calculateProgress(this.state.numberTestedSpeaking, this.state.totalSpeaking) }%
                  </span>
                </p>
                <Link className="text-dark" to={ `/platform/user/banks/view-speaking?repeated=true` }>
                  <div className="text-sm repeated-label-home">
                    <span className="badge badge-primary">Repeated { this.state.totalRepeatedSpeaking || '--' }</span>
                  </div>
                </Link>
              </CardBody>
            </Card>
        </Col>
        <Col md="6" xl="3">
          
            <Card className="bg-white border-0">
              <CardBody>
                <Link to={ `/platform/user/banks/view-writing` }>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase mb-0"
                      >
                        Writing
                        {/* <span className="ml-2 badge badge-question-type-speaking">
                          AI
                        </span> */}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        { this.state.totalWriting ? 
                          <CountUp end={ this.state.totalWriting } duration={2} separator="," />
                          : '--'
                        }
                      </span>
                      <Progress
                        className="progress-xs mt-3 mb-0"
                        max="100"
                        value={ calculateProgress(this.state.numberTestedWriting, this.state.totalWriting) }
                        color={ calculateProgressColor(this.state.numberTestedWriting, this.state.totalWriting) }
                      />
                    </div>
                    <Col className="col-auto" style={{width: '65px'}}>
                      <div className="benit-icon size-45 icon-writing"></div>
                    </Col>
                  </Row>
                </Link>
                <p className="mt-3 mb-0 text-sm">
                  <span className="mr-2">
                    <i className="ni ni-user-run" />
                    &nbsp;&nbsp;{ calculateProgress(this.state.numberTestedWriting, this.state.totalWriting) }%
                  </span>
                </p>
                <Link className="text-dark" to={ `/platform/user/banks/view-writing?repeated=true` }>
                  <div className="text-sm repeated-label-home">
                    <span className="badge badge-primary">Repeated { this.state.totalRepeatedWriting || '--' }</span>
                  </div>
                </Link>
              </CardBody>
            </Card>
        </Col>
        <Col md="6" xl="3">
            <Card className="bg-white border-0">
              <CardBody>
                <Link to={ `/platform/user/banks/view-reading` }>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase mb-0"
                      >
                        Reading
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        { this.state.totalReading ? 
                          <CountUp end={ this.state.totalReading } duration={2} separator="," />
                          : '--'
                        }
                      </span>
                      <Progress
                        className="progress-xs mt-3 mb-0"
                        max="100"
                        value={ calculateProgress(this.state.numberTestedReading, this.state.totalReading) }
                        color={ calculateProgressColor(this.state.numberTestedReading, this.state.totalReading) }
                      />
                    </div>
                    <Col className="col-auto" style={{width: '65px'}}>
                      <div className="benit-icon size-45 icon-reading"></div>
                    </Col>
                  </Row>
                </Link>
                <p className="mt-3 mb-0 text-sm">
                  <span className="mr-2">
                    <i className="ni ni-user-run" />
                    &nbsp;&nbsp;{ calculateProgress(this.state.numberTestedReading, this.state.totalReading) }%
                  </span>
                </p>
                <Link className="text-dark" to={ `/platform/user/banks/view-reading?repeated=true` }>
                  <div className="text-sm repeated-label-home">
                    <span className="badge badge-primary">Repeated { this.state.totalRepeatedReading || '--' }</span>
                  </div>
                </Link>
              </CardBody>
            </Card>
        </Col>
        <Col md="6" xl="3">
            <Card className="bg-white border-0">
              <CardBody>
                <Link to={ `/platform/user/banks/view-listening` }>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase mb-0"
                      >
                        Listening
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        { this.state.totalListening ? 
                          <CountUp end={ this.state.totalListening } duration={2} separator="," />
                          : '--'
                        }
                      </span>
                      <Progress
                        className="progress-xs mt-3 mb-0"
                        max="100"
                        value={ calculateProgress(this.state.numberTestedListening, this.state.totalListening) }
                        color={ calculateProgressColor(this.state.numberTestedListening, this.state.totalListening) }
                      />
                    </div>
                    <Col className="col-auto" style={{width: '65px'}}>
                      <div className="benit-icon size-45 icon-listening"></div>
                    </Col>
                  </Row>
                </Link>
                <p className="mt-3 mb-0 text-sm">
                  <span className="mr-2">
                    <i className="ni ni-user-run" />
                    &nbsp;&nbsp;{ calculateProgress(this.state.numberTestedListening, this.state.totalListening) }%
                  </span>
                </p>
                <Link className="text-dark" to={ `/platform/user/banks/view-listening?repeated=true` }>
                  <div className="text-sm repeated-label-home">
                    <span className="badge badge-primary">Repeated { this.state.totalRepeatedListening || '--' }</span>
                  </div>
                </Link>
              </CardBody>
            </Card>
        </Col>
      </Row>
    </>
  );

  render() {

    const { packs, banner } = this.props;

    console.log("PACK", packs)
    return (
      <>
        <BenitHeader name="Magic shop" parentName="Home" padding={true}/>
        {/* <CardsHeader name="Default" parentName="Dashboards" /> */}
        <Container fluid>
          {/* { this.renderQuestionBoxInfo() } */}
        
          <Row className="justify-content-center mb-3">
              <Col md="12" lg="12">
                { banner && <BannerImage { ...banner } /> }
              </Col>
          </Row>

          { (packs && packs.length > 0) ? packs.map((item, i) => (
              <NewCartPack key={ `cart-pack-${i}` } size="3" item = { item } addCartItem= { this.addCartItem } />
            ))
            : <>
              <Skeleton width="100%" height="2rem" />
              <Skeleton width="100%" height="2rem" />
              <Skeleton width="100%" height="2rem" />
              <Skeleton width="100%" height="2rem" />
              <Skeleton width="100%" height="2rem" />
              <Skeleton width="100%" height="2rem" />
            </>
          }
        </Container>
      </>
    );
  }
}

export default withRouter(MagicShop);
