import React, {Component, useEffect} from "react";
// reactstrap components
// reactstrap components
import {
  Card,
  CardHeader,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import classnames from "classnames";

import { pagination } from "src/utils/common-utils";
// connect
import queryString from "query-string";
import BenitHeader from "src/components/Headers/BenitHeader";
import connect from "redux-connect-decorator";
import { IRootState } from "src/reducers";
import { getExamDetail } from "src/reducers/exam";
import { QUESTION_TYPE_FULL, QUESTION_TYPE } from "src/config/constants";

const ScoreDetail = ({ row, type }) => {
  return (
    <div className="view-question-score">
      {(type == "listening" || type == "speaking" || type == "writing") && (
        <div>
          <p>Content: </p>
          <p>{row.answer.content}</p>
        </div>
      )}
      {(type == "listening" || type == "writing") && (
        <div>
          <p>Form: </p>
          <p>{row.answer.form}</p>
        </div>
      )}
      {(type == "listening" || type == "writing") && (
        <div>
          <p>Grammar: </p>
          <p>{row.answer.grammar}</p>
        </div>
      )}
      {type == "listening" && (
        <div>
          <p>Spelling: </p>
          <p>{row.answer.spelling}</p>
        </div>
      )}
      {type == "speaking" && (
        <React.Fragment>
          <div>
            <p>Fluency: </p>
            <p>{row.answer.fluency.toFixed(1)}</p>
          </div>
          <div>
            <p>Pronunciation: </p>
            <p>{row.answer.pronunciation.toFixed(1)}</p>
          </div>
        </React.Fragment>
      )}
      {type == "writing" && (
        <React.Fragment>
          <div>
            <p>Vocabulary: </p>
            <p>{row.answer.vocabulary}</p>
          </div>
          {row.answer.generalInput > 0 && (
            <div>
              <p>General: </p>
              <p>{row.answer.generalInput}</p>
            </div>
          )}

          {row.answer.structure > 0 && (
            <div>
              <p>Structure: </p>
              <p>{row.answer.structure}</p>
            </div>
          )}

          {row.answer.spelling > 0 && (
            <div>
              <p>Spelling: </p>
              <p>{row.answer.spelling}</p>
            </div>
          )}
        </React.Fragment>
      )}
      <div className="text-blue">
        <p>Total: </p>
        <p>{row.answer.totalScore.toFixed(1)}</p>
      </div>
    </div>
  );
};

const AnswerDetail = ({ row, type }) => {
  let questionType = row.question.type;
  let audioLink = row.question.audioLink;
  let phraseHints = row.question.phraseHints;
  let questionText = row.question.text;
  let expectAnswer = row.question.expectAnswer;
  let description = row.question.description;
  let content = description && description.replaceAll(/@Blank@/gi, "______");
  let content2 = questionText && questionText.replaceAll(/@Blank@/gi, "______");

  let transcript = row.answer && row.answer.transcript;
  let answerText = row.answer && row.answer.answer;
  let answerLink = row.answer && row.answer.audioLink;
  // useEffect(() => {
  //   // console.log(typeof(expectAnswer))
  //   console.log(row.question.description)
  // }, [type])
  let expectAnswerList = [];
  let userAnswerList = [];
  if (questionType == QUESTION_TYPE.READING_FIB_R) {
    let expectAnswerArray = expectAnswer.replace(/\s/g, "").split(",");
    expectAnswerArray.map((c) => {
      expectAnswerList.push(row.question[`answer${c}`]);
    });

    let userAnswerArray = answerText.replace(/\s/g, "").split(",");
    userAnswerArray.map((c) => {
      userAnswerList.push(row.question[`answer${c}`]);
    });
  }

  return (
    <div>
      <div className="view-answer-detail">
        {((
            type == "speaking" &&
            (
              typeof(expectAnswer) === "string" ||
              questionType == QUESTION_TYPE.SPEAKING_DESCRIBE_IMAGE
            )
          ) || (
            type == "reading" ||
            (
              questionType == QUESTION_TYPE.READING_MCQ_R_SINGLE_ANSWER ||
              questionType == QUESTION_TYPE.READING_MCQ_R_MULTIPLE_ANSWER ||
              questionType == QUESTION_TYPE.READING_RE_ORDER_PARAGRAPH
            )
          ) || (
            type == "listening" &&
            row.question.description !== null ||
            (
              questionType == QUESTION_TYPE.LISTENING_HIGHLIGHT_CORRECT_SUMMARY ||
              questionType == QUESTION_TYPE.LISTENING_MCQ_L_MULTIPLE_ANSWER ||
              questionType == QUESTION_TYPE.LISTENING_MCQ_L_SINGLE_ANSWER ||
              questionType == QUESTION_TYPE.LISTENING_SELECT_MISSING_WORD
            )
          ) || type == "writing"
        ) && (
          <>
            <p>Question:</p>
            <p>
              {type == "listening" && content}
              {type == "reading" && content2}
              {type == "speaking" && expectAnswer}
              {type == "writing" && questionText}
              {questionType == QUESTION_TYPE.SPEAKING_DESCRIBE_IMAGE && (
                <div style={{ maxWidth: 300 }}>
                  <img src={audioLink} className="w-100" alt={"Image"} />
                </div>
              )}
              {
                <div className="mt-3">
                  {row.question.answerA && (
                    <p className="mb-2">{`A - ${row.question.answerA}`}</p>
                  )}
                  {row.question.answerB && (
                    <p className="mb-2">{`B - ${row.question.answerB}`}</p>
                  )}
                  {row.question.answerC && (
                    <p className="mb-2">{`C - ${row.question.answerC}`}</p>
                  )}
                  {row.question.answerD && (
                    <p className="mb-2">{`D - ${row.question.answerD}`}</p>
                  )}
                  {row.question.answerE && (
                    <p className="mb-2">{`E - ${row.question.answerE}`}</p>
                  )}
                </div>
              }
            </p>
          </>
        )}

        {type !== "writing" && <p>Correct answer:</p>}
        {type == "listening" && <p>{expectAnswer}</p>}
        {type == "reading" &&
          (questionType !== QUESTION_TYPE.READING_FIB_R ? (
            <p>{expectAnswer}</p>
          ) : (
            <p>{expectAnswerList.join(", ").toString()}</p>
          ))}
        {type == "speaking" && (
          <p>{phraseHints || questionText || expectAnswer}</p>
        )}
        <p>Your answer:</p>
        <p>
          {/* 
            part 3: answers
            detail: show all answers of user 
          */}
          {(type == "listening" || type == "writing") && answerText}
          {type == "reading" &&
            (questionType !== QUESTION_TYPE.READING_FIB_R ? (
              <p>{answerText}</p>
            ) : (
              <p>{userAnswerList.join(", ").toString()}</p>
            ))}
          {type == "speaking" && answerLink && (
            <div style={{ maxWidth: 400 }}>
              <audio controls>
                <source src={answerLink} type="audio/mpeg" />
              </audio>
            </div>
          )}
          {type == "speaking" && transcript && (
            <p>
              <span style={{ fontWeight: 600 }}>Transcript: </span> {transcript}
            </p>
          )}
        </p>
        <p>Score:</p>
        <p>{row.answer && <ScoreDetail row={row} type={type} />}</p>
      </div>
    </div>
  );
};

@connect(
  ({ authentication, exam }: IRootState) => ({
    user: authentication.user,
    examInfo: exam.examInfo,
  }),
  {
    getExamDetail,
  }
)
class ExamDetail extends Component<any, any> {
  state = {
    examId: 0,
    type: "speaking",
    data: [],
  };

  componentDidMount() {
    // this.props.getAll();
    // Build package
    this.props.getExamDetail(this.state.examId);
  }

  componentWillMount() {
    let examId = queryString.parse(this.props.location.search).id; // resume
    this.setState({ examId });
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { examInfo } = this.props;
    const { type, data } = this.state;

    let userInfo = (examInfo && examInfo.examDTO) || null;
    let mockInfo = (examInfo && examInfo.examTypeDTO) || null;
    let questions = (examInfo && examInfo.answerQuestions) || [];

    questions = questions.filter((q) =>
      {
        if (q.question != null){
          if (q.question.type){
            return (
                q.question.type.toLowerCase().includes(type)
            )
            // console.log(type, q.question.type.toLowerCase())
          }
        }
      }
    );


    // questions.sort((a, b) => {
    //   var nameA = a.question.type.toUpperCase(); // ignore upper and lowercase
    //   var nameB = b.question.type.toUpperCase(); // ignore upper and lowercase
    //   if (nameA > nameB) {
    //     return 1;
    //   }
    //   if (nameA < nameB) {
    //     return -1;
    //   }

    //   // names must be equal
    //   return 0;
    // });

    questions = questions.map((question, index) => {
      return {
        ...question,
        index: index + 1,
      };
    });
    console.log(questions);

    const columns = [
      {
        text: "No.",
        dataField: "stt",
        formatter: (cell, row) => {
          return row.index;
        },
      },
      {
        text: "Type",
        dataField: "type",
        formatter: (cell, row) => {
          return (
            <div>
              <div className="view-question-type">
                {QUESTION_TYPE_FULL[row.question.type].name}
              </div>
            </div>
          );
        },
      },
      {
        text: "Status",
        dataField: "status",
        formatter: (cell, row) => {
          return row.answer ? (
            <p className="text-success">Done</p>
          ) : (
            <p className="text-red">No answer</p>
          );
        },
      },
      {
        text: "Score",
        dataField: "score",
        formatter: (cell, row) => {
          return (
            row.answer && (
              <div className="view-question-score">
                <div className="text-blue">
                  <p>Total: {row.answer.totalScore.toFixed(1)}</p>
                </div>
              </div>
            )
          );
        },
      },
    ];

    const expandRow = {
      renderer: (row) => {
        return <AnswerDetail row={row} key={row.index} type={type} />;
      },
      expanded: Array.from(Array(questions.length + 1).keys()),
      showExpandColumn: true,
      expandHeaderColumnRenderer: () => null,
      expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
          return <i className="far fa-minus-square" />;
        }
        return <i className="far fa-plus-square" />;
      },
    };

    return (
      <>
        {/*<BenitHeader name="Exam detail" parentName="Exam history" />*/}
        <Container style={{marginTop:30}} fluid>
          <Row>
            <div className="col">
              <Card className="card-exam-detail">
                <CardHeader className="view-exam-detail-header">
                  <Row className="text-center align-items-center">
                    <Col>
                      <p>Email</p>
                      <h3>{userInfo && userInfo.email}</h3>
                    </Col>
                    <Col>
                      <p>Exam</p>
                      <h3>{mockInfo && mockInfo.name}</h3>
                    </Col>
                    <Col>
                      <p>Result</p>
                      <p>
                        <img
                          style={{ width: 80 }}
                          src={require("assets/img/completed-stamp.png")}
                          alt="completed-stamp"
                        />
                      </p>
                      {userInfo && (
                        <div className="d-flex justify-content-center">
                          <p className="mr-3">
                            <i className="fas fa-headphones-alt mr-1" />
                            {userInfo.comListening}
                          </p>
                          <p className="mr-3">
                            <i className="fas fa-microphone-alt mr-1" />
                            {userInfo.comSpeaking}
                          </p>
                          <p className="mr-3">
                            <i className="fas fa-book mr-1" />
                            {userInfo.comReading}
                          </p>
                          <p className="mr-3">
                            <i className="fas fa-pencil-alt mr-1" />
                            {userInfo.comWriting}
                          </p>
                        </div>
                      )}
                    </Col>
                  </Row>
                </CardHeader>
                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: type == "speaking",
                        })}
                        onClick={() => {
                          this.setState({ type: "speaking" });
                        }}
                      >
                        <i className="fas fa-microphone-alt mr-2" /> Speaking
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: type == "writing",
                        })}
                        onClick={() => {
                          this.setState({ type: "writing" });
                        }}
                      >
                        <i className="fas fa-pencil-alt mr-2" /> Writing
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: type == "reading",
                        })}
                        onClick={() => {
                          this.setState({ type: "reading" });
                        }}
                      >
                        <i className="fas fa-book mr-2" /> Reading
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: type == "listening",
                        })}
                        onClick={() => {
                          this.setState({ type: "listening" });
                        }}
                      >
                        <i className="fas fa-headphones-alt mr-2" /> Listening
                      </NavLink>
                    </NavItem>
                  </Nav>
                  {data && (
                    <div className="py-4 table-responsive align-items-center table-flush table-exam-detail">
                      <BootstrapTable
                        data={questions}
                        keyField="index"
                        columns={columns}
                        bordered={false}
                        bootstrap4={true}
                        // pagination={pagination}
                        expandRow={expandRow}
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default ExamDetail;
