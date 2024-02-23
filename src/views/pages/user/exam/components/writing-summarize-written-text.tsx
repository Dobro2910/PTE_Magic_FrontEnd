import axios from "axios";
import React from "react";
import {
  EXAM_GROUP,
  ANIMATION_IN,
  ANIMATION_OUT,
  EVENT,
} from "src/config/constants";
import PteTextAnswer from "./common/pte-text-answer";
import PteTextQuestion from "./common/pte-text-question";
import { Animated } from "react-animated-css";
import withStorageAnswer from "pages/components/withStorageAnswer";
import connect from "redux-connect-decorator";
import { IRootState } from "src/reducers";
import { sendEvent } from "src/reducers/store";
import withTrackingQuestion from "src/views/pages/components/withTrackingQuestion";
import { randomRequestId } from "src/utils/pte-utils";
import withExamSharedContext from "src/views/pages/components/withExamSharedContext";

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
@withExamSharedContext()
export default class WritingSWT extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onChangeTextAnswer = this.onChangeTextAnswer.bind(this);
    // this.onCompletedQuestion = this.onCompletedQuestion.bind(this);
    // Create ref
    this.pteTextAnswerRef = React.createRef();
  }

  componentWillMount() {
    console.log(this.props);
  }

  componentWillUnmount() {}

  componentWillReceiveProps({ event }) {
    console.log(`WritingSWT ReceiveProps: ${event}`);
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

  // declare ref
  pteTextAnswerRef;

  // Get answer
  onAnswer = () => {
    let answer = this.pteTextAnswerRef.current.getAnswer();
    // tslint:disable-next-line
    console.log("Answer WritingSWT: " + answer);
    // call storageAnswer
    this.props.storageAnswer({ answer });

    // Recogination audio (AI Scoring)
    this.onRecognitionWriting(answer);
  };

  onChangeTextAnswer = (text) => {
    // tslint:disable-next-line
  };

  onRecognitionWriting = async (answer) => {
    console.log(`writing summarize written text onRecogniation`);
    console.log(this.props.context);
    let res = await axios.post(`api/answer/recognition-writing`, {
      answer: answer,
      questionId: this.props.question.id,
      requestId: `${randomRequestId()}-${
        this.props.question.id
      }-${new Date().getTime()}`,
      packInfo: `#${this.props.index + 1} (Package ${this.props.page + 1})`,
    });
    // if (this.props.context.examGroup !== EXAM_GROUP.SCORE_TEST) {
    //   return;
    // }
    this.props.storedAnswer({ googleAnswer: res.data });
    console.log(res.data);
  };
  render() {
    return (
      <div>
        <Animated
          animationIn={ANIMATION_IN}
          animationOut={ANIMATION_OUT}
          isVisible
        >
          <PteTextQuestion
            examGroup={this.props.examGroup}
            text={this.props.question.text}
          />
          <PteTextAnswer
            ref={this.pteTextAnswerRef}
            length={75}
            onChange={this.onChangeTextAnswer}
            questionType={this.props.question.type}
          />
        </Animated>
      </div>
    );
  }
}
