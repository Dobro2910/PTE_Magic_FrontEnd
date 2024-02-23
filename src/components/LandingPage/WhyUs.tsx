
declare var require: any;
import React, { Component } from "react";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  UncontrolledTooltip,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Badge
} from "reactstrap";
import { Link } from 'react-router-dom';

class WhyUs extends Component<any, any> {

  render() {
    return (
      <>
        <section className="py-6">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-1" md="6">
                <img style={{ width: '100%', height: '100%', opacity: 0.3 }} 
                  src="https://cclmagic-data.s3-ap-southeast-2.amazonaws.com/sydney_sketch_29.jpg" />
              </Col>
              <Col className="order-md-2" md="6">
                <div className="pr-md-5">
                  <h1>WHY CHOOSE PTE MAGIC?</h1>
                </div>
                <ul className="list-unstyled mt-5">
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge
                          className="badge-circle mr-3"
                          color="success"
                        >
                          <i className="ni ni-settings-gear-65" />
                        </Badge>
                      </div>
                      <div>
                        <h4 className="mb-0">
                        Access to the recent repeated PTE question bank
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge
                          className="badge-circle mr-3"
                          color="success"
                        >
                          <i className="ni ni-html5" />
                        </Badge>
                      </div>
                      <div>
                        <h4 className="mb-0">Practice with automatic scored mock test with accurate and instant result</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge
                          className="badge-circle mr-3"
                          color="success"
                        >
                          <i className="ni ni-satisfied" />
                        </Badge>
                      </div>
                      <div>
                        <h4 className="mb-0">
                          Effective self study tools & User friendly
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge
                          className="badge-circle mr-3"
                          color="success"
                        >
                          <i className="ni ni-satisfied" />
                        </Badge>
                      </div>
                      <div>
                        <h4 className="mb-0">
                        Proven tips and tricks from experienced PTE trainers
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    )
  }
}

export default WhyUs;
