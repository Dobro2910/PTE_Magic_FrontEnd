import React from 'react';
import { Translate } from 'src/utils/language/translate';
import { Link } from 'react-router-dom';
import { getViewExamLink } from 'src/utils/pte-utils';
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

const MessageAddCart = props => (
  <>
    <div className="cart-success-container">
      <div className="text-center mt-2 mb-2">
        <div className={`grid-icon icon-cart-success`}></div>
      </div>
      <div>
        Product: {props.product.name}
      </div>
      <div className="text-gray">
        item successfully added to your cart.
      </div>
      <div className="text-center mt-3 mb-2">
        <a href={ '/platform/user/cart' } >
          <Button className="btn-benit-sm btn-benit-yellow mr-2">
            <span className="btn-inner--icon mr-1">
              <i className="fas fa-cart-plus" />
            </span>
            <span className="btn-inner--text hidden-lg-down">Checkout</span>
          </Button>
        </a>
      </div>
    </div>
  </>
)