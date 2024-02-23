import React, { useEffect, useLayoutEffect, useState } from "react";
import classnames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
// redux
import { connect } from "react-redux";
import { IRootState } from "src/reducers";
import PteSidebarMobile from "./PteSidebarMobile";
import { resetStore, sendEvent, initStore } from "src/reducers/store";
import {
  getQuestionByType,
  getQuestionRepeatedByType,
} from "src/reducers/question";
import Pagination from "@material-ui/lab/Pagination";
import queryString from "query-string";
import { ExamSharedContext } from "src/context/exam.context";
import {
  EVENT,
  EXAM_GROUP,
  QUESTION_TYPE_FULL,
  AI_QUESTION_TYPES,
} from "src/config/constants";
import BannerCarousel from "src/components/CustomCarousel/BannerCarousel/BannerCarousel";
import { Link } from "react-router-dom";
import { getQuestionCountInfoByType } from "src/reducers/question_bank";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
const banner1 = require("assets/img/banner/banner1.png");
const banner2 = require("assets/img/banner/banner2.png");

const drawerWidth = 600;
const drawerWidth2 = 256;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: drawerWidth,
      overflow: "unset !important",
      ["@media (max-width: 1000px)"]: {
        width: 400,
      },
      ["@media (max-width: 400px)"]: {
        width: 300,
      },
    },
    toggleButton: {
      position: "absolute",
      backgroundColor: "#70eac1",
      borderRadius: "50%",
      width: "64px",
      height: "64px",
      zIndex: 1,
      left: "-34px",
      top: "calc(50% - 32px)",
      border: "2px solid #000000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    toggleButton2: {
      position: "fixed",
      backgroundColor: "#70eac1",
      borderRadius: "50%",
      width: "64px",
      height: "64px",
      zIndex: 1,
      right: -32,
      top: "calc(50% - 32px)",
      border: "2px solid #000000",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingLeft: 7,
    },
    toggleButton3: {
      position: "fixed",
      backgroundColor: "#ffbe2e",
      borderRadius: "50%",
      width: "64px",
      height: "64px",
      zIndex: 1,
      left: -32,
      paddingRight: 7,
      top: "calc(50% - 32px)",
      border: "2px solid #000000",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    contentWrapper: {
      padding: "32px 56px",
      overflow: "scroll",
    },
    leftSidebarWrapper: {
      padding: 24,
    },
    shortQuestionName: {
      "& span": {
        backgroundColor: "#6c7975",
        color: "#FFFFFF",
        padding: "2px 8px",
        fontSize: "12px",
      },
    },
    questionName: {
      "& h2": {
        fontSize: "18px",
        marginBottom: "9px",
      },
    },
    noticeCard: {
      marginBottom: 16,
      "& .MuiCard-root": {
        backgroundColor: "#ffbe2e !important",
        border: "2px solid #000000",
        borderRadius: "0px",
        boxShadow: "none !important",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        margin: "10px 15px 20px 15px",
        "& span": {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
    },
    questionWrapper: {
      fontWeight: 600,
      fontSize: 14,
      color: "#000000",
    },
    questionDetails: {
      padding: "8px 0px",
      borderBottom: "1px solid #cccccc",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      // transition: "box-shadow 200ms ease,transform 200ms ease",
      "&:hover": {
        // transform: "translate(-0.75rem, -0.25rem)",
        // boxShadow: "8px 8px 0 #ffedcf !important",
        backgroundColor: "#ffedcf",
      },
    },
    questionHightLight: {
      backgroundColor: "#ffedcf",
    },
    wrapUp:{
      display: "flex",
      alignItems: "center"
    },
    nameTag: {
      lineHeight: "20px",
      whiteSpace: "nowrap",
      background: "#fafafa",
      border: "1px solid #d9d9d9",
      borderRadius: 2,
      marginRight: 8,
      padding: "0 7px",
    },
    tagWrapper: {
      display: "flex",
      alignItems: "center",
    },
    newsTag: {
      backgroundColor: "#F94E4E",
      border: "2px solid #000000",
      borderRadius: 3,
      lineHeight: "20px",
      whiteSpace: "nowrap",
      marginRight: 8,
      padding: "0 7px",
    },
    predictionsTag: {
      backgroundColor: "#ffbe2e",
      border: "2px solid #000000",
      borderRadius: 3,
      lineHeight: "20px",
      whiteSpace: "nowrap",
      marginRight: 8,
      padding: "0 7px",
    },
    doneTag: {
      backgroundColor: "#7cea70",
      borderRadius: "50%",
      lineHeight: "20px",
      whiteSpace: "nowrap",
      marginRight: 8,
      marginLeft: 8,
    },
    repeatedTag: {
      backgroundColor: "#70eac1",
      border: "2px solid #000000",
      borderRadius: 3,
      lineHeight: "20px",
      whiteSpace: "nowrap",
      marginRight: 8,
      padding: "0 7px",
      marginLeft: 8,
    },
    tabWrapper: {
      margin: "20px 15px 15px 15px",
      border: "2px solid #000000",
      borderRadius: 10,
      width: "fit-content",
    },
    tabContainer: {
      display: "flex",
      alignItems: "center",
    },
    tabValue: {
      fontSize: 18,
      fontWeight: 600,
      margin: "0 15px",
      padding: "2px 0",
      cursor: "pointer",
      "&:hover": {
        color: "#70eac1",
      },
      "&:focus": {
        color: "#70eac1",
      },
    },
    active: {
      color: "#70eac1",
    },
    paginationUl: {
      justifyContent: "center",
    },
    paginationRoot: {
      marginTop: 24,
    },
    subscribe: {
      textAlign: "center",
      minHeight: "100vh",
    },
    subscribeListening: {
      textAlign: "center",
      marginTop: 15,
      "& h3": {
        marginBottom: 15,
      },
    },
    subscribeButton: {
      border: "1px solid #000000",
      textTransform: "none",
      padding: 10,
      backgroundColor: "#ffbe2e",
      color: "#000000",
      fontWeight: 700,
      width: "auto",
      "&:hover": {
        border: "1px solid #000000",
        textTransform: "none",
        padding: 10,
        backgroundColor: "#ffbe2e",
        color: "#000000",
        fontWeight: 700,
        width: "auto",
      },
    },
  })
);

