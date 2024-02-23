import React from "react";
import { IPteQuestion } from "src/shared/model/pte-question.model";
import $ from "jquery";

import "src/assets/css/checkbox.css";
export interface IPteMultipleChoiceProps {
  onCompleted: Function;
  question: IPteQuestion;
  examGroup: string;
  correctAnswer: boolean;
}

export interface IPteMultipleChoiceState {
  listAnswer: string;
  answerA: boolean;
  answerB: boolean;
  answerC: boolean;
  answerD: boolean;
  answerE: boolean;
  answerF: boolean;
  answerG: boolean;
  answerH: boolean;
  answerJ: boolean;
}

export default class PteMultipleChoice extends React.Component<
  IPteMultipleChoiceProps,
  IPteMultipleChoiceState
> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}
  componentWillReceiveProps() {
    setTimeout(
      function () {
        if (this.props.correctAnswer !== false) {
          var lst = this.props.question.expectAnswer.split(", ");
          for (var i = 0; i < lst.length; i++) {
            switch (lst[i]) {
              case "A":
                this.setState({
                  answerA: true,
                });
                break;
              case "B":
                this.setState({
                  answerB: true,
                });
                break;
              case "C":
                this.setState({
                  answerC: true,
                });
                break;
              case "D":
                this.setState({
                  answerD: true,
                });
                break;
              case "E":
                this.setState({
                  answerE: true,
                });
                break;
              case "F":
                this.setState({
                  answerF: true,
                });
                break;
              case "G":
                this.setState({
                  answerG: true,
                });
                break;
              case "H":
                this.setState({
                  answerH: true,
                });
                break;
              case "J":
                this.setState({
                  answerH: true,
                });
                break;
              default:
              // code block
            }
          }
        }
      }.bind(this),
      100
    );
  }

  state = {
    listAnswer: "",
    answerA: false,
    answerB: false,
    answerC: false,
    answerD: false,
    answerE: false,
    answerF: false,
    answerG: false,
    answerH: false,
    answerJ: false,
  };
  onChangeAnswer(answer) {
    this.state.listAnswer = this.state.listAnswer + answer;
    console.log(this.state.listAnswer);
  }

  // Get answer of common component
  getAnswer = () => {
    let answer = [];
    const indexAnswer = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    indexAnswer.map((index) => {
      if ($("#answer" + index).prop("checked") === true) {
        answer.push(index);
      }
    });
    return answer.join(", ");
  };
  render() {
    return (
      <div className="padding-left30">
        {this.props.question.answerA !== null ? (
          <div className="checkbox checkbox-success">
            <span
              className={
                this.props.correctAnswer ? "icon-check-answer block" : "none"
              }
            >
              <i
                className={
                  this.state.answerA
                    ? "fas fa-check color-answer-correct"
                    : " fas fa-times color-answer-wrong"
                }
              />
            </span>
            <input
              type="checkbox"
              name="answerA"
              id="answerA"
              value="A"
              onClick={() => this.onChangeAnswer("A, ")}
            />
            <label
              htmlFor="answerA"
              className={
                this.props.question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_SELECT_MISSING_WORD" ||
                this.props.question.type ===
                  "LISTENING_HIGHLIGHT_CORRECT_SUMMARY"
                  ? "line-height-30"
                  : "pte-checkBox-multiple"
              }
            >
              <p className="margin-left30 pte-text-answer">
                {this.props.question.answerA}
              </p>
            </label>
          </div>
        ) : (
          ""
        )}
        {this.props.question.answerB !== null ? (
          <div className="checkbox checkbox-success">
            <span
              className={
                this.props.correctAnswer ? "icon-check-answer block" : "none"
              }
            >
              <i
                className={
                  this.state.answerB
                    ? "fas fa-check color-answer-correct"
                    : " fas fa-times color-answer-wrong"
                }
              />
            </span>
            <input
              type="checkbox"
              name="answerB"
              id="answerB"
              value="B"
              onClick={() => this.onChangeAnswer("B, ")}
            />
            <label
              htmlFor="answerB"
              className={
                this.props.question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_SELECT_MISSING_WORD" ||
                this.props.question.type ===
                  "LISTENING_HIGHLIGHT_CORRECT_SUMMARY"
                  ? "line-height-30"
                  : "pte-checkBox-multiple"
              }
            >
              <p className="margin-left30 pte-text-answer">
                {this.props.question.answerB}
              </p>
            </label>
          </div>
        ) : (
          ""
        )}
        {this.props.question.answerC !== null ? (
          <div className="checkbox checkbox-success">
            <span
              className={
                this.props.correctAnswer ? "icon-check-answer block" : "none"
              }
            >
              <i
                className={
                  this.state.answerC
                    ? "fas fa-check color-answer-correct"
                    : " fas fa-times color-answer-wrong"
                }
              />
            </span>
            <input
              type="checkbox"
              name="answerC"
              id="answerC"
              value="C"
              onClick={() => this.onChangeAnswer("C, ")}
            />
            <label
              htmlFor="answerC"
              className={
                this.props.question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_SELECT_MISSING_WORD" ||
                this.props.question.type ===
                  "LISTENING_HIGHLIGHT_CORRECT_SUMMARY"
                  ? "line-height-30"
                  : "pte-checkBox-multiple"
              }
            >
              <p className="margin-left30 pte-text-answer">
                {this.props.question.answerC}
              </p>
            </label>
          </div>
        ) : (
          ""
        )}
        {this.props.question.answerD !== null ? (
          <div className="checkbox checkbox-success">
            <span
              className={
                this.props.correctAnswer ? "icon-check-answer block" : "none"
              }
            >
              <i
                className={
                  this.state.answerD
                    ? "fas fa-check color-answer-correct"
                    : " fas fa-times color-answer-wrong"
                }
              />
            </span>
            <input
              type="checkbox"
              name="answerD"
              id="answerD"
              value="D"
              onClick={() => this.onChangeAnswer("D, ")}
            />
            <label
              htmlFor="answerD"
              className={
                this.props.question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_SELECT_MISSING_WORD" ||
                this.props.question.type ===
                  "LISTENING_HIGHLIGHT_CORRECT_SUMMARY"
                  ? "line-height-30"
                  : "pte-checkBox-multiple"
              }
            >
              <p className="margin-left30 pte-text-answer">
                {this.props.question.answerD}
              </p>
            </label>
          </div>
        ) : (
          ""
        )}
        {this.props.question.answerE !== null ? (
          <div className="checkbox checkbox-success">
            <span
              className={
                this.props.correctAnswer ? "icon-check-answer block" : "none"
              }
            >
              <i
                className={
                  this.state.answerE
                    ? "fas fa-check color-answer-correct"
                    : " fas fa-times color-answer-wrong"
                }
              />
            </span>
            <input
              type="checkbox"
              name="answerE"
              id="answerE"
              value="E"
              onClick={() => this.onChangeAnswer("E, ")}
            />
            <label
              htmlFor="answerE"
              className={
                this.props.question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_SELECT_MISSING_WORD" ||
                this.props.question.type ===
                  "LISTENING_HIGHLIGHT_CORRECT_SUMMARY"
                  ? "line-height-30"
                  : "pte-checkBox-multiple"
              }
            >
              <p className="margin-left30 pte-text-answer">
                {this.props.question.answerE}
              </p>
            </label>
          </div>
        ) : (
          ""
        )}
        {this.props.question.answerF !== null ? (
          <div className="checkbox checkbox-success">
            <span
              className={
                this.props.correctAnswer ? "icon-check-answer block" : "none"
              }
            >
              <i
                className={
                  this.state.answerF
                    ? "fas fa-check color-answer-correct"
                    : " fas fa-times color-answer-wrong"
                }
              />
            </span>
            <input
              type="checkbox"
              name="answerF"
              id="answerF"
              value="F"
              onClick={() => this.onChangeAnswer("F, ")}
            />
            <label
              htmlFor="answerF"
              className={
                this.props.question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_SELECT_MISSING_WORD" ||
                this.props.question.type ===
                  "LISTENING_HIGHLIGHT_CORRECT_SUMMARY"
                  ? "line-height-30"
                  : "pte-checkBox-multiple"
              }
            >
              <p className="margin-left30 pte-text-answer">
                {this.props.question.answerF}
              </p>
            </label>
          </div>
        ) : (
          ""
        )}
        {this.props.question.answerG !== null ? (
          <div className="checkbox checkbox-success">
            <span
              className={
                this.props.correctAnswer ? "icon-check-answer block" : "none"
              }
            >
              <i
                className={
                  this.state.answerG
                    ? "fas fa-check color-answer-correct"
                    : " fas fa-times color-answer-wrong"
                }
              />
            </span>
            <input
              type="checkbox"
              name="answerG"
              id="answerG"
              value="G"
              onClick={() => this.onChangeAnswer("G, ")}
            />
            <label
              htmlFor="answerG"
              className={
                this.props.question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_SELECT_MISSING_WORD" ||
                this.props.question.type ===
                  "LISTENING_HIGHLIGHT_CORRECT_SUMMARY"
                  ? "line-height-30"
                  : "pte-checkBox-multiple"
              }
            >
              <p className="margin-left30 pte-text-answer">
                {this.props.question.answerG}
              </p>
            </label>
          </div>
        ) : (
          ""
        )}
        {this.props.question.answerH !== null ? (
          <div className="checkbox checkbox-success">
            <span
              className={
                this.props.correctAnswer ? "icon-check-answer block" : "none"
              }
            >
              <i
                className={
                  this.state.answerH
                    ? "fas fa-check color-answer-correct"
                    : " fas fa-times color-answer-wrong"
                }
              />
            </span>
            <input
              type="checkbox"
              name="answerH"
              id="answerH"
              value="H"
              onClick={() => this.onChangeAnswer("H, ")}
            />
            <label
              htmlFor="answerH"
              className={
                this.props.question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_SELECT_MISSING_WORD" ||
                this.props.question.type ===
                  "LISTENING_HIGHLIGHT_CORRECT_SUMMARY"
                  ? "line-height-30"
                  : "pte-checkBox-multiple"
              }
            >
              <p className="margin-left30 pte-text-answer">
                {this.props.question.answerH}
              </p>
            </label>
          </div>
        ) : (
          ""
        )}
        {this.props.question.answerJ !== null ? (
          <div className="checkbox checkbox-success">
            <span
              className={
                this.props.correctAnswer ? "icon-check-answer block" : "none"
              }
            >
              <i
                className={
                  this.state.answerJ
                    ? "fas fa-check color-answer-correct"
                    : " fas fa-times color-answer-wrong"
                }
              />
            </span>
            <input
              type="checkbox"
              name="answerJ"
              id="answerJ"
              value="J"
              onClick={() => this.onChangeAnswer("J, ")}
            />
            <label
              htmlFor="answerJ"
              className={
                this.props.question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
                this.props.question.type === "LISTENING_SELECT_MISSING_WORD" ||
                this.props.question.type ===
                  "LISTENING_HIGHLIGHT_CORRECT_SUMMARY"
                  ? "line-height-30"
                  : "pte-checkBox-multiple"
              }
            >
              <p className="margin-left30 pte-text-answer">
                {this.props.question.answerJ}
              </p>
            </label>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
