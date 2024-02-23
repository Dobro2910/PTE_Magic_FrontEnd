import React from "react";
//material-ui core
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
//core components
import BannerCarousel from "../../../../components/CustomCarousel/BannerCarousel/BannerCarousel";
import YoutubeVideo from "../../../../components/YoutubeVideo/YoutubeVideo";
import StudyGuideCarousel from "../../../../components/CustomCarousel/StudyGuideCarousel";
import HeaderCarousel from "src/components/CustomCarousel/HeaderCarousel/HeaderCarousel";
import ReviewCarousel from "../../../../components/CustomReview/ReviewCarousel";
import ListDashBoardCards from "src/components/Card/DashBoard/ListCards";
import "./rocket.css";
//icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import ShopIcon from "@material-ui/icons/Shop";
import VideoPracticeCarousel from "src/components/CustomCarousel/VideoCarousel/VideoPracticeCarousel";
const iconYoutube = require("assets/img/icons/icon_youtube.svg");
const banner1 = require("assets/img/banner/banner1.png");
const banner2 = require("assets/img/banner/banner2.png");
const academicGuide = require("assets/img/pte_icon/Group 1013.svg");
const listeningGuide = require("assets/img/pte_icon/Group 1017.svg");
const readingGuide = require("assets/img/pte_icon/Group 1015.svg");
const writingGuide = require("assets/img/pte_icon/Group 1012.svg");
const speakingGuide = require("assets/img/pte_icon/Group 1014.svg");
const studyTools = require("assets/img/pte_icon/Group 1021.svg");
const ptePrediction = require("assets/img/pte_icon/Group 1020.svg");
const man = require("assets/img/marcos.png/");
const rocket = require("assets/img/rocketlangovery.svg");
const bannerbelow = require("assets/img/bannerbelow.png");
//gif
const dog = require("assets/img/gif/dog.gif");
// const AIscore = require("assets/img/gif/AIscore.gif");
// const prediction = require("assets/img/gif/prediction.gif");
// const tips = require("assets/img/gif/tips.gif");
const AIscore = require("assets/img/ai_scored_exam.svg");
const prediction = require("assets/img/prediction_questions.svg");
const tips = require("assets/img/tips_and_templates.svg");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& h3": {
        padding: "30px 0px 20px",
      },
      "& .MuiCard-root": {
        boxShadow: "none",
        border: "2px solid #000000",
        width: "100%",
        borderRadius: "5px",
      },
    },
    banner: {
      backgroundColor: "#ffbe2e",
      height: "90px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& .MuiGrid-container": {
        alignItems: "center",
        "& .MuiGrid-grid-xs-6": {
          textAlign: "center",
          "& span": {
            fontWeight: 600,
            fontSize: "32px",
          },
        },
        "& .MuiGrid-grid-xs-3:first-child": {
          textAlign: "right",
          "& img": {
            marginRight: "50px",
            padding: "10px 0",
            maxWidth: "50px",
          },
        },
        "& .MuiGrid-grid-xs-3:last-child": {
          textAlign: "left",
          "& img": {
            marginLeft: "50px",
            padding: "10px 0",
            maxWidth: "110px",
          },
        },
      },
    },
    studyCard: {
      backgroundColor: "#ffbe2e !important",
      padding: 15,
    },
    cardBoxAnimation: {
      border: "none",
      // transition: "200ms transform",
      // "&:hover": {
      //   transform: "translate(-0.75rem, -0.25rem)",
      // },
    },
    weeklyCard: {
      backgroundColor: "#ffffff",
      height: "142px",
      padding: 5,
      // transition: "box-shadow 200ms ease,transform 200ms ease",
      // "&:hover": {
      //   transform: "translate(-0.75rem, -0.25rem)",
      //   boxShadow: "8px 8px 0 #ffedcf !important",
      // },
    },
    cardContainerLeft: {
      paddingRight: "12px",
      [theme.breakpoints.down("sm")]: {
        paddingRight: "0px !important",
      },
    },
    cardContainerRight: {
      paddingTop: "30px",
      paddingLeft: "12px",
      "& div": {
        position: "relative",
        "& img:first-child": {
          maxWidth: 500,
          width: "100%",
        },
      },
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0px !important",
      },
    },
    guideCard: {
      height: 116,
      marginRight: 10,
      "& .MuiGrid-grid-xs-12": {
        textAlign: "center",
        "& img": {
          padding: "10px 0",
          width: "100%",
          maxWidth: "84px",
          maxHeight: "84px",
        },
        "& span": {
          fontSize: "14px",
          color: "#8A2BE2",
        },
      },
    },
    displayFlex: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    displayFlexNotCenter: {
      display: "flex",
      flexDirection: "row",
    },
    displayFlexProgress: {
      padding: "7px 0px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    inspiredContainer: {
      "& .MuiGrid-grid-md-5": {
        paddingLeft: "12px !important",
        paddingRight: "12px !important",
        "& img": {
          height: "calc(100% - 20px)",
          width: "100%",
        },
      },
      "& .MuiGrid-grid-md-7": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "& img": {
          width: "100px",
          padding: "0 12px",
          [theme.breakpoints.down("xs")]: {
            maxWidth: "100px",
          },
        },
        "& div": {
          paddingLeft: "100px",
          [theme.breakpoints.down("sm")]: {
            paddingLeft: "12px !important",
          },
        },
        "& span": {
          paddingLeft: "12px",
          fontSize: "14px",
          fontWeight: 700,
          color: "black",
          // [theme.breakpoints.down("xs")]: {
          //   fontSize: "12px",
          // },
        },
      },
    },
    cardDate: {
      color: "#000",
      fontSize: "18px",
      fontWeight: 600,
    },
    cardBody: {
      paddingTop: "25px",
    },
    purpleText: {
      color: "#8A2BE2 !important",
    },
    studyMaterialContainer: {
      "& h3": {
        fontSize: "24px",
        fontWeight: 600,
        color: "#000000",
        textTransform: "capitalize",
      },
    },
    materialCard: {
      padding: 15,
      backgroundColor: "#ffedcf",
      border: "none !important",
      transition: "box-shadow 200ms ease,transform 200ms ease",
      "&:hover": {
        transform: "translate(-0.75rem, -0.25rem)",
        boxShadow: "8px 8px 0 !important",
      },
      "& .MuiGrid-container": {
        border: "3px dashed",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        height: 180,
        "& .MuiGrid-grid-xs-12": {
          padding: "0 3px",
        },
      },
      "& .MuiButton-root": {
        border: "2px solid",
        borderRadius: "0px",
        backgroundColor: "#FFFFFF",
        textTransform: "none",
        height: 30,
      },
    },
    materialTitle: {
      fontSize: "18px",
      fontWeight: 600,
    },
    materialContent: {
      fontSize: "14px",
      fontWeight: 400,
      padding: "0 15px",
    },
    knowledgeContainer: {
      "& h3": {
        fontSize: "24px",
        fontWeight: 600,
        color: "#000000",
        textTransform: "capitalize",
      },
    },
    welcomeMessage: {
      paddingTop: 25,
      "& .MuiSvgIcon-root": {
        fontSize: 70,
        marginRight: 15,
      },
      "& div": {
        display: "flex",
        flexDirection: "column",
        color: "#000",
        "& span:first-child": {
          fontSize: "28px",
          fontWeight: 600,
        },
      },
    },
    bannerBelow: {
      "& img": {
        width: "100%",
        padding: "18px 0px",
      },
    },
    textAlignLeft: {
      textAlign: "left",
    },
    textAlignRight: {
      textAlign: "right",
    },
    textAlignCenter: {
      textAlign: "center",
    },
    academicGuideImg: {
      width: "80px",
    },
    readingGuideImg: {
      width: "180px",
    },
    purpleDot: {
      borderRadius: 50,
      height: 20,
      width: 20,
      backgroundColor: "#6401E3",
    },
    studyToolImg: {
      position: "relative",
      width: "20px",
      marginLeft: 5,
    },
    youtubeTitle: {
      position: "relative",
      top: "-40px",
      left: "10px",
      ["@media (max-width:959px)"]: {
        left: "90px",
      },
      ["@media (max-width:600px)"]: {
        top: "-40px !important",
        left: "90px !important",
      },
    },
    headerImg: {
      width: 500,
      position: "relative",
      top: "-22px",
      ["@media (max-width:600px)"]: {
        width: 200,
      },
    },
    center: {
      display: "flex",
      justifyContent: "center",
    },
    header: {
      backgroundColor: "#fc0",
      borderRadius: "10px",
      marginTop: "26px",
      height: "300px",
    },
    headerText: {
      // display: "flex",
      // alignItems: "center",
      position: "relative",
      top: "24%",
      marginLeft: "50px",
    },
    welcomeText: {
      fontSize: 30,
      fontWeight: 600,
    },
    buttonPractise: {
      backgroundColor: "#ff4d4d",
      color: "white",
      borderRadius: "10px",
      width: "120px",
      fontWeight: 700,
    },
    buttonMockTest: {
      backgroundColor: "white",
      color: "black",
      borderRadius: "10px",
      width: "110px",
      fontWeight: 700,
    },
    buttons: {
      marginTop: "10px",
    },
    cardCategories: {
      marginTop: "130px",
      borderRadius: "10px",
    },
    imgCard: {
      width: 290,
      position: "relative",
      top: "-130px",
    },
    imgCardTips: {
      width: 290,
      height: 260,
      position: "relative",
      top: "-130px",
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: 600,
    },
    cardDetails: {
      marginTop: "17px",
      fontSize: 17,
      fontWeight: 300,
      height: "0px",
    },
    cardInnerText: {
      position: "relative",
      top: "-130px",
      paddingLeft: "19px",
    },
    pteTools: {
      marginTop: "80px",
      fontSize: 34,
      fontWeight: 700,
    },
    iconStyle: {
      fontSize: 70,
      color: "white",
    },
    toolsDetails: {
      display: "flex",
      alignItems: "center",
      fontSize: 16,
      fontWeight: 700,
    },
    iconTools: {
      marginTop: "10px",
    },
    iconButtonTool: {
      width: "72px",
      borderRadius: "10px",
    },
  })
);

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  })
)(LinearProgress);

