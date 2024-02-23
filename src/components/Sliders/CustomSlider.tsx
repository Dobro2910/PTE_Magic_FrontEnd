import React from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export interface CustomSliderProps {
  name: string;
  onChange: (...args: any) => void;
  step: number;
  min: number;
  max: number;
  value: number;
  valueText: (value: number) => string;
  marks?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "#3880ff",
      height: 2,
      padding: "15px 0",
      width: "85%",
      marginTop: "35px"
    },
    thumb: {
      height: 20,
      width: 20,
      backgroundColor: "#000",
      marginTop: -10,
      marginLeft: -10,
    },
    active: {},
    valueLabel: {
      left: "calc(-75% + 5px)",
      top: -36,
      textAlign: "center",
      "& span": {
        transform: "none",
        borderRadius: 5,
        width: 42,
        height: 42,
        backgroundColor: `#fff !important`,
        border: "1px solid #000",
        "& span": {
          transform: "none",
          color: "#000 !important",
          fontWeight: 500,
          fontSize: 14,
          display: "flex",
          width: "42px !important",
          alignItems: "center",
          border: "none !important",
          height: "40px",
        },
      },
    },
    valueLabelTest: {
      left: "calc(-75% + 5px)",
      top: -36,
      textAlign: "center",
      "& span": {
        transform: "none",
        borderRadius: 5,
        width: 42,
        height: 42,
        border: "1px solid #000",
        "& span": {
          transform: "none",
          color: "#fff !important",
          fontWeight: 500,
          fontSize: 14,
          display: "flex",
          width: "42px !important",
          alignItems: "center",
          border: "none !important",
          height: "40px",
        },
      },
    },
    track: {
      height: 2,
    },
    rail: {
      height: 2,
      opacity: "unset !important",
      backgroundColor: "#8A2BE2",
    },
    mark: {
      backgroundColor: "#bfbfbf",
      height: 8,
      width: 1,
      marginTop: -3,
    },
    markActive: {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  })
);

const CustomSlider: React.FC<CustomSliderProps> = (props) => {
  const classes = useStyles();
  return (
    <Slider
      classes={{
        root: classes.root,
        thumb: classes.thumb,
        active: classes.active,
        valueLabel:
          props.name === "days" ? classes.valueLabel : classes.valueLabelTest,
        track: classes.track,
        rail: classes.rail,
        mark: classes.mark,
        markActive: classes.markActive,
      }}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
      getAriaValueText={props.valueText}
      valueLabelFormat={props.valueText}
      aria-label="Always visible"
      step={props.step}
      marks={props.marks}
      min={props.min}
      max={props.max}
      valueLabelDisplay="on"
    />
  );
};

export default CustomSlider;
