import React from "react";
import CountUp from "react-countup";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Carousel from "react-elastic-carousel";
import Button from "../CustomButton/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& h3": {
        padding: "30px 0px 20px",
      },
      "& .MuiCard-root": {
        boxShadow: "none",
        border: "1px solid #000000",
        width: "100%",
        borderRadius: "0",
      },
    },
    guideCard: {
      borderRadius: "12px !important",
      border: "2px solid white !important",
      height: 116,
      margin: "17px 15px",
      paddingTop: "10px",
      paddingLeft: "10px",
      // transition: "box-shadow 200ms ease, transform 200ms ease",
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
      "&:hover": {
        // transform: "translate(-0.75rem, -0.25rem)",
        // boxShadow: "8px 8px 0 !important",
        cursor: "pointer",
      },
    },
    displayFlex: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "row",
      height: "150px",
      backgroundColor: "#fc0",
      borderRadius: "15px",
    },
    icon: {
      position: "relative",
      top: "-10px",
      left: "5px",
    },
    cardNumber: {
      fontSize: 27,
      fontWeight: 700,
      marginTop: "10px",
      marginLeft: "11px",
      color: "black",
    },
    cardTitle: {
      fontSize: 12.5,
      color: "black",
    },
    total: {
      fontSize: 20,
    },
    cardContent: {
      marginLeft: "10px",
    },
    repeatInfo: {
      color: "#2643e9",
      backgroundColor: "#eaecfb",
      textAlign: "center",
      fontSize: "56%",
      display: "inline-block",
      borderRadius: "5px",
      padding: "0.15rem 0.175rem",
      marginLeft: "90px",
    },
  })
);

export interface ArrowProps {
  type: string;
  onClick: () => void;
  isEdge: boolean;
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
                marginTop: "50px",
                left: "0px",
                height: "116px",
                paddingTop: 30,
                zIndex: 1,
                // display: "flex",
                // alignItems: "center"
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
                marginTop: "50px",
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
  { width: 200, itemsToShow: 1 },
  { width: 400, itemsToShow: 3 },
  { width: 900, itemsToShow: 5 },
];

const ReviewCarousel: React.FC<any> = () => {
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
          <Link to="/platform/user/banks/view-speaking">
            <Grid className={classes.cardTitle}>SPEAKING</Grid>
            <Grid container direction="row" className={classes.cardContent}>
              <Grid item sm={8} className={classes.cardNumber} id="speaking">
                <CountUp end={1245} />
              </Grid>
            </Grid>
            <Grid className={classes.repeatInfo}>
              REPEATED{" "}
              <span>
                {" "}
                <CountUp end={723} />{" "}
              </span>
            </Grid>
          </Link>
        </Card>

        <Card className={classes.guideCard}>
          <Link to="/platform/user/banks/view-writing">
            <Grid className={classes.cardTitle}>WRITING</Grid>
            <Grid container direction="row" className={classes.cardContent}>
              <Grid item sm={8} className={classes.cardNumber} id="writing">
                <CountUp end={341} />
              </Grid>
            </Grid>
            <Grid className={classes.repeatInfo}>
              REPEATED{" "}
              <span>
                {" "}
                <CountUp end={117} />{" "}
              </span>
            </Grid>
          </Link>
        </Card>
        <Card className={classes.guideCard}>
          <Link to="/platform/user/banks/view-reading">
            <Grid className={classes.cardTitle}>READING</Grid>
            <Grid container direction="row" className={classes.cardContent}>
              <Grid item sm={8} className={classes.cardNumber} id="reading">
                <CountUp end={452} />
              </Grid>
            </Grid>
            <Grid className={classes.repeatInfo}>
              REPEATED{" "}
              <span>
                {" "}
                <CountUp end={453} />{" "}
              </span>
            </Grid>
          </Link>
        </Card>
        <Card className={classes.guideCard}>
          <Link to="/platform/user/banks/view-listening">
            <Grid className={classes.cardTitle}>LISTENING</Grid>
            <Grid container direction="row" className={classes.cardContent}>
              <Grid item sm={8} className={classes.cardNumber} id="listening">
                <CountUp end={92} />
              </Grid>
            </Grid>
            <Grid className={classes.repeatInfo}>
              REPEATED{" "}
              <span>
                {" "}
                <CountUp end={395} />{" "}
              </span>
            </Grid>
          </Link>
        </Card>
        <Card className={classes.guideCard}>
          <Grid className={classes.cardContent}>
            <Grid className={classes.total}>Total practiced</Grid>
            <Grid container direction="row">
              <Grid item sm={7} className={classes.cardNumber}>
                <CountUp end={753} />
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Carousel>
    </Grid>
  );
};

export default ReviewCarousel;