const banners = [banner1, banner2];

interface StateProps {
  questions: ReadonlyArray<any>;
  totalItems: any;
  examInfo: any;
  questionsRepeated: ReadonlyArray<any>;
  totalItemsRepeated: any;
  userInfo: any;
  acl: any;
}

interface DispatchProps {
  getQuestionByType: any;
  getQuestionRepeatedByType: any;
  sendEvent: any;
}

interface QuestionSidebarProps {}

type Props = QuestionSidebarProps & StateProps & DispatchProps;

const QuestionSidebar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(0);
  const [triggerPage, setTriggerPage] = React.useState<number>(0);

  // Repeated page
  const [repeatedPage, setRepeatedPage] = React.useState<number>(0);
  const [triggerRepeatedPage, setTriggerRepeatedPage] =
    React.useState<number>(0);

  // Normal page
  const [questionType, setQuestionType] = React.useState<string>("");
  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  const [questionSkill, setQuestionSkill] = React.useState<string>("");

  const questionContext = React.useContext(ExamSharedContext);

  const callback = (i: number) => {
    const index = i - page * 20 - 1;
    console.log(`call back ${index}`);
    props.sendEvent(EVENT.ON_GO_QUESTION, { gotoIndex: index });
    questionContext.onUpdateShareExamContext({
      examGroup: EXAM_GROUP.QUESTION_BANK,
      page: page,
      index: index,
      question: props.questions[index],
      questions: props.questions,
    });

    setQuestionIndex(index);
    // close sidebar
    setOpen(false);
    // setTimeout(() => this.setState({ showSidebar: false }), 1000);
  };

  const callbackRepeated = (i: number) => {
    const index = i - repeatedPage * 20 - 1;
    console.log(`call back ${index}`);
    //props.sendEvent(EVENT.ON_GO_QUESTION, { gotoIndex: index });
    questionContext.onUpdateShareExamContext({
      examGroup: EXAM_GROUP.REPEATED_QUESTION,
      page: repeatedPage,
      index: index,
      question: props.questionsRepeated[index],
      questions: props.questionsRepeated,
    });

    setQuestionIndex(index);
    // close sidebar
    setOpen(false);
    // setTimeout(() => this.setState({ showSidebar: false }), 1000);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

  // tab values
  const tabs = ["All", "Repeated"];
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (value) => {
    setTabValue(value);
    // page, size, sort, type
    const type = queryString.parse(window.location.search).type.toString();
    const total = queryString.parse(window.location.search).total.toString();

    setQuestionType(type);
    setQuestionSkill(type.split("_")[0]);

    if (value === 0) {
      props.getQuestionByType(0, total, "id,asc", type);
    } else if (value === 1 && props.acl && props.acl.subscriptionDays > 0) {
      // questionContext.onUpdateShareExamContext({
      //   examGroup: EXAM_GROUP.REPEATED_QUESTION,
      //   page: repeatedPage,
      //   questions: props.questionsRepeated,
      // });
      const total = queryString.parse(window.location.search).total.toString();
      const type = queryString.parse(window.location.search).type.toString();
      props.getQuestionRepeatedByType(0, total, "id,asc", type);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setTriggerPage(value - 1);
  };

  const handleChangeRepeated = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setTriggerRepeatedPage(value - 1);
  };

  useLayoutEffect(() => {
    setPage(triggerPage);
  }, [props.questions]);

  useLayoutEffect(() => {
    setRepeatedPage(triggerRepeatedPage);
  }, [props.questionsRepeated]);

  return (
    <div>
      {props.examInfo == null ? (
        <>
          {open || (
            <div className={classes.toggleButton2} onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </div>
          )}
          {openMenu || (
            <div className={classes.toggleButton3} onClick={handleMenuToggle}>
              <ChevronRightIcon />
            </div>
          )}
        </>
      ) : (
        ""
      )}

      <Drawer
        // className={classes.drawertemp}
        variant="temporary"
        anchor="right"
        open={open}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.contentWrapper}>
          <div className={classes.toggleButton} onClick={handleDrawerToggle}>
            <ChevronRightIcon />
          </div>
          {questionType && (
            <>
              <Grid container className={classes.shortQuestionName}>
                <Grid item xs={12}>
                  <span>{QUESTION_TYPE_FULL[questionType].code}</span>
                </Grid>
              </Grid>
              <Grid container className={classes.questionName}>
                <Grid item xs={12}>
                  <h2>{QUESTION_TYPE_FULL[questionType].name}</h2>
                </Grid>
              </Grid>
            </>
          )}

          <Grid container className={classes.tabWrapper}>
            <Grid item xs={12} className={classes.tabContainer}>
              {tabs.map((tab, i) => (
                <div
                  className={classnames({
                    [classes.tabValue]: true,
                    [classes.active]: tabValue === i,
                  })}
                  onClick={() => handleChangeTab(i)}
                >
                  {tab}
                </div>
              ))}
            </Grid>
          </Grid>
          <Grid container className={classes.noticeCard}>
            <Grid item xs={12}>
              <BannerCarousel pictures={banners} itemPerPage={1} />
            </Grid>
          </Grid>
          <Grid className={classes.questionWrapper}>
            {/* Others Questions */}
            {tabValue == 0 &&
              props.questions.length > 0 &&
              questionSkill !== "LISTENING" && (
                <>
                  <ExecutionStage
                    data={props.questions}
                    questionIndex={questionIndex}
                    size={20}
                    callback={(i) => callback(i)}
                    showPagination={
                      props.acl && props.acl.subscriptionDays > 0 ? true : false
                    }
                    showRepeated={false}
                  />
                </>
              )}

            {/* Listening Questions */}
            {tabValue == 0 &&
              props.questions.length > 0 &&
              questionSkill === "LISTENING" && (
                <>
                  {props.acl && props.acl.subscriptionDays > 0 ? (
                    <>
                      <ExecutionStage
                        data={props.questions}
                        questionIndex={questionIndex}
                        size={20}
                        callback={(i) => callback(i)}
                        showPagination={true}
                        showRepeated={false}
                      />
                    </>
                  ) : (
                    <>
                      <ExecutionStage
                        data={props.questions}
                        questionIndex={questionIndex}
                        size={20}
                        callback={(i) => callback(i)}
                        showPagination={false}
                        showRepeated={false}
                      />

                      <div className={classes.subscribeListening}>
                        <h3>Please subscribe to view more Questions</h3>
                        <Link to="/platform/user/shop" className="fit-content">
                          <Button className={classes.subscribeButton}>
                            Go to Magic Shop
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </>
              )}

            {/* Repeated Question */}
            {props.acl && props.acl.subscriptionDays > 0 ? (
              <>
                {tabValue == 1 && props.questionsRepeated.length > 0 && (
                  <>
                    <ExecutionStage
                      data={props.questionsRepeated}
                      questionIndex={questionIndex}
                      size={20}
                      callback={(i) => callback(i)}
                      showPagination={true}
                      showRepeated={true}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {tabValue == 1 && (
                  <div className={classes.subscribe}>
                    <h3>Please subscribe to view the Repeated Questions</h3>
                    <Link to="/platform/user/shop" className="fit-content">
                      <Button className={classes.subscribeButton}>
                        Go to Magic Shop
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </Grid>
        </div>
      </Drawer>
      <PteSidebarMobile
        open={openMenu}
        onClose={handleMenuToggle}
        onToggle={handleMenuToggle}
      />
    </div>
  );
};

const mapStateToProps = ({
  question,
  store,
  exam,
  authentication,
  acl,
}: IRootState) => {
  return {
    questions: question.questions,
    totalItems: question.totalItems,
    event: store.event,
    examInfo: exam.examInfo,
    questionsRepeated: question.questionsRepeated,
    totalItemsRepeated: question.totalItemsRepeated,
    userInfo: authentication.user,
    acl: acl.acl,
  };
};

const mapDispatchToProps = {
  getQuestionByType,
  getQuestionRepeatedByType,
  sendEvent,
};

export default connect<StateProps, DispatchProps, QuestionSidebarProps>(
  mapStateToProps,
  mapDispatchToProps
)(QuestionSidebar);

const ExecutionStage = ({
  data,
  size,
  questionIndex,
  callback,
  showPagination,
  showRepeated,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [doneQuestion, setDoneQuestion] = useState([]);

  useEffect(() => {
    const p = (page - 1) * size;
    const s = page * size;
    const filterData = data.filter((element, index) => index >= p && index < s);
    setQuestions(filterData);
  }, [data, page]);

  useEffect(() => {
    const type = queryString.parse(window.location.search).type.toString();
    let disposed = false;

    (async () =>{
      let data = await getQuestionCountInfoByType(type);
      if(disposed) return;
      let dataArray = data[0].questionIds.split(",");
      setDoneQuestion(dataArray);
    })();

    return () => {disposed = true}
  }, [])

  const handleChange = (event, page) => {
    setPage(page);
  };

  return (
    <>
      <Grid>
        {questions.map((question, i) => {
          const index = (page - 1) * size + i + 1;
          return (
            <Grid
              key={i}
              className={
                questionIndex + 1 == index
                  ? `${classes.questionDetails} ${classes.questionHightLight}`
                  : classes.questionDetails
              }
              onClick={() => callback(index)}
            >
              <Grid sm={11} className={classes.wrapUp}>
                <Grid style={{ paddingRight: "12px" }}>#{index}</Grid>
                <Grid className={classes.tagWrapper}>
                  {QUESTION_TYPE_FULL[question.type].name}
                  {showRepeated && question.repeated && (
                    <Grid className={classes.repeatedTag}>Repeated</Grid>
                  )}
                  
                </Grid>
              </Grid>
              {doneQuestion.includes(question.id.toString()) ? (
                  <>
                    <Grid className={classes.doneTag}> 
                      {/*Green little tick*/}
                      <CheckCircleOutlineIcon />
                    </Grid>
                  </>
                ) : (
                  <>
                  </>
                )}
              
            </Grid>
          );
        })}
      </Grid>
      {showPagination && (
        <Pagination
          count={Math.ceil((data || []).length / size)}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          classes={{
            ul: classes.paginationUl,
            root: classes.paginationRoot,
          }}
        />
      )}
    </>
  );
};