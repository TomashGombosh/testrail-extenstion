import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export type LinkButtonProps = {
    text: string,
    link: string,
    disabled?: boolean
}

const LinkButton = (props: LinkButtonProps) => (
  <Button
    disabled={props.disabled}
    component={Link}
    to={props.link}
    variant="contained"
    data-testid={props.text.replaceAll(/ /g, "-").toLowerCase()}>
    {props.text}
  </Button>);

export default LinkButton;
