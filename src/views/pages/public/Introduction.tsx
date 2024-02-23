
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
  Col
} from "reactstrap";
// core components
import AuthHeader from "../../../components/Headers/AuthHeader";

class Introduction extends React.Component {
  render() {
    return (
      <>
        <AuthHeader title="ABOUT US" lead="PTE MAGIC TEST CENTER" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="10">
            <Card>
              <CardBody className="card-border-left">
                  <div className="text-center">
                    <div className="grid-icon size-100 icon-university"></div>
                  </div>
                  <CardText className="mt-4 text-black">
                    Established since 2016, we have been a trusted PTE centre, helping more than thousands of PTE aspirants to get closer to their Australian dream. We do not only provide coaching with effective tips and tricks for PTE, but also ensure that students receive constant support and motivation to keep going no matter how hard the journey can be. We deliver quality online and offline classes, and to boost students’ confidence, we offer mock test platform with real question banks with teachers’ constructive feedback. And for this reason, our PTE pass rate is 90% for the year 2019.
                  </CardText>
                  <div className="text-right">
                    <div className="grid-icon icon-diploma"></div>
                    <div className="text-sm">PTE Team.</div>
                  </div>
              </CardBody>
          </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Introduction;
