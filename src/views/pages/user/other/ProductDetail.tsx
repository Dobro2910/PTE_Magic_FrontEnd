
import React, { Component } from "react";
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
import queryString from 'query-string';
import connect from 'redux-connect-decorator';
import banner, { getBanner } from 'src/reducers/banner';
import cart, { saveOne } from 'src/reducers/cart';
import pack, { getProduct } from 'src/reducers/pack';
import { IRootState } from '../../../../reducers';
import { toast } from 'react-toastify';

@connect(
  ({ cart, pack }: IRootState) => ({
    cart: cart.cart,
    loading: cart.loading,
    pack: pack.pack,
  }),
  {
    saveOne,
    getProduct
  }
)
class ProductDetail extends Component<any, any> {
  state = {
    type: null,
    selectedGroupPackage: null,
    packages: [],
    packId: queryString.parse(this.props.location.search).id
  };

  componentDidMount() {
    this.props.getProduct(this.state.packId);
  }

  componentWillUnmount() {
  }

  constructor(props) {
    super(props);
  }

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

  render() {

    const { pack } = this.props;

    return (
      <>
        <BenitHeader name="Product detail" parentName="Home" />
        <Container className="mt--6 bg-white" fluid>
          { pack && <>
            <Row>
                <Col md="6" lg="6">
                  <div className="text-center">
                    <img src= {pack.linkImage} alt="No Image" style={{ borderRadius: '15px', width : '100%' }} /> 
                  </div>
                  <div className="text-center mt-4">
                  </div>
                </Col>
                <Col md="6" lg="6">
                  <div className="card-product-info mt-6 mb--3"> 
                      <div className="text-center">
                        <h3 className="product-detail-header"> 
                          {pack.name} 
                        </h3>
                      </div>
                      <div className="time text-center"> 
                          Price: { pack.oldCost && <span className="line-through strike"> ${pack.oldCost}AUD </span> }
                          { pack.cost && <span className={`line-through ${pack.oldCost ? 'discount-price' : ''}`}> ${pack.cost}AUD </span> }
                      </div> 
                      <div className="cart-pack-description-detail mt-3">
                          <ul className="list-square mt--1 ml-15" dangerouslySetInnerHTML={{ __html: pack.description }}>
                          </ul>
                      </div>

                      <hr />

                      <div className="text-center mt-4">
                        <Button className="btn-benit-sm btn-benit-yellow mr-2" onClick={ (e) => { this.addCartItem(e, pack) }}>
                          <span className="btn-inner--icon mr-1">
                            <i className="fas fa-cart-plus" />
                          </span>
                          <span className="btn-inner--text hidden-lg-down">Buy now</span>
                        </Button>
                        <a href={ pack.linkYoutube } target="_blank">
                          <Button className="btn-benit-sm btn-benit-yellow mr-2">
                            <span className="btn-inner--icon mr-1">
                              <i className="fab fa-youtube" />
                            </span>
                            <span className="btn-inner--text hidden-lg-down">Youtube</span>
                          </Button>
                        </a>
                      </div>
                  </div>
                </Col>
            </Row>
            { pack.fullDescription && <Row className="justify-content-center mt-3 mb-3">
                  <Col md="12" lg="12">
                    <Card>
                      <CardBody>
                        <div className="cart-pack-full-description">
                            <div dangerouslySetInnerHTML={{ __html: pack.fullDescription }}>
                            </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
              </Row>
            }
          </>
          }
        </Container>
      </>
    );
  }
}

export default withRouter(ProductDetail);
