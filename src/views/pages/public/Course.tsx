
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

class Course extends React.Component {
  render() {
    return (
      <>
        <AuthHeader title="KHÓA LUYỆN THI" lead="" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="10">
            <Card>
              <CardBody>
                  <CardText className="mt-4">
                      
                  </CardText>
                  <CardText className="mt-4">
                      
                  </CardText>
              </CardBody>
          </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Course;
