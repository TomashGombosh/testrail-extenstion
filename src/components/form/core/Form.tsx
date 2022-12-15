import React, { ReactNode } from "react";
import Grid from "@mui/material/Grid";

import "./Form.css";

export type FormProps = {
    header: string,
    content: ReactNode
}
const Form = (props: FormProps) => (
  <Grid container direction="row" alignItems="center">
    <Grid item className="form-title">
      <h2>{props.header}</h2>
    </Grid>
    <Grid item style={{width: "250px"}}>
      <Grid container
        className="form-content"
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {props.content}
      </Grid>
    </Grid>
  </Grid>
);

export default Form;
