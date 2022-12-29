import React from "react";
import { Button } from "@mui/material";

export type ButtonProps = {
    text: string,
    handleClick(e: any): void,
    disabled?: boolean,
}

const CustomButton = (props: ButtonProps) =>
  (<Button
    onClick={props.handleClick}
    disabled={props.disabled}
    variant="contained"
    data-testid={props.text.toLowerCase().replace(" ", "-")}>
    {props.text}
  </Button>);

export default CustomButton;