const banners = [banner1, banner2];

const NewStudyCenter: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HeaderCarousel />
      <Grid>
        <ReviewCarousel />
      </Grid>

      <Grid container direction="row" spacing={4}>
        {/*<Grid item sm={4}>*/}
        {/*    <Grid*/}
        {/*        container*/}
        {/*        direction="column"*/}
        {/*        className={classes.cardCategories}*/}
        {/*        style={{backgroundColor: "#ffefcc"}}*/}
        {/*    >*/}
        {/*        <Grid item>*/}
        {/*            <img src={tips} alt="tips" className={classes.imgCardTips}/>*/}
        {/*        </Grid>*/}
        {/*        <Grid item>*/}
        {/*            <Grid container className={classes.cardInnerText}>*/}
        {/*                <Grid item className={classes.cardTitle}>*/}
        {/*                    Tips & Templates*/}
        {/*                </Grid>*/}
        {/*                <Grid item className={classes.cardDetails}>*/}
        {/*                    Access an all-in-one PTE study guide with essential exam*/}
        {/*                    strategies and templates*/}
        {/*                </Grid>*/}
        {/*            </Grid>*/}
        {/*        </Grid>*/}
        {/*    </Grid>*/}
        {/*</Grid>*/}
        {/*<Grid item sm={4}>*/}
        {/*    <Grid*/}
        {/*        container*/}
        {/*        direction="column"*/}
        {/*        className={classes.cardCategories}*/}
        {/*        style={{backgroundColor: "#ffcccc"}}*/}
        {/*    >*/}
        {/*        <Grid item>*/}
        {/*            <img src={prediction} alt="tips" className={classes.imgCard}/>*/}
        {/*        </Grid>*/}
        {/*        <Grid item>*/}
        {/*            <Grid container className={classes.cardInnerText}>*/}
        {/*                <Grid item className={classes.cardTitle}>*/}
        {/*                    AI scored exam*/}
        {/*                </Grid>*/}
        {/*                <Grid item className={classes.cardDetails}>*/}
        {/*                    Experience real PTE Exam test using AI scoring features and*/}
        {/*                    actual exam questions*/}
        {/*                </Grid>*/}
        {/*            </Grid>*/}
        {/*        </Grid>*/}
        {/*    </Grid>*/}
        {/*</Grid>*/}
        {/*<Grid item sm={4}>*/}
        {/*    <Grid*/}
        {/*        container*/}
        {/*        direction="column"*/}
        {/*        className={classes.cardCategories}*/}
        {/*        style={{backgroundColor: "#cceeff"}}*/}
        {/*    >*/}
        {/*        <Grid item>*/}
        {/*            <img src={AIscore} alt="tips" className={classes.imgCard}/>*/}
        {/*        </Grid>*/}
        {/*        <Grid item>*/}
        {/*            <Grid container className={classes.cardInnerText}>*/}
        {/*                <Grid item className={classes.cardTitle}>*/}
        {/*                    Prediction Questions*/}
        {/*                </Grid>*/}
        {/*                <Grid item className={classes.cardDetails}>*/}
        {/*                    Download a PDF file with the latest exam questions colected by*/}
        {/*                    PTE aspirants from the actual tests*/}
        {/*                </Grid>*/}
        {/*            </Grid>*/}
        {/*        </Grid>*/}
        {/*    </Grid>*/}
        {/*</Grid>*/}
        <ListDashBoardCards />
      </Grid>

      <Grid>
        <p className={classes.pteTools}>PTE Preparation tools</p>
      </Grid>
      <Grid container direction="row" spacing={3} className={classes.iconTools}>
        <Grid item sm={3}>
          <Grid container direction="row" spacing={3}>
            <Grid item sm={4}>
              <Grid
                style={{ backgroundColor: "#ffcccc" }}
                className={classes.iconButtonTool}
              >
                <AccountBoxIcon className={classes.iconStyle} />
              </Grid>
            </Grid>
            <Grid item className={classes.toolsDetails} sm={7}>
              Test Computer Compatibility
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <Grid container direction="row" spacing={3}>
            <Grid item sm={4}>
              <Grid
                style={{ backgroundColor: "#b3b3ff" }}
                className={classes.iconButtonTool}
              >
                <LibraryBooksIcon className={classes.iconStyle} />
              </Grid>
            </Grid>
            <Grid item className={classes.toolsDetails} sm={7}>
              Score Report Analysis
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <Grid container direction="row" spacing={3}>
            <Grid item sm={4}>
              <Grid
                item
                style={{ backgroundColor: "#ffcc99" }}
                className={classes.iconButtonTool}
              >
                <CropOriginalIcon className={classes.iconStyle} />
              </Grid>
            </Grid>
            <Grid item className={classes.toolsDetails} sm={7}>
              Check Speaking Pitch
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <Grid container direction="row" spacing={3}>
            <Grid item sm={4}>
              <Grid
                item
                style={{ backgroundColor: "#66ccff" }}
                className={classes.iconButtonTool}
              >
                <ShopIcon className={classes.iconStyle} />
              </Grid>
            </Grid>
            <Grid item className={classes.toolsDetails} sm={7}>
              PTE Express Videocourse
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <p className={classes.pteTools}>Features resources</p>
        <VideoPracticeCarousel />
      </Grid>

      {/* <Grid container className={classes.knowledgeContainer}>
                <Grid item xs={12}>
                    <h3>PTE KNOWLEDGE</h3>
                </Grid>
                <Grid item xs={12}>
                    <div className="practice-question-bank">
                        <div className="element-question-bank">
                            <Card
                                className="element-card-question"
                                style={{backgroundColor: "#ffbe2e"}}
                            >
                                <Grid container>
                                    <Grid item xs={12} className={classes.textAlignLeft}>
                                        <CardContent className="header-size-6">
                                            PTE ACADEMIC GUIDE
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={12} className={classes.textAlignRight}>
                                        <img
                                            className={classes.academicGuideImg}
                                            src={academicGuide}
                                            alt=""
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                        <div className="element-question-bank">
                            <Card className="element-card-question">
                                <Grid container>
                                    <Grid item xs={12} className={classes.textAlignRight}>
                                        <img
                                            src={writingGuide}
                                            alt=""
                                            className={classes.academicGuideImg}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.textAlignLeft}>
                                        <CardContent className="header-size-2">
                                            PTE WRITING GUIDE
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                        <div className="element-question-bank-has-img">
                            <Card className={`element-card-question ${classes.displayFlex}`}>
                                <Grid container>
                                    <Grid item xs={12} className={classes.textAlignCenter}>
                                        <img
                                            className={classes.academicGuideImg}
                                            src={listeningGuide}
                                            alt=""
                                            style={{
                                                height: "281px",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CardContent className="header-size-5">
                                            PTE LISTENING GUIDE
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                        <div className="element-question-bank">
                            <Card className="element-card-question">
                                <Grid container>
                                    <Grid item xs={12} className={classes.textAlignLeft}>
                                        <CardContent className="header-size-6">
                                            PTE SPEAKING GUIDE
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={12} className={classes.textAlignRight}>
                                        <img
                                            src={speakingGuide}
                                            alt=""
                                            className={classes.academicGuideImg}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                        <div className="element-question-bank-has-img">
                            <Card className="element-card-question">
                                <Grid container spacing={7}>
                                    <Grid item xs={12}>
                                        <CardContent className="header-size-5">
                                            PTE READING GUIDE
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={12} className={classes.textAlignCenter}>
                                        <img
                                            src={readingGuide}
                                            alt=""
                                            className={classes.readingGuideImg}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                        <div className="element-question-bank">
                            <Card className={`element-card-question ${classes.displayFlex}`}>
                                <CardContent className="header-size-6">
                                    PTE STUDY TOOL
                                </CardContent>
                                <div
                                    className={classes.displayFlexNotCenter}
                                    style={{
                                        position: "relative",
                                        marginRight: "20px",
                                    }}
                                >
                                    <div className={classes.purpleDot}></div>
                                    <img
                                        src={studyTools}
                                        alt=""
                                        className={classes.studyToolImg}
                                    />
                                </div>
                            </Card>
                        </div>
                        <div className="element-question-bank">
                            <Card className="element-card-question">
                                <Grid container>
                                    <Grid item xs={12} className={classes.textAlignLeft}>
                                        <CardContent className="header-size-6">
                                            PTE TEST PREDICTION
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={12} className={classes.textAlignRight}>
                                        <img
                                            src={ptePrediction}
                                            alt=""
                                            className={classes.academicGuideImg}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                    </div>
                </Grid>
            </Grid> */}
    </div>
  );
};

export default NewStudyCenter;
// delete study guide
