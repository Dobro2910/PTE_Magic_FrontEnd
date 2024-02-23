import React, { Component, useEffect } from "react";
// reactstrap components
// reactstrap components
import $ from "jquery";
import connect from "redux-connect-decorator";
import {
  getAll,
  reset,
  getAllRepeated,
} from "../../../../reducers/question_bank";
import { IRootState } from "../../../../reducers";
import queryString from "query-string";
import { withRouter, Link } from "react-router-dom";
import { calculateProgress } from "src/utils/common-utils";
import { orderQuestionType } from "src/utils/question-utils";
import { QUESTION_TYPE_FULL, AI_QUESTION_TYPES } from "src/config/constants";

//material-ui/core
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import AudioPlayer from "../../../../components/CustomPostcardPlayer/AudioPlayer";
import tracks from "../../../../components/CustomPostcardPlayer/tracks.js";
import VideoPracticeCarousel from "src/components/CustomCarousel/VideoCarousel/VideoPracticeCarousel";
import BlogCardCarousel from "src/components/CustomCarousel/BlogCardCarousel";
import Button from "@material-ui/core/Button";
import QuestionBankDescription from "./QuestionBankDescription";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import TipsCarousel from "src/components/CustomCarousel/TipsCarousel/TipsCarousel";
import Skeleton from "@material-ui/lab/Skeleton";

// @ts-ignore
import present from "../../../../assets/img/gif/present.gif";
// @ts-ignore
import contacts from "../../../../assets/img/gif/contacts.gif";
// @ts-ignore
import click from "../../../../assets/img/gif/click.gif";

const bannerbelow = require("assets/img/bannerbelow.png");
const motivation1 = require("assets/img/motivation1.jpeg");
const motivation2 = require("assets/img/motivation2.jpeg");
const motivation3 = require("assets/img/motivation3.jpeg");

const listening = require("assets/img/gif/listening_banner.gif");
const reading = require("assets/img/gif/reading_banner.gif");
const speaking = require("assets/img/gif/speaking_banner.gif");
const writing = require("assets/img/gif/writing_banner.gif");

const BadgeCode = (props) => {
  return (
    <>
      <Grid
        container
        direction="row"
        spacing={1}
        style={{ alignItems: "center", display: "flex" }}
      >
        <Grid item>
          <div className="category-shortname">
            {QUESTION_TYPE_FULL[props.codeQuestion].code}
          </div>
        </Grid>
        <Grid item>
          <div className="type-name">{props.questionType}</div>
        </Grid>
      </Grid>
    </>
  );
};

const BadgeCodePremium = (props) => {
  return (
    <>
      <Grid
        container
        direction="row"
        spacing={1}
        style={{ alignItems: "center", display: "flex" }}
      >
        <Grid item>
          <div className="category-shortname">NEW</div>
        </Grid>
        <Grid item>
          <div className="type-name">Resources</div>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPrimary: {
      backgroundColor: "white",
    },
    barColorPrimary: {
      backgroundColor: "#ffbe2e",
    },
  })
);

