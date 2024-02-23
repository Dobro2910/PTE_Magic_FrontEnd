import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Carousel from "react-elastic-carousel";
import Button from "../CustomButton/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const iconPencilPapper = require("assets/img/icons/icon_paper_and_pencil.svg");
const iconListening = require("assets/img/icons/icon-28.svg");
const iconReading = require("assets/img/icons/icon-27.svg");
const iconSpeaking = require("assets/img/icons/icon-23.svg");
const iconPen = require("assets/img/icons/icon-20.svg");
const iconBook = require("assets/img/icons/icon_book.svg");

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
        borderRadius: "0",
      },
    },
    guideCard: {
      height: 116,
      margin: "0 15px",
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
  })
);

export interface ArrowProps {
  type: string;
  onClick: () => void;
  isEdge: boolean
}

const myArrow: React.FC<ArrowProps> = ({ type, onClick, isEdge }) => {
  return (
    <>
      {!isEdge && (
        <>
          {type === "PREV" ? (
            <div
              style={{
                position: "absolute",
                left: "0px",
                height: "116px",
                paddingTop: 30,
                zIndex: 1,
              }}
            >
              <Button
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #000",
                  paddingLeft: 15,
                }}
                justIcon
                round
                onClick={onClick}
                disabled={isEdge}
              >
                <ArrowBackIosIcon style={{ color: "#000" }} />
              </Button>
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                right: "0px",
                height: "116px",
                paddingTop: 30,
              }}
            >
              <Button
                style={{ backgroundColor: "#fff", border: "1px solid #000" }}
                justIcon
                round
                onClick={onClick}
                disabled={isEdge}
              >
                <ArrowForwardIosIcon style={{ color: "#000" }} />
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 200, itemsToShow: 2 },
  { width: 400, itemsToShow: 3 },
  { width: 900, itemsToShow: 5 },
];

const StudyGuideCarousel: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.displayFlex}>
      <Carousel
        isRTL={false}
        breakPoints={breakPoints}
        renderArrow={myArrow}
        pagination={false}
      >
        <Card className={classes.guideCard}>
          <Grid container>
            <Grid item xs={12}>
              <img src={iconPencilPapper} alt="" />
            </Grid>
            <Grid item xs={12}>
              <span>PTE Guides</span>
            </Grid>
          </Grid>
        </Card>
        <Card className={classes.guideCard}>
          <Grid container>
            <Grid item xs={12}>
              <img src={iconSpeaking} alt="" />
            </Grid>
            <Grid item xs={12}>
              <span>Speaking</span>
            </Grid>
          </Grid>
        </Card>
        <Card className={classes.guideCard}>
          <Grid container>
            <Grid item xs={12}>
              <img src={iconPen} alt="" />
            </Grid>
            <Grid item xs={12}>
              <span>Writing</span>
            </Grid>
          </Grid>
        </Card>
        <Card className={classes.guideCard}>
          <Grid container>
            <Grid item xs={12}>
              <img src={iconReading} alt="" />
            </Grid>
            <Grid item xs={12}>
              <span>Reading</span>
            </Grid>
          </Grid>
        </Card>
        <Card className={classes.guideCard}>
          <Grid container>
            <Grid item xs={12}>
              <img src={iconListening} alt="" />
            </Grid>
            <Grid item xs={12}>
              <span>Listening</span>
            </Grid>
          </Grid>
        </Card>
        <Card className={classes.guideCard}>
          <Grid container>
            <Grid item xs={12}>
              <img src={iconBook} alt="" />
            </Grid>
            <Grid item xs={12}>
              <span>Template</span>
            </Grid>
          </Grid>
        </Card>
        <Card className={classes.guideCard}>
          <Grid container>
            <Grid item xs={12}>
              <img src={iconListening} alt="" />
            </Grid>
            <Grid item xs={12}>
              <span>Listening</span>
            </Grid>
          </Grid>
        </Card>
        <Card className={classes.guideCard}>
          <Grid container>
            <Grid item xs={12}>
              <img src={iconBook} alt="" />
            </Grid>
            <Grid item xs={12}>
              <span>Template</span>
            </Grid>
          </Grid>
        </Card>
      </Carousel>
    </Grid>
  );
};

export default StudyGuideCarousel;
