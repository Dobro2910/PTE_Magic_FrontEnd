/*eslint-disable*/
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { useSpring, animated as a } from "react-spring";
// core components
import GridContainer from "../../../../components/Games/Grid/GridContainer";
import GridItem from "../../../../components/Games/Grid/GridItem";

import Card from "../../../../components/Games/Card/Card";
import CardHeader from "../../../../components/Games/Card/CardHeader";

function Card1() {
  const [flipped, set] = useState(false);
  const total = 40;
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const classes = useStyles();
  return (
    <div
      onClick={() => {
        var i = Math.floor(Math.random() * total);
        var url =
          "url(https://s3-ap-southeast-2.amazonaws.com/games-ccl/CCL-IMAGE/" +
          i +
          ".png)";
        document.getElementById("back1").style.backgroundImage = url;
        document.getElementById("front1").style.backgroundImage = url;
        // document.getElementsByClassName('front').style.backgroundImage = url;
        set((state) => !state);
      }}
    >
      <a.div
        className={classes.c}
        id="back1"
        style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
      />
      <a.div
        className={classes.c}
        id="front1"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      />
    </div>
  );
}

function Card2() {
  const [flipped, set] = useState(false);
  const total = 40;
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const classes = useStyles();
  return (
    <div
      onClick={() => {
        var i = Math.floor(Math.random() * total);
        var url =
          "url(https://s3-ap-southeast-2.amazonaws.com/games-ccl/CCL-IMAGE/" +
          i +
          ".png)";
        document.getElementById("back2").style.backgroundImage = url;
        document.getElementById("front2").style.backgroundImage = url;
        // document.getElementsByClassName('front').style.backgroundImage = url;
        set((state) => !state);
      }}
    >
      <a.div
        className={classes.c}
        id="back2"
        style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
      />
      <a.div
        className={classes.c}
        id="front2"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      />
    </div>
  );
}

function Card3() {
  const [flipped, set] = useState(false);
  const total = 40;
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const classes = useStyles();
  return (
    <div
      onClick={() => {
        var i = Math.floor(Math.random() * total);
        var url =
          "url(https://s3-ap-southeast-2.amazonaws.com/games-ccl/CCL-IMAGE/" +
          i +
          ".png)";
        document.getElementById("back3").style.backgroundImage = url;
        document.getElementById("front3").style.backgroundImage = url;
        // document.getElementsByClassName('front').style.backgroundImage = url;
        set((state) => !state);
      }}
    >
      <a.div
        className={classes.c}
        id="back3"
        style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
      />
      <a.div
        className={classes.c}
        id="front3"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      />
    </div>
  );
}
function Card4() {
  const [flipped, set] = useState(false);
  const total = 40;
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const classes = useStyles();
  return (
    <div
      onClick={() => {
        var i = Math.floor(Math.random() * total);
        var url =
          "url(https://s3-ap-southeast-2.amazonaws.com/games-ccl/CCL-IMAGE/" +
          i +
          ".png)";
        document.getElementById("back4").style.backgroundImage = url;
        document.getElementById("front4").style.backgroundImage = url;
        // document.getElementsByClassName('front').style.backgroundImage = url;
        set((state) => !state);
      }}
    >
      <a.div
        className={classes.c}
        id="back4"
        style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
      />
      <a.div
        className={classes.c}
        id="front4"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      />
    </div>
  );
}

const styles = (theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  section: {
    maxWidth: "1240px",
    marginTop: 100,
  },
  bannerHead: {
    "&>div>div>div>h1": {
      fontWeight: 700,
    },
  },
  flipcardBody: {
    paddingRight: " 2.5rem !important",
    paddingBottom: "25px",
  },
  cardContainer: {
    width: "100%",
    height: "50ch",
  },
  c: {
    position: "absolute",
    maxWidth: "700px",
    maxHeight: "500px",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    willChange: "transform, opacity",
    backgroundSize: "100% 100%",
    backgroundImage:
      " url(https://s3-ap-southeast-2.amazonaws.com/games-ccl/CCL-IMAGE/0.png)",
  },
  cardCenter: {
    width: "992px",
    [theme.breakpoints.down("xs")]: {
      width: "290px",
      marginRight: "30px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "735px",
      marginRight: "30px",
    },
  },
});

const useStyles = makeStyles(styles);

function FlipCard(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  const classes = useStyles();

  return (
    <div>
      <div className={classes.main}>
        <div className={classes.container}>
          <GridContainer className={classes.section}>
            <GridItem className={classes.cardCenter}>
              <Card className={classes.cardCenter} md={12} xs={12} sm={12}>
                <CardHeader>
                  <h3>Form group in grid</h3>
                </CardHeader>
                <GridItem className={classes.flipcardBody}>
                  <GridContainer>
                    <GridItem md={6} className={classes.cardContainer}>
                      <div>
                        <Card1 />
                      </div>
                    </GridItem>
                    <GridItem md={6} className={classes.cardContainer}>
                      <div>
                        <Card2 />
                      </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={6} className={classes.cardContainer}>
                      <div>
                        <Card3 />
                      </div>
                    </GridItem>
                    <GridItem md={6} className={classes.cardContainer}>
                      <div>
                        <Card4 />
                      </div>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
