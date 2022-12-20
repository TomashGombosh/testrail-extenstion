import React from "react";
import Grid from "@mui/material/Grid";
import Form from "./Form";
import CustomButton from "../../button/Button";
import LinkButton from "../../button/LinkButton";
export type ErrorProps = {
    errorMessage: string,
    retryFunction?(): void
}

const ErrorForm = ({errorMessage, retryFunction}: ErrorProps) => {
  const errorContent =
    <Grid item>
      <span id="error">{errorMessage}</span>
    </Grid>;
  <Grid item>
    <CustomButton disabled={true} handleClick={retryFunction || (() => console.log("Click"))} text="Retry"/>
  </Grid>;
  <Grid item>
    <LinkButton link="/" text="Back"/>
  </Grid>;

  return <Form header="Something went wrong" content={errorContent}/>;
};

export default ErrorForm;
