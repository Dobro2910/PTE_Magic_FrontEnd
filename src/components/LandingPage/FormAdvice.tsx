
declare var require: any;
import React, { Component } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import Iframe from 'react-iframe';
import AdviceForm from '../../views/pages/components/AdviceForm';

class FormAdvice extends Component<any, any> {

  render() {
    return (
      <>
        <section className="py-4 bg-landing2">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-md-1" md="6">
                  <Row className="justify-content-center">
                    <Col>
                      <AdviceForm />
                    </Col>
                  </Row>
                </Col>
                <Col className="order-md-2" md="6">
                  <div className="pr-md-5">
                    <Iframe  
                        className="map-ccl"
                        width="100%" 
                        height="100%" 
                        id="gmap_canvas" 
                        url="https://maps.google.com/maps?q=Suite%20301%2F370%20Pitt%20Street%20Sydney%20NSW%202000&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                        scrolling="no">
                    </Iframe>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
      </>
    )
  }
}

export default FormAdvice;
