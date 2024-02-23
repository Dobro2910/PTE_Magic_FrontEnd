import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React from "react";
import DashBoardCard from "src/components/Card/DashBoard/Card";
import { makeStyles } from "@material-ui/core/styles";

const playbutton = require("../../../assets/img/icons/playbutton1.png");
const projecticon = require("../../../assets/img/icons/project-management.png");
const machineicon = require("../../../assets/img/icons/machine-learning.png");
const testicon = require("../../../assets/img/icons/test.png");

const useStyles = makeStyles({
  container: {
    marginTop: "50px",
  },
});

export default function ListDashBoardCards() {
  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={3} className={classes.container}>
      <Grid item xs={12} sm={6} md={3}>
        {/*<div className="dashboard-card">*/}
        {/*    <Card className="element-card-question">*/}
        {/*        <Grid container className="card-question-practice">*/}
        {/*            <Grid item xs={12} className="text-uppercase text-dark mb-0">*/}
        {/*                <div className="category-name-title">COMING SOON</div>*/}
        {/*                <div*/}
        {/*                    style={{*/}
        {/*                        textTransform: "none",*/}
        {/*                        display: "flex",*/}
        {/*                        flexDirection: "row",*/}
        {/*                    }}*/}
        {/*                >*/}
        {/*                    <div style={{ paddingRight: 5 }}>*/}
        {/*                        <FiberManualRecordIcon className="dot-small" />*/}
        {/*                        <FiberManualRecordIcon className="dot-small" />*/}
        {/*                        <FiberManualRecordIcon className="dot-small" />*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*            </Grid>*/}
        {/*        </Grid>*/}
        {/*    </Card>*/}
        {/*</div>*/}
        <DashBoardCard
          title={"Getting Started"}
          content={"Watch this video to take a tour our PTE online platform"}
          color="#fc0"
          marginTop="50px"
          backgroundColor="white"
          button="Watch video"
          img={playbutton}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashBoardCard
          title={"Tips & Templates"}
          content={
            "Access an all-in-one PTE study guide with essential exam strategies and templates"
          }
          color="white"
          marginTop="32px"
          backgroundColor="#fff4d2"
          button="Download"
          img={projecticon}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashBoardCard
          title={"AI Scored Exam"}
          content={
            "Experience real PTE Exam test using AI scoring features and actual exam questions"
          }
          color="white"
          marginTop="32px"
          backgroundColor="#fff4d2"
          button="Start"
          img={machineicon}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashBoardCard
          title={"Prediction Questions"}
          content={
            "Download a PDF file with the latest exam questions collected by PTE aspirants from the actual tests"
          }
          color="white"
          marginTop="13px"
          backgroundColor="#fff4d2"
          button="Download"
          img={testicon}
        />
      </Grid>
    </Grid>
  );
}
