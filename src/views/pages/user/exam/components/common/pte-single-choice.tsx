import React from "react";
import { IPteQuestion } from "src/shared/model/pte-question.model";
import "src/assets/css/checkbox.css";

export interface IPteSingleChoiceProps {
  onCompleted: Function;
  question: IPteQuestion;
  examGroup: string;
  correctAnswer: boolean;
}

export interface IPteSingleChoiceState {
  answer: string;
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

export default class PteSingleChoice extends React.Component<
  IPteSingleChoiceProps,
  IPteSingleChoiceState
> {
  constructor(props) {
    super(props);
  }

  state = {
    answer: null,
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
  // Get answer of common component
  getAnswer = () => {
    return this.state.answer;
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
              type="radio"
              name="answer"
              id="answerA"
              value="answerA"
              onClick={() => this.setState({ answer: "A" })}
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
              type="radio"
              name="answer"
              id="answerB"
              value="answerB"
              onClick={() => this.setState({ answer: "B" })}
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
              type="radio"
              name="answer"
              id="answerC"
              value="answerC"
              onClick={() => this.setState({ answer: "C" })}
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
              type="radio"
              name="answer"
              id="answerD"
              value="answerD"
              onClick={() => this.setState({ answer: "D" })}
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
              type="radio"
              name="answer"
              id="answerE"
              value="answerE"
              onClick={() => this.setState({ answer: "E" })}
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
              type="radio"
              name="answer"
              id="answerF"
              value="answerF"
              onClick={() => this.setState({ answer: "F" })}
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
              type="radio"
              name="answer"
              id="answerG"
              value="answerG"
              onClick={() => this.setState({ answer: "G" })}
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
              type="radio"
              name="answer"
              id="answerH"
              value="answerH"
              onClick={() => this.setState({ answer: "H" })}
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
              type="radio"
              name="answer"
              id="answerJ"
              value="answerJ"
              onClick={() => this.setState({ answer: "J" })}
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
