import React from "react";
import Grid from "@material-ui/core/Grid";

export interface ExamDescriptionProps {
  overview: React.ReactNode;
  details: React.ReactNode;
  decoration: React.ReactNode;
}

const ExamDescription: React.FC<ExamDescriptionProps> = (
  props
) => {
  return (
    <Grid container spacing={4} className="questions-description-container">
      <Grid item xs={4}>
        {props.decoration}
      </Grid>
      <Grid item xs={4}>
        {props.overview}
      </Grid>
      <Grid item xs={4}>
        {props.details}
      </Grid>
    </Grid>
  );
};

export default ExamDescription;