const QuestionBankCard = (props) => {
  const classes = useStyles();
  return (
    <>
      {props.data.imageUrl ? (
        <div className="element-question-bank-practice-image">
          <Link
            to={`/platform/exam/question_bank?page=0&total=${
              props.data.total
            }&type=${props.data.type}${props.repeated ? "&repeated=true" : ""}`}
          >
            <Card className="element-card-question">
              {/* <CardContent className="header-size"> */}
              <Grid container className="card-question-practice">
                <Grid item xs={12} className="text-uppercase text-dark mb-0">
                  <BadgeCode
                    questionType={props.data.type.split("_")[0]}
                    codeQuestion={props.data.type}
                  />
                  <div className="category-name-title">{props.data.name}</div>
                  <div
                    style={{
                      textTransform: "none",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ paddingRight: 5 }}>
                      <FiberManualRecordIcon className="dot-small" />
                      <FiberManualRecordIcon className="dot-small" />
                    </div>
                    <span>{props.data.numberTested} /</span>
                    <span>{props.data.total}</span>
                  </div>
                </Grid>
              </Grid>
              <div className="card-image">
                <img
                  src={props.data.imageUrl}
                  alt=""
                  style={{ width: "100%" }}
                />
              </div>
              {props.data.type.split("_")[0] === "SPEAKING" && (
                <div className="ai-scoring-tag">
                  <span>AI Scoring</span>
                </div>
              )}

              {/* </CardContent> */}
            </Card>
          </Link>
        </div>
      ) : (
        <div className="element-question-bank">
          <Link
            to={`/platform/exam/question_bank?page=0&total=${
              props.data.total
            }&type=${props.data.type}${props.repeated ? "&repeated=true" : ""}`}
          >
            <Card className="element-card-question">
              {/* <CardContent className="header-size"> */}
              <Grid container className="card-question-practice">
                <Grid item xs={12} className="text-uppercase text-dark mb-0">
                  <BadgeCode
                    questionType={props.data.type.split("_")[0]}
                    codeQuestion={props.data.type}
                  />
                  <div className="category-name-title">{props.data.name}</div>
                  <div
                    style={{
                      textTransform: "none",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ paddingRight: 5 }}>
                      <FiberManualRecordIcon className="dot-small" />
                      <FiberManualRecordIcon className="dot-small" />
                    </div>
                    <span>{props.data.numberTested} /</span>
                    <span>{props.data.total}</span>
                  </div>
                </Grid>
              </Grid>
              {props.data.type.split("_")[0] === "SPEAKING" && (
                <div className="ai-scoring-tag">
                  <span>AI Scoring</span>
                </div>
              )}
              {/* </CardContent> */}
            </Card>
          </Link>
        </div>
      )}
    </>
  );
};

