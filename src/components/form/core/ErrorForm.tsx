import React from "react";
import Grid from "@mui/material/Grid";
import Form from "./Form";
import CustomButton from "../../button/Button";
export type ErrorProps = {
    errorMessage: string,
    retryFunction(): void
}

const ErrorForm = ({errorMessage, retryFunction}: ErrorProps) => {
  const errorContent =
    <Grid item>
      <span id="error">{errorMessage}</span>
    </Grid>;
  <Grid item>
    <CustomButton disabled={true} handleClick={retryFunction} text="Retry"/>
  </Grid>;

  return <Form header="Something went wrong" content={errorContent}/>;
};

export default ErrorForm;
