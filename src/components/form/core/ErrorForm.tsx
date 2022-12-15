import React from "react";
import Grid from "@mui/material/Grid";
import Form from "./Form";
export type ErrorProps = {
    errorMessage: string
}

const ErrorForm = (props: ErrorProps) => {
  const errorContent =
    <Grid item>
      <span id="error">{props.errorMessage}</span>
    </Grid>;

  return <Form header="Something went woring" content={errorContent}/>;
};

export default ErrorForm;
