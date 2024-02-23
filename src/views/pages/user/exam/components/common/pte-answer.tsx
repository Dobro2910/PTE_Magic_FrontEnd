import React from "react";
import { IPteQuestion } from "src/shared/model/pte-question.model";
import { Button, Row, Col, CardTitle, CardBody } from "reactstrap";
import PteProgressBar from "./pte-progress-bar";
import { EXAM_GROUP } from "src/config/constants";
import { PteAnswerWriting } from "./pte-answer-component";
import connect from "redux-connect-decorator";
import { IRootState } from "src/reducers";
import { resetStore, sendEvent, clearAnswer } from "src/reducers/store";
import { PteLoadingSpinner } from "../../../../components/LoadingSpinner/pte-loading-spinner";
import { diffMatch } from "./utils.js";
import withExamSharedContext from "src/views/pages/components/withExamSharedContext";
import AudioWaveform from "src/components/AudioWaveform/AudioWaveform";
import { scoring, scoringText } from "../common/utils-answer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import MaterialTable from "material-table";
import ReactLoading from "react-loading";

// TODO: uploadProgress

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    fontSize: "18px",
    gridGap: "1px",
  },
  noteGrid: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  },
  dot1: {
    width: "15px",
    height: "15px",
    background: "green",
    borderRadius: "50%",
  },
  dot2: {
    width: "15px",
    height: "15px",
    background: "gray",
    borderRadius: "50%",
  },
  dot3: {
    width: "15px",
    height: "15px",
    background: "red",
    borderRadius: "50%",
  },
  note: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "5px",
  },
  item: {
    outline: "1px solid gray",
    padding: "10px",
    margin: 0,
  },
  item1: {
    outline: "1px solid gray",
    fontWeight: 600,
    padding: 10,
    margin: 0,
  },
  item2: {
    outline: "1px solid gray",
    borderBottom: "1px solid gray",
    padding: "25px",
    gridColumn: "1/3",
    margin: 0,
  },
  totalScore: {
    fontWeight: 700,
    fontSize: "18px",
  },
};

