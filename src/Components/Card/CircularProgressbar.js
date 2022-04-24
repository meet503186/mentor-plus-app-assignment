import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularProgressbar({ value, pathColor }) {
  return (
    <CircularProgressbarWithChildren
      value={value}
      styles={buildStyles({
        strokeLinecap: "butt",
        pathColor: pathColor,
        trailColor: "transparent",
        strokeWidth: 0,
        backgroundColor: "transparent",
      })}
    >
      <div className="percentage">{value}%</div>
      <div className="booked-text"> Booked </div>
    </CircularProgressbarWithChildren>
  );
}

export default CircularProgressbar;
