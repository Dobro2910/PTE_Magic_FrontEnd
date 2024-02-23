import React, { Component } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Button,
  Row
} from "reactstrap";
import BenitHeader from 'src/components/Headers/BenitHeader';

class CommingSoon extends Component<any, any> {
  state = {
  };


  componentDidMount() {
  }
  
  componentWillReceiveProps({ acl }) {
  }

  componentWillUnmount() {
    // this.props.reset();
  }

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        <BenitHeader name="Coming Soon" parentName="Home" />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card>
                <CardHeader className="text-center">
                  <h3 className="mb-0">Coming Soon</h3>
                </CardHeader>
                <CardBody>
                  <div className="text-center">
                    <img width="200px" src={require("assets/img/pte_icon/comming-soon.svg")} />
                  </div>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default CommingSoon;
