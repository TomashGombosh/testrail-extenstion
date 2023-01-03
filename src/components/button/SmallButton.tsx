import React from "react";
import { Button } from "@mui/material";

export type ButtonProps = {
    text: string,
    handleClick(e: any): void,
    disabled?: boolean,
}

const SmallButton = (props: ButtonProps) =>
  (<Button
    style={{width: "50px", margin: "auto"}}
    onClick={props.handleClick}
    disabled={props.disabled}
    variant="contained"
    data-testid={props.text.replaceAll(/ /g, "-").toLowerCase()}>
    {props.text}
  </Button>);

export default SmallButton;
