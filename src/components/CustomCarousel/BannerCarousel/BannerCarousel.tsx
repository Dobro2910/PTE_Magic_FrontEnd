import React, { useRef } from "react";
import Carousel from "react-elastic-carousel";
import { makeStyles } from "@material-ui/core/styles";
import "./image-carousel.css";

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
  vehicleNoDisplay: {}
}));

const ImageCarousel: React.FC<any> = (props) => {
  const classes = useStyles();

  const { itemPerPage, pictures } = props;

  let resetTimeout;
  const carouselRef = useRef(null);
  const totalPages = Math.ceil(pictures.length / itemPerPage);
  return (
    <div className="carousel-wrapper">
      <Carousel
        isRTL={false}
        className={classes.carouselWrapper}
        ref={carouselRef}
        showArrows={false}
        enableAutoPlay
        pagination={true}
        /** Infinite Loop for Carousel */
        onNextEnd={({ index }) => {
          clearTimeout(resetTimeout);
          if (index + 1 === totalPages) {
            resetTimeout = setTimeout(() => {
                if (carouselRef.current != null){
                    carouselRef.current.goTo(0);
                }
            }, 1500);
          }
        }}
      >
        {pictures && pictures.length > 0 ? (
          pictures.map((url, index) => (
            <div
              style={{ backgroundImage: `url(${url})` }}
              className={classes.carouselItem}
              key={index}
            ></div>
          ))
        ) : (
          <div className={classes.vehicleNoDisplay}>No Image Display</div>
        )}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
