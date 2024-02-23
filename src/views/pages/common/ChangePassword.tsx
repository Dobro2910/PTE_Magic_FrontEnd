
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import AuthHeader from 'src/components/Headers/AuthHeader';
import { AVATAR_DEFAULT } from 'src/config/constants';

import connect from 'redux-connect-decorator';
import { IRootState } from 'src/reducers/index';
import { changePassword } from 'src/reducers/account';

@connect(
  ({ authentication }: IRootState) => ({
    user: authentication.user
  }),
  {
    // getAll
    changePassword
  }
)
class ChangePassword extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange = (e) => {
    let password = e.target.value;
    this.setState({ password });
  }

  state = {
    focused: true,
    password: null
  };

  onChangePasswordSubmit = () => {
    if (this.state.password) {
      this.props.changePassword(this.state.password);
    }
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <Container className="mt-8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="card-profile bg-secondary mt-5">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <img
                        alt="..."
                        className="rounded-circle border-secondary"
                        src={ user.avatar || AVATAR_DEFAULT }
                      />
                    </div>
                  </Col>
                </Row>
                <CardBody className="pt-7 px-5">
                  <div className="text-center mb-4">
                    <h3>{ user.fullName }</h3>
                  </div>
                  <Form role="form">
                    <FormGroup
                      className={classnames({
                        focused: this.state.focused
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="New password"
                          type="password"
                          onFocus={() => this.setState({ focused: true })}
                          onBlur={() => this.setState({ focused: false })}
                          onChange={this.onTextChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="btn-benit btn-benit-yellow mt-2" type="button"
                        disabled={ !this.state.password }
                        onClick={ this.onChangePasswordSubmit }>
                        Change password
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ChangePassword;
