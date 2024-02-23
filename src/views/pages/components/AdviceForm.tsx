import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Button
} from "reactstrap";
// core components

class AdviceForm extends React.Component {
  state = {
    yourName: null,
    emailAddress: null,
    location: null,
    phoneNumber: null,
    content: null
  };
  componentDidMount() {
  }
  
  render() {
    return (
      <>
        <Card>
          <CardHeader>
            <h3 className="mb-0">REGISTER & JOIN FREE TRIAL</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup
                      className={classnames("input-group-merge", {
                        focused: this.state.yourName
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Your name"
                        type="text"
                        onFocus={e => this.setState({ yourName: true })}
                        onBlur={e => this.setState({ yourName: false })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup
                      className={classnames("input-group-merge", {
                        focused: this.state.emailAddress
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email address"
                        type="email"
                        onFocus={e =>
                          this.setState({ emailAddress: true })
                        }
                        onBlur={e =>
                          this.setState({ emailAddress: false })
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup
                      className={classnames("input-group-merge", {
                        focused: this.state.location
                      })}
                    >
                      <Input
                        placeholder="Location"
                        type="text"
                        onFocus={e => this.setState({ location: true })}
                        onBlur={e => this.setState({ location: false })}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fas fa-map-marker" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup
                      className={classnames("input-group-merge", {
                        focused: this.state.phoneNumber
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-globe-americas" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Phone number"
                        type="text"
                        onFocus={e =>
                          this.setState({ phoneNumber: true })
                        }
                        onBlur={e =>
                          this.setState({ phoneNumber: false })
                        }
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fas fa-phone" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <div className="text-center" style={{margin: 'auto'}}>
                  <Button className="my-4" color="info" type="button">
                    FREE TRIAL
                  </Button>
                </div>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </>
    );
  }
}
export default AdviceForm;
