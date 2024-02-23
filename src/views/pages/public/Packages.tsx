
import React from "react";

// reactstrap components
import {
  CardText,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  CardTitle,
  Form,
  Col
} from "reactstrap";
// core components
import AuthHeader from "../../../components/Headers/AuthHeader";
import connect from 'redux-connect-decorator';
import pack, { getPackages } from 'src/reducers/pack';
import { IRootState } from 'src/reducers';
import { CartPack } from '../components/CartPack';

@connect(
  ({ pack }: IRootState) => ({
    packs: pack.packs
  }),
  {
    getPackages
  }
)
class Packages extends React.Component<any, any> {

  componentDidMount() {
    this.props.getPackages();
  }

  render() {
    const { packs } = this.props;

    return (
      <>
        <AuthHeader title="PACKAGES" lead="" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="12">
              <div className="pricing card-group flex-column flex-md-row mb-3">
                { packs && packs.map((item, i) => (
                      <CartPack key={ `cart-pack-${i}` } size="3" item = { item } disabled />
                    ))
                }
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Packages;
