
import React, { Component } from "react";
// reactstrap components
import {
  CardBody,
  Card,
  Container,
  Row,
  Col,
  Badge,
  CardTitle,
  CardText,
  Button,
  Form
} from "reactstrap";
import { url } from 'inspector';
import { CartPack } from 'src/views/pages/components/CartPack';
import connect from 'redux-connect-decorator';
import pack, { getPackages } from 'src/reducers/pack';
import { IRootState } from 'src/reducers';

@connect(
  ({ pack }: IRootState) => ({
    packs: pack.packs
  }),
  {
    getPackages
  }
)
class IntroPackages extends Component<any, any> {

  componentDidMount() {
    this.props.getPackages();
  }

  render() {
    const { packs } = this.props;
    
    return (
      <>
          <section className="section section-lg pt-lg-0 mt--7">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row>
                  { packs && packs.map((item, i) => (
                      <CartPack key={ `cart-pack-${i}` } size="3" item = { item } disabled />
                    ))
                  }
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
      </>
    )
  }
}

export default IntroPackages;
