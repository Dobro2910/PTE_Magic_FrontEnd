import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Carousel from "react-elastic-carousel";
import "./video-carousel.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      "& .MuiCard-root": {
        // borderRadius: 0,
      },
    },
    videoCard: {
      border: "none !important",
      paddingRight: "15px",
      backgroundColor: "transparent"
    },
  })
);

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 200, itemsToShow: 1 },
  { width: 400, itemsToShow: 2 },
  { width: 850, itemsToShow: 4 },
];

export interface VideoPracticeCarouselProps {}

const VideoPracticeCarousel: React.FC<VideoPracticeCarouselProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Carousel
        isRTL={false}
        breakPoints={breakPoints}
        showArrows={false}
        pagination={true}
      >
        <Card className={classes.videoCard}>
          <iframe
            title="video"
            width="100%"
            height="160"
            src="https://www.youtube.com/embed/rJWbFRCT70A"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Card>
        <Card className={classes.videoCard}>
          <iframe
            title="video"
            width="100%"
            height="160"
            src="https://www.youtube.com/embed/9jmejeG8ofg"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Card>
        <Card className={classes.videoCard}>
          <iframe
            title="video"
            width="100%"
            height="160"
            src="https://www.youtube.com/embed/tFkeDhRzGh0"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Card>
        <Card className={classes.videoCard}>
          <iframe
            title="video"
            width="100%"
            height="160"
            src="https://www.youtube.com/embed/rj_leuD8k5g"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Card>
        <Card className={classes.videoCard}>
          <iframe
            title="video"
            width="100%"
            height="160"
            src="https://www.youtube.com/embed/w6kB_ZIvEtg"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Card>
        <Card className={classes.videoCard}>
          <iframe
            title="video"
            width="100%"
            height="160"
            src="https://www.youtube.com/embed/DmK7XQzs5AM"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Card>
      </Carousel>
    </div>
  );
};

export default VideoPracticeCarousel;
