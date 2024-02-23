/*eslint-disable*/
import React, { useState } from "react";
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-with-gesture";
// core components
import GridContainer from "../../../../components/Games/Grid/GridContainer";
import GridItem from "../../../../components/Games/Grid/GridItem";
import CardBody from "../../../../components/Games/Card/CardBody";
import CardHeader from "../../../../components/Games/Card/CardHeader";
import Button from "../../../../components/Games/CustomButtons/Button";
let k = "";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i) => ({ x: 0, y: i * -4, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function Deck(props2) {
  const cards = [
    "https://s3-ap-southeast-2.amazonaws.com/games-ccl/" + props2.set + "0.png",
    "https://s3-ap-southeast-2.amazonaws.com/games-ccl/" + props2.set + "1.png",
    "https://s3-ap-southeast-2.amazonaws.com/games-ccl/" + props2.set + "2.png",
    "https://s3-ap-southeast-2.amazonaws.com/games-ccl/" + props2.set + "3.png",
    "https://s3-ap-southeast-2.amazonaws.com/games-ccl/" + props2.set + "4.png",
    "https://s3-ap-southeast-2.amazonaws.com/games-ccl/" + props2.set + "5.png",
    "https://s3-ap-southeast-2.amazonaws.com/games-ccl/" + props2.set + "6.png",
    "https://s3-ap-southeast-2.amazonaws.com/games-ccl/" + props2.set + "7.png",
    "https://s3-ap-southeast-2.amazonaws.com/games-ccl/" + props2.set + "8.png",
    "https://s3-ap-southeast-2.amazonaws.com/games-ccl/" + props2.set + "9.png",
  ];
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(
    ({
       args: [index],
       down,
       delta: [xDelta],
       distance,
       direction: [xDir],
       velocity,
     }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return props.map(({ x, y, rot, scale }, i) => (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
    >
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          backgroundImage: `url(${cards[i]})`,
        }}
      />
    </animated.div>
  ));
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
  root2: {
    "& div": {
      position: "absolute",
      width: "100%",
      height: "100%",
      willChange: "transform",
      display: "flex",
      alignItems: "bottom",
      justifyContent: "center",
      "& div": {
        backgroundColor: "white",
        backgroundSize: "auto 85%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        width: "45vh",
        maxWidth: "300px",
        height: "85vh",
        maxHeight: " 570px",
        willChange: "transform",
        borderRadius: "10px",
        boxShadow:
          "0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)",
        [theme.breakpoints.down("xs")]: {
          backgroundColor: "white",
          backgroundSize: "auto 85%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          width: "38vh",
          maxWidth: "300px",
          height: "70vh",
          maxHeight: " 570px",
          willChange: "transform",
          borderRadius: "10px",
          boxShadow:
            "0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)",
        },
      },
    },
  },
});

const useStyles = makeStyles(styles);

function ShuffleCard() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  const [set, setSet] = useState(0);
  const [sets, setSets] = useState(2);
  const classes = useStyles();

  return (
    <div>
      <div className={classes.main}>
        <div className={classes.container}>
          <GridContainer className={classes.section}>
            <GridItem className={classes.cardCenter}>
              <CardHeader>
                <Button  round color="gold" onClick={() => setSet(set < sets ? set + 1 : 0)}>
                  New Set
                </Button>
              </CardHeader>
              <CardBody>
                <GridItem>
                  <GridItem md={12}>
                    <div style={{ height: "500px" }}>
                      <div className={classes.root2}>
                        <Deck set={set} />
                      </div>
                    </div>
                  </GridItem>
                </GridItem>
              </CardBody>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default ShuffleCard;
