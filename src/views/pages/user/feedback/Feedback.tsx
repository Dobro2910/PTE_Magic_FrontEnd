import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

import { toast } from "react-toastify";
import connect from "redux-connect-decorator";
// core components
import _ from "lodash";
import "./pte-feedback.scss";
import { Button, Modal, Label } from "reactstrap";
import FBMultipleChoice from "./common/pte-fb-multiple-choice";
import FBSingleChoice from "./common/pte-fb-single-choice";
import FBTextarea from "./common/pte-fb-textarea";
import FBSelect from "./common/pte-fb-select";
import { questions, souvenir } from "./data";
import { onCloseModal, saveFeedback } from "src/reducers/authentication";

@connect((state) => ({}), {
  onCloseModal,
  saveFeedback,
})
class Feedback extends React.Component<any, any> {
  state = {
    data: {},
    step: 1,
    lang: "en",
  };
  componentWillMount() {
    this.props.onCloseModal();
  }

  submit = async () => {
    let data = {
      lang: this.state.lang,
      data: JSON.stringify(this.state.data),
    };
    var size = Object.keys(this.state.data).length;
    if (size !== questions.length) {
      toast.error("Take a look again, have you completed all the questions?");
    } else {
      const json = await this.props.saveFeedback(data);
      if (json && json.value.status == 200) this.setState({ step: 3 });
    }
  };
  onChangeChoice = (key, value) => {
    let obj = { [key]: value };
    let data = this.state.data;
    _.merge(data, obj);
    this.setState(data);
  };

  onNext = () => {
    this.setState({ step: 2 });
  };

  render() {
    return (
      <Container>
        <div className="pte-fb-container">
          <div className="pte-fb-header">
            <h3 className="pte-fb-title">We value your feedback!</h3>
            <p>
              Please complete the following form. This way can keep improving
              our customer experience.
            </p>
          </div>
          {this.state.step == 1 && (
            <div className="pte-fb-body">
              <h3 className="fb-gift-title">Please select Your Rewards</h3>
              <div className="grid-souverirs">
                <div className="gift-item" onClick={this.onNext}>
                  <img src={require("assets/img/iconbook.svg")} alt="" />
                  <p>*PTE Hot Tips* Ebook 2021 </p>
                </div>
                <div className="gift-item" onClick={this.onNext}>
                  <img src={require("assets/img/iconfavorite.svg")} alt="" />
                  <p>Secret Gift</p>
                </div>
                <div className="gift-item" onClick={this.onNext}>
                  <img src={require("assets/img/iconfavorite.svg")} alt="" />
                  <p>Secret Gift</p>
                </div>
                <div className="gift-item" onClick={this.onNext}>
                  <img src={require("assets/img/iconbanknote.svg")} alt="" />
                  <p>40% Discount on Magic Shop</p>
                </div>
              </div>
            </div>
          )}
          {this.state.step == 2 && (
            <div className="pte-fb-body">
              {questions.map((d) => {
                if (d.type == "mcm")
                  return (
                    <FBMultipleChoice
                      data={d}
                      onChange={(v) => this.onChangeChoice(d.key, v)}
                    />
                  );
                else if (d.type == "mcs")
                  return (
                    <FBSingleChoice
                      data={d}
                      onChange={(v) => this.onChangeChoice(d.key, v)}
                    />
                  );
                else if (d.type == "text")
                  return (
                    <FBTextarea
                      length={200}
                      data={d}
                      onChange={(v) => this.onChangeChoice(d.key, v)}
                    />
                  );
                else if (d.type == "select")
                  return (
                    <FBSelect
                      data={d}
                      onChange={(v) => this.onChangeChoice(d.key, v)}
                    />
                  );
              })}

              <div className="text-center">
                <Button
                  className="btn-feedback btn-benit-yellow"
                  type="button"
                  onClick={this.submit}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}

          {this.state.step == 3 && (
            <p className="text-center">Thank you page</p>
          )}
        </div>
      </Container>
    );
  }
}

export default Feedback;
