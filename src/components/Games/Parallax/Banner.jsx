import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import styles from "assets/jss/components/games/parallaxStyle.js";

import bg from "assets/img/games/banner_bg.png"
import GridContainer from "../../Games/Grid/GridContainer";
import GridItem from "../../Games/Grid/GridItem";

const style = {
  ...styles,

}

const useStyles = makeStyles(style);

export default function Banner(props) {
  let windowScrollTop = 0;
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  // React.useEffect(() => {
  //   if (window.innerWidth >= 768) {
  //     window.addEventListener("scroll", resetTransform);
  //   }
  //   return function cleanup() {
  //     if (window.innerWidth >= 768) {
  //       window.removeEventListener("scroll", resetTransform);
  //     }
  //   };
  // });
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };
  const { filter, className, children, style, image, small, title, subtitle } = props;
  const classes = useStyles();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes[filter + "Color"]]: filter !== undefined,
    [classes.small]: small,
    [className]: className !== undefined,
  });
  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        background: `url(${bg}), linear-gradient(-90deg, #eeee22 0%, #0a0a0a 100%)`,
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        transform: transform
      }}
    >
      {/* {children} */}
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem
            // md={8}
            // sm={8}
            md={12}
            sm={12}
            className={classNames(
              classes.mrAuto,
              classes.textCenter
            )}
          >
            <h1 className={classes.bigHead}>{title}</h1>
            <h4 className={classes.bigHead}>
              {subtitle}
            </h4>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

Banner.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.oneOf([
    "primary",
    "rose",
    "dark",
    "info",
    "success",
    "warning",
    "danger"
  ]),
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
};
