import React, { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Form from "./core/Form";
import SmallButton from "../button/SmallButton";

export type ConfirmFormProps = {
    header: string,
    confirmationContent: ReactNode,
    confirmFunction: any,
    backFunction: any,
}

const ConfirmForm = ({header, confirmationContent, confirmFunction, backFunction}: ConfirmFormProps) => {
  const content = <>
    <Grid item className="form-item">
      {confirmationContent}
    </Grid>
    <Grid item className="form-item" style={{width: "100%"}} id="buttons">
      <SmallButton handleClick={backFunction} text="Back"/>
      <SmallButton handleClick={confirmFunction} text="Confirm"/>
    </Grid>
  </>;

  return <Form header={header} content={content}/>;
};

export default ConfirmForm;
