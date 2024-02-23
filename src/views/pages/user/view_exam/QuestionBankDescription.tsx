import React from "react";
import Grid from "@material-ui/core/Grid";

export interface QuestionBankDescriptionProps {
  overview: React.ReactNode;
  details: React.ReactNode;
  decoration: React.ReactNode;
}

const QuestionBankDescription: React.FC<QuestionBankDescriptionProps> = (
  props
) => {
  return (
    <Grid container direction="row" spacing={4} className="questions-description-container">
      <Grid item xs={12} md={4} sm={6} lg={4}>
        {props.overview}
      </Grid>
      <Grid item xs={12} md={4} sm={6} lg={4}>
        {props.details}
      </Grid>
      <Grid item xs={12} md={4} sm={12} lg={4}>
        {props.decoration}
      </Grid>
    </Grid>
  );
};

export default QuestionBankDescription;
