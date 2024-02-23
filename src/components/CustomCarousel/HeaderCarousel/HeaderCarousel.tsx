import React, { useRef } from "react";
import Carousel from "react-elastic-carousel";

//material-ui core
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "../BannerCarousel/image-carousel.css";
import { Link } from "react-router-dom";

//gif
const girl = require("assets/img/gif/girl-optimize.gif");
const study = require("assets/img/gif/carousel_study_optimize.gif");

const blue = require("assets/img/banner/blue.png");
const navy = require("assets/img/banner/navy.jpeg");
const purple = require("assets/img/banner/purple.jpeg");

const useStyles = makeStyles(() => ({
  carouselWrapper: {
    borderRadius: 4,
    position: "relative",
  },
  carouselItem: {
    height: "120px",
    width: "100%",
    backgroundColor: "#FFFFFF",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  vehicleNoDisplay: {},
  header: {
    backgroundImage: `url(${blue})`,
    backgroundRepeat: "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    marginTop: "26px",
    maxHeight: "200px",
    height: "100%",
    ["@media (max-width:600px)"]: {
      maxHeight: "300px",
    },
  },
  headerStudy: {
    backgroundImage: `url(${navy})`,
    backgroundRepeat: "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    marginTop: "26px",
    maxHeight: "200px",
    height: "100%",
    ["@media (max-width:600px)"]: {
      maxHeight: "300px",
    },
  },
  headerSales: {
    backgroundImage: `url(${purple})`,
    backgroundRepeat: "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    marginTop: "26px",
    maxHeight: "200px",
    height: "100%",
    ["@media (max-width:600px)"]: {
      maxHeight: "300px",
    },
  },
  headerText: {
    // display: "flex",
    alignItems: "center",
    position: "relative",
    top: "14%",
    marginLeft: "50px",
    marginTop: "20px",
    ["@media (max-width:1024px)"]: {
      marginTop: "15px",
    },
    ["@media (max-width:768px)"]: {
      top: "0%",
    },
    ["@media (max-width:600px)"]: {
      margin: "15px",
      fontSize: 12,
    },
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 600,
    color: "#fc0",
    ["@media (max-width:768px)"]: {
      fontSize: 20,
    },
  },
  buttons: {
    marginTop: "10px",
    display: "flex",
    // flexDirection: "column",
    // ["@media (max-width:600px)"]: {
    //   display: "flex",
    //   // flexDirection: "column",
    // },
  },
  buttonPractise: {
    backgroundColor: "#fc0",
    color: "black",
    borderRadius: "10px",
    width: "120px",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "#fc0",
      color: "black",
    },
  },
  buttonMockTest: {
    backgroundColor: "white",
    color: "black",
    borderRadius: "10px",
    width: "110px",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  headerImg: {
    width: "45%",
    position: "relative",
    top: "-6%",
    left: "26%",
    ["@media (max-width:1024px)"]: {
      top: "-7%",
      width: "50%",
      left: "32%",
    },
    ["@media (max-width:768px)"]: {
      top: "1.2%",
      width: "60%",
    },
    ["@media (max-width:690px)"]: {
      display: "none",
    },
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  carouselStudy: {
    width: "63%",
    position: "relative",
    top: "-11%",
    ["@media (max-width:1024px)"]: {
      top: "-10%",
      width: "75%",
    },
    ["@media (max-width:768px)"]: {
      top: "-10%",
      width: "85%",
    },
    ["@media (max-width:690px)"]: {
      display: "none",
    },
  },
  carouselSales: {
    width: "63%",
    position: "relative",
    top: "-11%",
    ["@media (max-width:1024px)"]: {
      top: "-10%",
      width: "75%",
    },
    ["@media (max-width:768px)"]: {
      top: "-10%",
      width: "85%",
    },
    ["@media (max-width:690px)"]: {
      display: "none",
    },
  },
  white: {
    color: "white",
    ["@media (max-width:768px)"]: {
      fontSize: "14px",
    },
  },
}));

const HeaderCarousel: React.FC<any> = (props) => {
  const classes = useStyles();

  const { itemPerPage, pictures } = props;

  let resetTimeout;
  const carouselRef = useRef(null);
  // const totalPages = Math.ceil(pictures.length / itemPerPage);
  return (
    <div className="carousel-wrapper">
      <Carousel
        isRTL={false}
        className={classes.carouselWrapper}
        ref={carouselRef}
        showArrows={false}
        enableAutoPlay
        autoPlaySpeed={4500}
        pagination={true}
        onNextEnd={({ index }) => {
          clearTimeout(resetTimeout);
          if (index + 1 === 3) {
            resetTimeout = setTimeout(() => {
              if (carouselRef.current != null) {
                carouselRef.current.goTo(0);
              }
            }, 4500);
          }
        }}
      >
        <Grid container direction="row" className={classes.header}>
          <Grid item sm={5} className={classes.headerText}>
            <Grid container direction="column">
              <Grid item className={classes.welcomeText}>
                Hello, there !
              </Grid>
              <Grid item className={classes.white}>
                The secret to getting ahead is getting started!
              </Grid>
              <Grid item className={classes.white}>
                What do you want to do today ?
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.buttons}
                >
                  <Grid item>
                    <Link to="/platform/user/banks/view-speaking">
                      <Button href={"#"} className={classes.buttonPractise}>Practice</Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/platform/user/mock_test/list">
                      <Button className={classes.buttonMockTest}>
                        Mock Test
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} className={classes.center}>
            <Grid>
              <img src={girl} className={classes.headerImg} alt="header" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" className={classes.headerStudy}>
          <Grid
            item
            sm={5}
            className={classes.headerText}
            style={{ color: "white" }}
          >
            <Grid container direction="column">
              <Grid item className={classes.welcomeText}>
                E-learning courses
              </Grid>
              <Grid item>2-hour videocourse with tips and tricks</Grid>
              <Grid item>Templates and question bank</Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.buttons}
                >
                  <Grid item>
                    <Button href="https://ptemagicpractice.com/" className={classes.buttonMockTest}>Explore</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} className={classes.center}>
            <Grid>
              <img src={study} className={classes.carouselStudy} alt="header" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" className={classes.headerSales}>
          <Grid item sm={5} className={classes.headerText}>
            <Grid container direction="column">
              <Grid item className={classes.welcomeText}>
                Join our community
              </Grid>
              <Grid item className={classes.white}>
                Engage with other PTE aspirants
              </Grid>
              <Grid item className={classes.white}>
                Share tips and exam questions to help each other
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.buttons}
                >
                  <Grid item>
                    <Button href="https://m.facebook.com/groups/774585652732873?group_view_referrer=search" className={classes.buttonPractise}>
                      Discover
                    </Button>
                  </Grid>
                  {/* <Grid item>
                    <Link to="/platform/user/shop">
                      <Button className={classes.buttonMockTest}>
                        Purchased
                      </Button>
                    </Link>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} className={classes.center}>
            <Grid>
              <img src={study} className={classes.carouselSales} alt="header" />
            </Grid>
          </Grid>
        </Grid>
      </Carousel>
    </div>
  );
};

export default HeaderCarousel;