const SpeakingAnswer = (props) => {
  let grading = true;
  let { data, total, content, fluency, pronunciation } = scoring(
    props.text,
    props.answer,
    props.duration,
    props.type
  );
  total = total || 0;
  content = content || 0;
  fluency = fluency || 0;
  pronunciation = pronunciation || 0;
  if (props.type === "SPEAKING_ANSWER_SHORT_QUESTION") total = content;
  if (props.type == "SPEAKING_DESCRIBE_IMAGE") grading = false;
  if (props.type == "SPEAKING_RETELL_LECTURE") grading = false;
  console.log(data);

  return (
    <div>
      <div style={styles.grid}>
        <p style={styles.item1}>Transcript:</p>
        <p style={styles.item}>{props.answer}</p>
        {grading && (
          <React.Fragment>
            <p style={styles.item1}>Grading:</p>
            <div style={styles.item}>
              <p>
                {data &&
                  data.map((d) => {
                    let color = "red";
                    let textDeco = "auto";
                    if (d.id == "correct") color = "rgb(41, 202, 41)";
                    if (d.id == "wrong") {
                      color = "grey";
                      textDeco = "line-through";
                    }
                    return (
                      <span style={{ color: color, textDecoration: textDeco }}>
                        {" "}
                        {d.word}
                      </span>
                    );
                  })}
              </p>
              <div style={styles.note}>
                <div style={styles.noteGrid}>
                  <div style={styles.dot1}></div>
                  <span style={{ marginLeft: "5px" }}>Good</span>
                </div>
                <div style={styles.noteGrid}>
                  <div style={styles.dot2}></div>
                  <span style={{ marginLeft: "5px" }}>Wrong</span>
                </div>
                <div style={styles.noteGrid}>
                  <div style={styles.dot3}></div>
                  <span style={{ marginLeft: "5px" }}>Missing</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        <p style={styles.item2}>
          <div className="col-md-12">
            <Row>
              <div className="view-recognition">
                <div className="block-recognition">
                  <p className="typeAnswer">Content</p>
                  <p className="typeAnswer pull-right">
                    {content}/{props.type === "SPEAKING_READ_ALOUD" && "5"}
                    {props.type === "SPEAKING_RETELL_LECTURE" && "5"}
                    {props.type === "SPEAKING_DESCRIBE_IMAGE" && "5"}
                    {props.type === "SPEAKING_REPEAT_SENTENCE" && "3"}
                    {props.type === "SPEAKING_ANSWER_SHORT_QUESTION" && "1"}
                  </p>
                </div>
                <div className="txt-plus">
                  <p>+</p>
                </div>
                <div
                  className={
                    "block-recognition " +
                    (props.type === "SPEAKING_ANSWER_SHORT_QUESTION"
                      ? "block-disabled"
                      : "")
                  }
                >
                  <p className="typeAnswer">Pronunciation</p>
                  {props.type === "SPEAKING_ANSWER_SHORT_QUESTION" ? (
                    <p className="typeAnswer pull-right">--/--</p>
                  ) : (
                    <p className="typeAnswer pull-right">
                      {pronunciation}
                      /5
                    </p>
                  )}
                </div>
                <div className="txt-plus">
                  <p>+</p>
                </div>
                <div
                  className={
                    "block-recognition " +
                    (props.type === "SPEAKING_ANSWER_SHORT_QUESTION"
                      ? "block-disabled"
                      : "")
                  }
                >
                  <p className="typeAnswer">Fluency</p>
                  {props.type === "SPEAKING_ANSWER_SHORT_QUESTION" ? (
                    <p className="typeAnswer pull-right">--/--</p>
                  ) : (
                    <p className="typeAnswer pull-right">
                      {fluency}
                      /5
                    </p>
                  )}
                </div>
                <div className="txt-plus">
                  <p>=</p>
                </div>
                <div className="block-recognition-total">
                  <p className="typeAnswer">Total :</p>
                  <p className="typeAnswer pull-right">
                    {total}/{props.type === "SPEAKING_READ_ALOUD" && "15"}
                    {props.type === "SPEAKING_RETELL_LECTURE" && "15"}
                    {props.type === "SPEAKING_DESCRIBE_IMAGE" && "15"}
                    {props.type === "SPEAKING_REPEAT_SENTENCE" && "13"}
                    {props.type === "SPEAKING_ANSWER_SHORT_QUESTION" && "1"}
                  </p>
                </div>
              </div>
            </Row>
          </div>
        </p>
      </div>
    </div>
  );
};

const ListeningDictation = (props) => {
  let { data, content } = scoringText(props.text, props.answer);
  return (
    <div>
      {props.questionType !== "LISTENING_SUMMARIZE_SPOKEN_TEXT" ? (
        <>
          <div style={styles.note}>
            <div style={styles.noteGrid}>
              <div style={styles.dot1}></div>
              <span style={{ marginLeft: "5px" }}>Good</span>
            </div>
            <div style={styles.noteGrid}>
              <div style={styles.dot2}></div>
              <span style={{ marginLeft: "5px" }}>Wrong</span>
            </div>
            <div style={styles.noteGrid}>
              <div style={styles.dot3}></div>
              <span style={{ marginLeft: "5px" }}>Missing</span>
            </div>
          </div>
          <div style={styles.grid}>
            <p style={styles.item1}>Transcript:</p>
            <p style={styles.item}>{props.text}</p>
            <p style={styles.item1}>Grading:</p>
            <p style={styles.item}>
              {data &&
                data.map((d) => {
                  let color = null;
                  let textDeco = "auto";
                  if (d.id == "correct") color = "rgb(41, 202, 41)";
                  if (d.id == "missing") color = "red";
                  if (d.id == "wrong") {
                    color = "grey";
                    textDeco = "line-through";
                  }
                  return (
                    <span style={{ color: color, textDecoration: textDeco }}>
                      {" "}
                      {d.word}
                    </span>
                  );
                })}
            </p>
          </div>
        </>
      ) : (
        <>
          <div style={styles.grid}>
            <p style={styles.item1}>Transcript:</p>
            <p style={styles.item}>{props.text}</p>
          </div>
        </>
      )}
    </div>
  );
};

@connect(
  ({ store, transcript }: IRootState) => ({
    ...store,
    store_transcript: transcript.transcript,
  }),
  {
    sendEvent,
    resetStore,
    clearAnswer,
  }
)
@withExamSharedContext()
export default class PteAmswer extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    // tslint:disable-next-line
    console.log("PteAmswer componentWillUnmount");
    // Remove answer
    this.props.clearAnswer();
  }

  state = {
    waitLoading: false,
  };

  formatExpectMyAnswer = (answer, question: IPteQuestion) => {
    if (question.type === "LISTENING_FIB_L") {
      return answer.join(", ");
    } else if (
      question.type === "LISTENING_DICTATION" ||
      question.type === "LISTENING_SUMMARIZE_SPOKEN_TEXT"
    ) {
      return (
        <ListeningDictation
          questionType={question.type}
          text={question.expectAnswer}
          answer={answer}
        />
      );
    }
    if (
      question.type === "SPEAKING_DESCRIBE_IMAGE" ||
      question.type === "SPEAKING_ANSWER_SHORT_QUESTION" ||
      question.type === "SPEAKING_RETELL_LECTURE" ||
      question.type === "SPEAKING_REPEAT_SENTENCE" ||
      question.type === "SPEAKING_READ_ALOUD"
    ) {
      // Skip if exam group -> SPEAKING
      return;
    }

    if (
      answer.length > 0 &&
      (question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
        question.type === "LISTENING_MCQ_L_MULTIPLE_ANSWER" ||
        question.type === "LISTENING_HIGHLIGHT_CORRECT_SUMMARY" ||
        question.type === "LISTENING_SELECT_MISSING_WORD" ||
        question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
        question.type === "READING_MCQ_R_MULTIPLE_ANSWER")
    ) {
      var lst = answer.split(", ");
      var lstAnswer = [];
      for (let i = 0; i < lst.length; i++) {
        switch ("answer" + lst[i]) {
          case "answerA":
            var answerA = (
              <div className="answer-title">
                {"A" + " - " + question.answerA}
              </div>
            );
            lstAnswer.push(answerA);
            break;
          case "answerB":
            var answerB = (
              <div className="answer-title">
                {"B" + " - " + question.answerB}
              </div>
            );
            lstAnswer.push(answerB);
            break;
          case "answerC":
            var answerC = (
              <div className="answer-title">
                {"C" + " - " + question.answerC}
              </div>
            );
            lstAnswer.push(answerC);
            break;
          case "answerD":
            var answerD = (
              <div className="answer-title">
                {"D" + " - " + question.answerD}
              </div>
            );
            lstAnswer.push(answerD);
            break;
          case "answerE":
            var answerE = (
              <div className="answer-title">
                {"E" + " - " + question.answerE}
              </div>
            );
            lstAnswer.push(answerE);
            break;
          case "answerF":
            var answerF = (
              <div className="answer-title">
                {"F" + " - " + question.answerF}
              </div>
            );
            lstAnswer.push(answerF);
            break;
          case "answerG":
            var answerG = (
              <div className="answer-title">
                {"G" + " - " + question.answerG}
              </div>
            );
            lstAnswer.push(answerG);
            break;
          case "answerH":
            var answerH = (
              <div className="answer-title">
                {"H" + " - " + question.answerH}
              </div>
            );
            lstAnswer.push(answerH);
            break;
          case "answerJ":
            var answerJ = (
              <div className="answer-title">
                {"J" + " - " + question.answerJ}
              </div>
            );
            lstAnswer.push(answerJ);
            break;
          default:
          // code block
        }
      }
      return lstAnswer;
    } else {
      return answer;
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ waitLoading: true });
    }, 700);
  }

  formatExpectAnswer = (question: IPteQuestion) => {
    if (
      question.type === "LISTENING_MCQ_L_SINGLE_ANSWER" ||
      question.type === "LISTENING_MCQ_L_MULTIPLE_ANSWER" ||
      question.type === "LISTENING_HIGHLIGHT_CORRECT_SUMMARY" ||
      question.type === "LISTENING_SELECT_MISSING_WORD" ||
      question.type === "READING_MCQ_R_SINGLE_ANSWER" ||
      question.type === "READING_MCQ_R_MULTIPLE_ANSWER" ||
      question.type === "READING_RE_ORDER_PARAGRAPH" ||
      question.type === "READING_FIB_R"
    ) {
      var lst = question.expectAnswer.split(", ");
      var lstAnswer = [];
      for (let i = 0; i < lst.length; i++) {
        switch ("answer" + lst[i]) {
          case "answerA":
            const answerA = (
              <div className="answer-title" key={`answerA`}>
                {"A" + " - " + question.answerA}
              </div>
            );
            lstAnswer.push(answerA);
            break;
          case "answerB":
            const answerB = (
              <div className="answer-title" key={`answerB`}>
                {"B" + " - " + question.answerB}
              </div>
            );
            lstAnswer.push(answerB);
            break;
          case "answerC":
            const answerC = (
              <div className="answer-title" key={`answerC`}>
                {"C" + " - " + question.answerC}
              </div>
            );
            lstAnswer.push(answerC);
            break;
          case "answerD":
            const answerD = (
              <div className="answer-title" key={`answerD`}>
                {"D" + " - " + question.answerD}
              </div>
            );
            lstAnswer.push(answerD);
            break;
          case "answerE":
            const answerE = (
              <div className="answer-title" key={`answerE`}>
                {"E" + " - " + question.answerE}
              </div>
            );
            lstAnswer.push(answerE);
            break;
          case "answerF":
            const answerF = (
              <div className="answer-title" key={`answerF`}>
                {"F" + " - " + question.answerF}
              </div>
            );
            lstAnswer.push(answerF);
            break;
          case "answerG":
            const answerG = (
              <div className="answer-title" key={`answerG`}>
                {"G" + " - " + question.answerG}
              </div>
            );
            lstAnswer.push(answerG);
            break;
          case "answerH":
            const answerH = (
              <div className="answer-title" key={`answerH`}>
                {"H" + " - " + question.answerH}
              </div>
            );
            lstAnswer.push(answerH);
            break;
          case "answerI":
            const answerI = (
              <div className="answer-title" key={`answerI`}>
                {"I" + " - " + question.answerI}
              </div>
            );
            lstAnswer.push(answerI);
            break;
          case "answerJ":
            const answerJ = (
              <div className="answer-title" key={`answerJ`}>
                {"J" + " - " + question.answerJ}
              </div>
            );
            lstAnswer.push(answerJ);
            break;
          default:
            break;
          // code block
        }
      }
      return lstAnswer;
    } else {
      return question.expectAnswer;
    }
  };

  renderAudioSampeAnswerMedia = () => {
    return this.props.question.type === "SPEAKING_READ_ALOUD" ||
      this.props.question.type === "SPEAKING_REPEAT_SENTENCE" ||
      this.props.question.type === "SPEAKING_DESCRIBE_IMAGE" ||
      this.props.question.type === "SPEAKING_RETELL_LECTURE" ||
      this.props.question.type === "SPEAKING_ANSWER_SHORT_QUESTION" ? (
      <>
        {(this.props.question.audioLinkSampleMale ||
          this.props.question.audioLinkSampleFemale) && (
          <>
            <Row>
              <div className="col-md-4">
                <p className="typeAnswer">Sample answer</p>
              </div>
              <div className="col-md-8 padding0">
                {this.props.question.audioLinkSampleMale ? (
                  <>
                    <div>
                      <span>Male voice</span>
                    </div>
                    <div>
                      <div className="col-md-12">
                        <audio
                          controls
                          src={this.props.question.audioLinkSampleMale}
                          controlsList="nodownload"
                        />
                      </div>
                    </div>
                  </>
                ) : null}
                {this.props.question.audioLinkSampleFemale ? (
                  <>
                    <div>
                      <span>Female voice</span>
                    </div>
                    <div>
                      <div className="col-md-12">
                        <audio
                          controls
                          src={this.props.question.audioLinkSampleFemale}
                          controlsList="nodownload"
                        />
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </Row>
          </>
        )}
      </>
    ) : null;
  };

  renderAudioMedia = () => {
    return this.props.question.type !== "SPEAKING_DESCRIBE_IMAGE" &&
      this.props.question.type !== "WRITING_ESSAY" &&
      this.props.question.type !== "WRITING_SUMMARIZE_WRITTEN_TEXT" ? (
      <>
        <Row>
          <div className="col-md-4">
            <p className="typeAnswer">System's Answer</p>
          </div>
          <div className="col-md-8 padding0">
            {this.props.question.audioLink ? (
              <div>
                <div className="col-md-12">
                  {/* <audio controls src={this.props.question.audioLink} controlsList="nodownload" /> */}
                  <AudioWaveform source={this.props.question.audioLink} />
                </div>
              </div>
            ) : null}
            {this.renderAnswerQuestion()}
          </div>
        </Row>
      </>
    ) : null;
  };

  renderAnswerQuestion = () => {
    return this.props.question ? (
      <div className="col-md-12 padding0">
        <div className="col-md-12">
          <p className="pte-test-type-question-two-title ng-scope"></p>
        </div>
        <div className="col-md-12">
          <div className="answer-title">
            <div className="grid-icon size-30  icon-idea" />
            {this.formatExpectAnswer(this.props.question)}
          </div>
        </div>
      </div>
    ) : null;
  };

  renderMyRecordQuestion = () => {
    return this.props.question.type === "SPEAKING_DESCRIBE_IMAGE" ||
      this.props.question.type === "SPEAKING_ANSWER_SHORT_QUESTION" ||
      this.props.question.type === "SPEAKING_RETELL_LECTURE" ||
      this.props.question.type === "SPEAKING_REPEAT_SENTENCE" ||
      this.props.question.type === "SPEAKING_READ_ALOUD" ? (
      <div className="col-md-12 padding0">
        {this.props.audioSrc ? (
          <div className="col-md-12 padding0">
            <div className="col-md-12 padding0">
              <p className="typeAnswer">Student's record</p>
            </div>
            <div
              className="col-md-12"
              style={{ paddingBottom: 20, paddingLeft: 0, paddingRight: 0 }}
            >
              {/* <audio controls src={this.props.audioSrc} /> */}
              <AudioWaveform source={this.props.audioSrc} allowDownload />
            </div>
          </div>
        ) : null}

        {this.props.context.examGroup !== EXAM_GROUP.SCORE_TEST &&
          this.renderSpeakTranscript()}
      </div>
    ) : null;
  };

  renderSpeakTranscript = () => {
    const { question, transcript, store_transcript, duration } = this.props;
    let text = null;
    if (
      question.type == "SPEAKING_ANSWER_SHORT_QUESTION" ||
      question.type == "SPEAKING_DESCRIBE_IMAGE" ||
      question.type == "SPEAKING_RETELL_LECTURE"
    ) {
      text = question.phraseHints;
    } else {
      text = question.expectAnswer ? question.expectAnswer : question.text;
    }
    const value = store_transcript;
    console.log(value);

    return (
      <div className="col-md-12 padding0">
        <div className="col-md-12 padding0">
          {text && (
            <SpeakingAnswer
              duration={duration}
              type={question.type}
              text={text}
              answer={value}
            />
          )}
          {/* {question.type == "SPEAKING_DESCRIBE_IMAGE" && (
          <div>
            <div className="col-md-12 padding0">
              <p className="typeAnswer">Transcript</p>
            </div>
            <p className="" dangerouslySetInnerHTML={{ __html: store_transcript }}></p>
          </div>
        )} */}
        </div>
      </div>
    );
  };

  renderMyAnswer = () => {
    return this.props.question.type &&
      this.props.question.type !== "READING_RE_ORDER_PARAGRAPH" &&
      this.props.question.type !== "LISTENING_FIB_L" &&
      this.props.question.type !== "READING_FIB_R_W" &&
      this.props.question.type !== "READING_FIB_R" ? (
      <>
        <Row>
          <div className="col-md-12">
            <div className="col-md-12">
              <div className="col-md-12">
                <div className="answer-title">
                  {this.formatExpectMyAnswer(
                    this.props.answer,
                    this.props.question
                  )}
                </div>
              </div>
            </div>
            {this.renderMyRecordQuestion()}
          </div>
        </Row>
      </>
    ) : null;
  };

  renderRecognition = () => {
    return this.props.question.type &&
      (this.props.question.type === "SPEAKING_REPEAT_SENTENCE" ||
        this.props.question.type === "SPEAKING_READ_ALOUD" ||
        this.props.question.type === "SPEAKING_RETELL_LECTURE" ||
        this.props.question.type === "SPEAKING_ANSWER_SHORT_QUESTION" ||
        this.props.question.type === "SPEAKING_DESCRIBE_IMAGE") ? (
      <div>
        {this.props.uploadProgress && this.props.uploadProgress < 100 ? (
          <Row>
            <div className="col-md-4">
              <div className="col-md-12">
                <p className="typeAnswer">Upload Progress</p>
              </div>
            </div>
            <div className="col-md-8">
              <PteProgressBar progress={this.props.uploadProgress} />
            </div>
          </Row>
        ) : null}
        {this.props.googleAnswer ? (
          <Row>
            <div className="col-md-4">
              <p className="typeAnswer">Transcript</p>
            </div>
            <div className="col-md-8">
              <div className="col-md-12">
                <p className="typeAnswer">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: this.props.googleAnswer.markedTranscript,
                    }}
                  />
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <Row>
                <div className="view-recognition">
                  <div className="block-recognition">
                    <p className="typeAnswer">Content</p>
                    <p className="typeAnswer pull-right">
                      {this.props.googleAnswer.content}/
                      {this.props.question.type === "SPEAKING_READ_ALOUD" &&
                        "90"}
                      {this.props.question.type === "SPEAKING_RETELL_LECTURE" &&
                        "90"}
                      {this.props.question.type === "SPEAKING_DESCRIBE_IMAGE" &&
                        "90"}
                      {this.props.question.type ===
                        "SPEAKING_REPEAT_SENTENCE" && "90"}
                      {this.props.question.type ===
                        "SPEAKING_ANSWER_SHORT_QUESTION" && "1"}
                    </p>
                  </div>
                  <div className="txt-plus">
                    <p>+</p>
                  </div>
                  <div
                    className={
                      "block-recognition " +
                      (this.props.question.type ===
                      "SPEAKING_ANSWER_SHORT_QUESTION"
                        ? "block-disabled"
                        : "")
                    }
                  >
                    <p className="typeAnswer">Pronunciation</p>
                    {this.props.question.type ===
                    "SPEAKING_ANSWER_SHORT_QUESTION" ? (
                      <p className="typeAnswer pull-right">--/--</p>
                    ) : (
                      <p className="typeAnswer pull-right">
                        {this.props.googleAnswer.pronunciation}
                        /5
                      </p>
                    )}
                  </div>
                  <div className="txt-plus">
                    <p>+</p>
                  </div>
                  <div
                    className={
                      "block-recognition " +
                      (this.props.question.type ===
                      "SPEAKING_ANSWER_SHORT_QUESTION"
                        ? "block-disabled"
                        : "")
                    }
                  >
                    <p className="typeAnswer">Fluency</p>
                    {this.props.question.type ===
                    "SPEAKING_ANSWER_SHORT_QUESTION" ? (
                      <p className="typeAnswer pull-right">--/--</p>
                    ) : (
                      <p className="typeAnswer pull-right">
                        {this.props.googleAnswer.fluency}
                        /5
                      </p>
                    )}
                  </div>
                  <div className="txt-plus">
                    <p>=</p>
                  </div>
                  <div className="block-recognition">
                    <p className="typeAnswer">Total :</p>
                    <p className="typeAnswer pull-right">
                      {this.props.googleAnswer.totalScore}/
                      {this.props.question.type === "SPEAKING_READ_ALOUD" &&
                        "15"}
                      {this.props.question.type === "SPEAKING_RETELL_LECTURE" &&
                        "15"}
                      {this.props.question.type === "SPEAKING_DESCRIBE_IMAGE" &&
                        "15"}
                      {this.props.question.type ===
                        "SPEAKING_REPEAT_SENTENCE" && "13"}
                      {this.props.question.type ===
                        "SPEAKING_ANSWER_SHORT_QUESTION" && "1"}
                    </p>
                  </div>
                </div>
              </Row>
            </div>
          </Row>
        ) : (
          <div>
            {this.props.context.examGroup &&
              this.props.context.examGroup === EXAM_GROUP.SCORE_TEST && (
                <div className="answer-title-wait">
                  (Please wait! Your exams are in scoring process)
                </div>
              )}
          </div>
          // Scoring functions is shown as disabled temporarily
        )}
      </div>
    ) : null;
  };

  renderRecognitionWriting = () => {
    const columns = [
      {
        title: "CONTENT",
        field: "content",
        // render: (record) => <div>{record.createdDate.slice(0, 10)}</div>,
      },
      {
        title: "FORM",
        field: "form",
      },
      {
        title: "GRAMMAR",
        field: "grammar",
      },
      {
        title: "VOCABULARY",
        field: "vocabulary",
      },
      {
        title: <div style={styles.totalScore}>TOTAL</div>,
        field: "total",
        render: (record) => (
          <span style={styles.totalScore}>
            {record.totalScore}/{record.maxTotalScore}
          </span>
        ),
      },
    ];

    const columnsEssay = [
      {
        title: "CONTENT",
        field: "content",
      },
      {
        title: "FORM",
        field: "form",
      },
      {
        title: "STRUCTURE",
        field: "structure",
      },
      {
        title: "GRAMMAR",
        field: "grammar",
      },
      {
        title: "GENERAL",
        field: "generalInput",
      },
      {
        title: "VOCABULARY",
        field: "vocabulary",
      },
      {
        title: "SPELLING",
        field: "spelling",
      },
      {
        title: <div style={styles.totalScore}>TOTAL</div>,
        field: "total",
        render: (record) => (
          <span style={styles.totalScore}>
            {record.totalScore}/{record.maxTotalScore}
          </span>
        ),
      },
    ];
    let answerArray = [];
    this.props.googleAnswer && answerArray.push(this.props.googleAnswer);
    return this.props.question.type &&
      (this.props.question.type === "WRITING_SUMMARIZE_WRITTEN_TEXT" ||
        this.props.question.type === "WRITING_ESSAY") ? (
      <div>
        {/* <div className="card-payment-head">
          <h5 className="h3 mb-0">Scoring Results</h5>
        </div> */}
        {this.props.googleAnswer ? (
          <>
            <MaterialTable
              title={null}
              data={answerArray}
              columns={
                this.props.question.type === "WRITING_ESSAY"
                  ? columnsEssay
                  : columns
              }
              options={{
                paging: false,
                pageSize: 10,
                search: false,
                toolbar: false,
                sorting: false,
              }}
            />
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {this.props.context.examGroup &&
              this.props.context.examGroup === EXAM_GROUP.SCORE_TEST && (
                <div className="answer-title-wait">
                  (Please wait! Your exams are in scoring process)
                </div>
              )}
            {this.props.context.examGroup &&
              this.props.context.examGroup !== EXAM_GROUP.SCORE_TEST && (
                <ReactLoading
                  type={`bars`}
                  color={`#fc0`}
                  height={"40px"}
                  width={"30px"}
                />
              )}
          </div>
        )}
      </div>
    ) : null;
  };

  render() {
    const { question } = this.props;

    return (
      <>
        {!question && this.state.waitLoading ? (
          <>
            <PteLoadingSpinner />
          </>
        ) : (
          <>
            {question.type !== "READING_MCQ_R_MULTIPLE_ANSWER" &&
              question.type !== "READING_FIB_R" &&
              question.type !== "READING_FIB_R_W" &&
              question.type !== "READING_RE_ORDER_PARAGRAPH" &&
              question.type !== "READING_MCQ_R_SINGLE_ANSWER" &&
              question.type !== "LISTENING_SELECT_MISSING_WORD" &&
              question.type !== "LISTENING_MCQ_L_SINGLE_ANSWER" &&
              question.type !== "LISTENING_FIB_L" &&
              question.type !== "LISTENING_HIGHLIGHT_INCORRECT_WORD" &&
              question.type !== "LISTENING_HIGHLIGHT_CORRECT_SUMMARY" &&
              question.type !== "LISTENING_MCQ_L_MULTIPLE_ANSWER" && (
                <div className="mt-4">
                  <Grid container>
                    <Grid item xs={12}>
                      <Card className="card-answer">
                        <div className="card-answer-head">
                          {this.props.question.type === "WRITING_ESSAY" ||
                          this.props.question.type ===
                            "WRITING_SUMMARIZE_WRITTEN_TEXT" ? (
                            <h5 className="h3 mb-0">Scoring Results</h5>
                          ) : (
                            <>
                              <h5 className="h3 mb-0">Answer</h5>
                            </>
                          )}
                        </div>
                        <CardBody className="">
                          <div className="mt--4">
                            {this.props.question.type === "WRITING_ESSAY" ||
                            this.props.question.type ===
                              "WRITING_SUMMARIZE_WRITTEN_TEXT" ? (
                              <>
                                <PteAnswerWriting
                                  questionType={this.props.question.type}
                                  answer={this.props.answer}
                                />
                                {/* {this.renderRecognitionWriting()} */}
                                Maintaining writing scoring! We will get back to you soon in order to give you the best experience!
                              </>
                            ) : (
                              <>
                                {this.renderAudioMedia()}
                                {/* {this.renderAudioSampeAnswerMedia()} */}
                                {this.renderMyAnswer()}
                                {this.renderRecognition()}
                              </>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </Grid>
                  </Grid>
                </div>
              )}
          </>
        )}
      </>
    );
  }
}