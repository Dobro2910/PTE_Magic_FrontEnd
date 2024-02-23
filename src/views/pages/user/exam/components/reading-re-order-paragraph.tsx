import React from "react";
import {
  ANIMATION_IN,
  ANIMATION_OUT,
  EVENT,
  EXAM_GROUP,
} from "src/config/constants";
import PteDnDList from "./common/pte-dnd-list";
import { Animated } from "react-animated-css";
import withStorageAnswer from "pages/components/withStorageAnswer";
import connect from "redux-connect-decorator";
import { IRootState } from "src/reducers";
import { sendEvent } from "src/reducers/store";
import withTrackingQuestion from "src/views/pages/components/withTrackingQuestion";
import { ReadingReOrderParagraph } from "benit-ui";

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
export default class ReadingROP extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // Create ref
    this.pteDnDListAnswerRef = React.createRef();
  }

  // declare ref
  pteDnDListAnswerRef;

  state = {
    check: false,
  };

  componentWillReceiveProps({ event }) {
    if (event) {
      switch (event) {
        case EVENT.ON_EXAM:
          this.props.sendEvent(null);
          this.onAnswer();
          break;
        default:
          break;
      }
    }
  }

  componentWillUnmount() {}

  // Get answer
  onAnswer = () => {
    let answer = this.pteDnDListAnswerRef.current.getAnswer();
    // call storageAnswer
    this.setState({ check: !this.state.check });
    this.props.storageAnswer({ answer });
  };

  render() {
    let expectAnswer = this.props.question.expectAnswer
      .replace(/\s/g, "")
      .split(",");
    let ropData;
    expectAnswer.length === 5
      ? (ropData = {
          choices: [
            {
              text: this.props.question.answerA,
              label: "A",
              correct: expectAnswer[0],
            },
            {
              text: this.props.question.answerB,
              label: "B",
              correct: expectAnswer[1],
            },
            {
              text: this.props.question.answerC,
              label: "C",
              correct: expectAnswer[2],
            },
            {
              text: this.props.question.answerD,
              label: "D",
              correct: expectAnswer[3],
            },
            {
              text: this.props.question.answerE,
              label: "E",
              correct: expectAnswer[4],
            },
          ],
        })
      : (ropData = {
          choices: [
            {
              text: this.props.question.answerA,
              label: "A",
              correct: expectAnswer[0],
            },
            {
              text: this.props.question.answerB,
              label: "B",
              correct: expectAnswer[1],
            },
            {
              text: this.props.question.answerC,
              label: "C",
              correct: expectAnswer[2],
            },
            {
              text: this.props.question.answerD,
              label: "D",
              correct: expectAnswer[3],
            },
          ],
        });
    return (
      <div style={{ marginBottom: 15 }}>
        {/* <ReadingReOrderParagraph data={ropData} /> */}
        <Animated
          animationIn={ANIMATION_IN}
          animationOut={ANIMATION_OUT}
          isVisible
        >
          <PteDnDList
            ref={this.pteDnDListAnswerRef}
            question={this.props.question}
          />
        </Animated>
        {this.state.check ? (
          <div style={{ marginLeft: 18 }}>
            <p style={{ fontWeight: 600, display: "contents" }}>Answer:</p>
            {this.props.question.expectAnswer}
          </div>
        ) : (
          <div>{""}</div>
        )}
      </div>
    );
  }
}
