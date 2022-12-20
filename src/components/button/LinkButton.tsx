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
    data-testid={props.text.toLowerCase()}
    disabled={props.disabled}
    component={Link}
    to={props.link}
    variant="contained">
    {props.text}
  </Button>);

export default LinkButton;
