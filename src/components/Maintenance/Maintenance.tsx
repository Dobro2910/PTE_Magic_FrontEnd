
import React, { Component } from "react";
// reactstrap components
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
import BenitHeader from 'src/components/Headers/BenitHeader';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class MockTestList extends Component<any, any> {

  render() {

    return (
      <>
        <BenitHeader name="Mock test" parentName="Home" />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card>
                <CardHeader>
                  <div className="text-center">
                    <div style={{ display: "flex", justifyContent: "center", paddingBottom: "20px" }}>
                      <div style={{ width: 100, height: 100 }} className="icon-maintenance2" />
                    </div>
                    <h2 style={{ fontSize: "2.14rem", margin: "0" }}>Our Mock Test is undergoing maintenance.</h2>
                    <p style={{ color: "#ada6a6", fontWeight: 600 }}>It will be availabe again on 9p.m. (GMT+7) and We apologize for any inconvenience.</p>
                    <p style={{ fontSize: "15px", margin: 0, fontWeight: 400 }}>You can contact support at <span style={{ color: "#1976d2" }}>info@ptemagicpractice.com</span></p>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default MockTestList;
