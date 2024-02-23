
declare var require: any;
import React, { Component } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody
} from "reactstrap";
import Iframe from 'react-iframe';
import AdviceForm from '../../views/pages/components/AdviceForm';

class ContactInfo extends Component<any, any> {

  render() {
    return (
      <>
        <section className="py-4 bg-landing2">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-md-1" md="12">
                  <Row className="justify-content-center">
                    <Col>
                      <Row>
                        <Col md="6">
                          <div>
                            <div className={`contact-icon icon-university`}></div>
                            <ul className="ul-contact-info">
                              <li className="mb-3">
                                <span className="label-contact">Melbourne class:</span> 124 Exhibition St level 7, Melbourne, VIC, 3000
                              </li>
                              <li className="mb-3">
                                <span className="label-contact">Sydney class:</span> Suite 301/ 370 Pitt street, Sydney, nsw 2000
                              </li>
                              <li className="mb-3">
                                <span className="label-contact">Adelaide class:</span> Level 2 Room 208-209 95 Currie Street SA Adelaide 5000
                              </li>
                              <li className="mb-3">
                                <span className="label-contact">HCM City class:</span> 37 Hoa Sứ, P. 7, Q. Phú Nhuận, Hồ Chí Minh
                              </li>
                              <li className="mb-3">
                                <span className="label-contact">Hobart class:</span> Suite 114/ 86 Murray street, Hobart, TAS 7000
                              </li>
                            </ul>
                          </div>
                        </Col>
                        <Col md="6">
                        <div><div className={`contact-icon bg-topic-global-60`}></div><span className="label-contact">Website:</span> <a href="https://www.ptemagic.com.au" target="_blank">www.ptemagic.com.au</a></div>
                          <div><div className={`contact-icon icon-phone`}></div><span className="label-contact">Phone:</span> +61 460 668 688 - Hobart: +61 452 379 801</div>
                          <div><div className={`contact-icon icon-facebook`}></div><span className="label-contact">Facebook:</span> <a href="https://www.facebook.com/PTEMAGIC/" target="_blank">www.facebook.com/PTEMAGIC/</a></div>
                          <div><div className={`contact-icon icon-email`}></div><span className="label-contact">Vietnamese:</span> <a href="mailto:moni@ptemagic.com.au">ptemagic@gmail.com </a></div>
                          <div><div className={`contact-icon icon-email1`}></div><span className="label-contact">International:</span> <a href="mailto:moni@ptemagic.com.au">moni@ptemagic.com.au</a></div>
                          <div><div className={`contact-icon icon-youtube`}></div><span className="label-contact">Youtube:</span> <a href="https://www.youtube.com/MoniPTEMAGIC" target="_blank">www.youtube.com/MoniPTEMAGIC</a></div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
      </>
    )
  }
}

export default ContactInfo;
