import React from "react";
import {
  ANIMATION_IN,
  ANIMATION_OUT,
  EVENT,
  EXAM_GROUP,
} from "src/config/constants";
import PteFillInTheBlank from "./common/pte-fib";
import { Animated } from "react-animated-css";
import withStorageAnswer from "pages/components/withStorageAnswer";
import connect from "redux-connect-decorator";
import { IRootState } from "src/reducers";
import { sendEvent } from "src/reducers/store";
import withTrackingQuestion from "src/views/pages/components/withTrackingQuestion";
import { FillInTheBlankRFIB } from "benit-ui";

@withStorageAnswer()
@withTrackingQuestion()
@connect(
  ({ store }: IRootState) => ({
    event: store.event,
  }),
  {
    sendEvent,
  }
)
export default class FillInTheBlankR extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // Create ref
    this.pteFillInTheBlank = React.createRef();
  }
  // declare ref
  pteFillInTheBlank;

  state = {
    correctAnswer: false,
  };

  componentWillReceiveProps({ event }) {
    if (event) {
      switch (event) {
        case EVENT.ON_EXAM:
          this.props.sendEvent(null);
          this.onAnswer();
          break;
        // case EVENT.CLEAR_ANSWER:
        //   this.props.sendEvent(null);
        //   this.onAnswer();
        //   break;
        default:
          break;
      }
    }
  }

  componentWillUnmount() {
  }

  // Get answer
  onAnswer = () => {
    console.log(`FillInTheBlankR onAnswer`);
    this.setState({ correctAnswer: !this.state.correctAnswer });
    let answer = this.pteFillInTheBlank.current.getAnswer().join(', ');
    this.props.storageAnswer({ answer });
  };

  render() {
    const question = this.props.question;
    const answerKeys = Object.keys(this.props.question).filter((k) =>
      k.includes("answer")
    );
    let choices = {};
    let columns = {};
    let answer = [];
    answerKeys.forEach((key, index) => {
      if (question[key] !== null && question[key].trim() !== "") {
        let correct = null;
        question.expectAnswer.split(", ").forEach((value, i) => {
          if (key === "answer" + value) {
            correct = i + 1;
          }
        });
        choices[`task-` + index] = {
          id: `task-` + index,
          text: question[key],
          correct: correct,
        };
      }
    });
    question.expectAnswer.split(", ").forEach((value, index) => {
      answerKeys.forEach((key, i) => {
        if (key === "answer" + value) {
          answer.push(" " + question[key]);
          columns["column-" + index] = {
            id: "column-" + index,
            taskIds: [],
          };
        }
      });
    });
    columns["column-data"] = {
      id: "column-data",
      taskIds: Object.keys(choices),
    };
    
    const fillInTheBlankRFIB = {
      isChecked: this.state.correctAnswer,
      question: {
        answer: answer.toString(),
        columns: columns,
        choices: choices,
        text: this.props.question.text,
      },
    };

    return (
      <div id="fib-r">
        {/* <FillInTheBlankRFIB data={fillInTheBlankRFIB} /> */}
        <Animated
          animationIn={ANIMATION_IN}
          animationOut={ANIMATION_OUT}
          isVisible
        >
          <PteFillInTheBlank
            correctAnswer={this.state.correctAnswer}
            key="fib-r"
            ref={this.pteFillInTheBlank}
            question={this.props.question}
          />
        </Animated>
      </div>
    );
  }
}