const CardNoData = (props) => {
  return (
    <>
      <div className="element-question-bank">
        <Card className="element-card-question">
          <Grid container className="card-question-practice">
            <Grid item xs={12} className="text-uppercase text-dark mb-0">
              <div className="category-name-title">COMING SOON</div>
              <div
                style={{
                  textTransform: "none",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div style={{ paddingRight: 5 }}>
                  <FiberManualRecordIcon className="dot-small" />
                  <FiberManualRecordIcon className="dot-small" />
                  <FiberManualRecordIcon className="dot-small" />
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
};

const CardAdvertising = () => {
  return (
    <div className="element-question-bank">
      <Card className="element-card-question">
        {/* <CardContent className="header-size"> */}
        <Grid container className="card-question-practice">
          <Grid item xs={12} className="text-uppercase text-dark mb-0">
            <BadgeCodePremium />
            <div className="category-name-title">
              GET the latest PTE Prediction
            </div>
            <div
              style={{
                textTransform: "none",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ paddingRight: 5 }}>
                <FiberManualRecordIcon className="dot-small" />
                <FiberManualRecordIcon className="dot-small" />
              </div>
              <span>158</span>
              &nbsp;
              <span>pages</span>
            </div>
          </Grid>
        </Grid>
        <div className="ai-scoring-tag">
          <span>Download</span>
        </div>
        {/* </CardContent> */}
      </Card>
    </div>
  );
};

@connect(
  ({ questionBank }: IRootState) => ({
    data: questionBank.questionBanks,
    loading: questionBank.loading,
  }),
  {
    getAll,
    reset,
    getAllRepeated,
  }
)
class QuestionBankBox extends Component<any, any> {
  state = {
    type: queryString.parse(this.props.location.search).type,
    data: [],
    titleGroup: null,
    repeatedQuestionFlag: queryString.parse(this.props.location.search)
      .repeated,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    // const pathname = this.props.location.pathname;
    if (this.state.repeatedQuestionFlag) {
      // Except repeated
      this.props.getAllRepeated();
    } else {
      // Get all
      this.props.getAll();
    }
  };

  componentWillUnmount() {
    this.props.reset();
  }

  componentWillReceiveProps({ location, data }) {
    const pathname = this.props.location.pathname;
    let titleGroup;
    let type;
    let fixedData = [];
    if (pathname.indexOf("speaking") > 0) {
      type = "speaking";
    } else if (pathname.indexOf("writing") > 0) {
      type = "writing";
    } else if (pathname.indexOf("reading") > 0) {
      type = "reading";
    } else {
      type = "listening";
    }
    const result = this.filter(data);
    // title group
    if (this.state.repeatedQuestionFlag) {
      titleGroup = "Repeated Questions";
    } else {
      titleGroup = "Question Bank";
    }

    result.map((item) => {
      if (item.type === "LISTENING_MCQ_L_SINGLE_ANSWER") {
        item.imageUrl = click;
      }
      if (item.type === "SPEAKING_REPEAT_SENTENCE") {
        item.imageUrl = contacts;
      }
      if (item.type === "READING_FIB_R_W") {
        item.imageUrl = present;
      }
    });

    this.setState({ type, data: result, titleGroup });
  }

  constructor(props) {
    super(props);
  }

  // formatName = (cell, row) => {
  //   return (
  //     <Media className="align-items-center">
  //       <a className="topic mr-3" onClick={(e) => e.preventDefault()}>
  //         {this.state.type == "speaking" && (
  //           <i
  //             className="fas fa-microphone-alt text-primary"
  //             style={{ fontSize: "30px" }}
  //           ></i>
  //         )}
  //         {this.state.type == "writing" && (
  //           <i
  //             className="fas fa-pencil-alt text-green"
  //             style={{ fontSize: "30px" }}
  //           ></i>
  //         )}
  //         {this.state.type == "reading" && (
  //           <i
  //             className="fas fa-book text-orange"
  //             style={{ fontSize: "30px" }}
  //           ></i>
  //         )}
  //         {this.state.type == "listening" && (
  //           <i
  //             className="fas fa-headphones-alt text-indigo"
  //             style={{ fontSize: "30px" }}
  //           ></i>
  //         )}
  //       </a>
  //       <Media>
  //         <span className="name mb-0 text-sm">{cell.toUpperCase()}</span>
  //       </Media>
  //     </Media>
  //   );
  // };

  filter = (data) => {
    if (!this.state.type) return data;
    const result = data.filter((item) => {
      return !item.type.toLowerCase().indexOf(this.state.type);
    });
    return orderQuestionType(this.state.type, result);
  };

  // addActionButton = (cell, row) => {
  //   return (
  //       <div className="table-actions">
  //         <Link to={ `/exam/question_bank?total=${row.total}&type=${row.type}` }>
  //           <Button className="btn-icon btn-sm btn-xs" color="success" type="button">
  //             <span className="btn-inner--icon mr-1">
  //               <i className="fas fa-play" />
  //             </span>
  //             <span className="btn-inner--text">Start</span>
  //           </Button>
  //         </Link>
  //       </div>
  //   )
  // }

  onChangeRepeatedQuestion = (e) => {
    e.preventDefault();
    var result = $("#custom-repeated-question-flag").is(":checked")
      ? true
      : false;
    this.setState({ repeatedQuestionFlag: result }, this.loadData);
  };

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ) {
    if (this.state.data[0]) {
      console.log(this.state.data[0].type);
    }
  }

  render() {
    const { data, titleGroup } = this.state;
    const { loading } = this.props;
    const motivationPics = [motivation1, motivation2, motivation3];
    return (
      <>
        <div className="mt--11 container-fluid">
          <Grid container direction="column">
            <Grid item>
              <div className="col question-header">
                <h3 className="question-title">{this.state.type}</h3>
              </div>
              {this.state.type === "listening" && (
                <QuestionBankDescription
                  overview={
                    <p className="questions-description">
                      PTE Listening is the final section of the test and will
                      take approximately 45-60 minutes, depending on the
                      combination of tasks you may be presented with.
                    </p>
                  }
                  details={
                    <>
                      <p className="questions-description">
                        There are 8 tasks in the section:
                      </p>
                      <ul className="questions-lists">
                        <li>Summarize spoken text</li>
                        <li>Multiple-choice, multiple answers</li>
                        <li>Fill in the blanks</li>
                        <li>Highlight correct summary</li>
                        <li>Multiple-choice, single answer</li>
                        <li>Select missing word</li>
                        <li>Highlight incorrect words</li>
                        <li>Write from dictation</li>
                      </ul>
                    </>
                  }
                  decoration={
                    <CardAdvertising
                    />
                  }
                />
              )}
              {this.state.type === "speaking" && (
                <QuestionBankDescription
                  overview={
                    <p className="questions-description">
                      The first part of the test will evaluate your Speaking and
                      Writing skills ; this section is approximately of 75-95
                      minutes. It evaluates your English Language proficiency in
                      an academic environment
                    </p>
                  }
                  details={
                    <>
                      <p className="questions-description">
                        There are 5 tasks in the section:
                      </p>
                      <ul className="questions-lists">
                        <li>Read aloud</li>
                        <li>Repeat sentence</li>
                        <li>Describe image</li>
                        <li>Re-tell lecture</li>
                        <li>Answer short question</li>
                      </ul>
                    </>
                  }
                  decoration={
                    <CardAdvertising/>
                  }
                />
              )}
              {this.state.type === "reading" && (
                <QuestionBankDescription
                  overview={
                    <p className="questions-description">
                      PTE Reading is the second section of the test and will
                      take approximately 30-40 minutes. The reading materials
                      for this section are all authentic texts about a variety
                      of academic subjects, including humanities, natural
                      sciences and social sciences.
                    </p>
                  }
                  details={
                    <>
                      <p className="questions-description">
                        There are 5 tasks in the section:
                      </p>
                      <ul className="questions-lists">
                        <li>Multiple-choice, choose single answer</li>
                        <li>Multiple-choice, multiple answers</li>
                        <li>Re-order paragraphs</li>
                        <li>Fill in the blanks</li>
                        <li>Reading & writing: Fill in the blanks</li>
                      </ul>
                    </>
                  }
                  decoration={<CardAdvertising/>}
                />
              )}
              {this.state.type === "writing" && (
                <QuestionBankDescription
                  overview={
                    <p className="questions-description">
                      The Writing is the second section of the Speaking module.
                      The writing test assesses your writing skills in terms of
                      how good you are in grammar, formatting sentences, and
                      sticking to the topic given. You will be judged on the
                      quality of your writing.
                    </p>
                  }
                  details={
                    <>
                      <p className="questions-description">
                        There are 2 tasks in the section:
                      </p>
                      <ul className="questions-lists">
                        <li>Summarize written text</li>
                        <li>Write essay</li>
                      </ul>
                    </>
                  }
                  decoration={
                    <CardAdvertising/>
                  }
                />
              )}
            </Grid>
            <Grid item>
              {this.props.loading ? (
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Skeleton width="100%" height="300px" />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton width="100%" height="300px" />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton width="100%" height="300px" />
                  </Grid>
                </Grid>
              ) : (
                <>
                  <div className="practice-question-bank">
                    {data &&
                      data.map((item, i) => (
                        <QuestionBankCard
                          key={`bank-cart-${this.state.type}-${i}`}
                          data={item}
                          type={this.state.type}
                          repeated={
                            this.state.titleGroup === "Repeated Questions"
                              ? "true"
                              : null
                          }
                        />
                      ))}
                    {data && data[0]
                      ? data[0].type.split("_")[0] == "WRITING" && (
                          <CardNoData />
                        )
                      : ""}
                  </div>{" "}
                </>
              )}
            </Grid>
            <Grid item className="features-and-tips">
              <Grid container direction="column">
                <Grid
                  item
                  className="features-resources"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                >
                  <h3>Features resources</h3>
                  <VideoPracticeCarousel />
                </Grid>
                {/* <Grid
                  item
                  className="features-resources"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                >
                  <h3>Tips and Tricks</h3>
                  <BlogCardCarousel />
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default withRouter(QuestionBankBox);
