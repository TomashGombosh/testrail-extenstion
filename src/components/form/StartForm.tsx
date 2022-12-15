import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LinkButton, { LinkButtonProps } from "../button/LinkButton";
import Button from "../button/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { AUTH_ROUTES, AUTH_TOKEN_ATTRIBUTE, PUBLIC_ROUTES } from "../../constants";
import Form from "./core/Form";

const StartForm = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [isLoading]);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem(AUTH_TOKEN_ATTRIBUTE);
    navigate(PUBLIC_ROUTES.LOGIN);
  };

  const buttons: Array<LinkButtonProps> = [
    {
      link: `${AUTH_ROUTES.CASES}${AUTH_ROUTES.SECTIONS}`,
      text: "Copy cases",
      disabled: false,
    },
    {
      link: `${AUTH_ROUTES.CASES}${AUTH_ROUTES.MERGE}`,
      text: "Merge cases",
      disabled: false,
    },
    {
      link: AUTH_ROUTES.SETTINGS,
      text: "Setting",
      disabled: false,
    },
    {
      link: AUTH_ROUTES.HISTORY,
      text: "History",
      disabled: true,
    },
  ];

  const content = isLoading
    ? <CircularProgress />
    : (
      <>
        {buttons.map((button: LinkButtonProps, index) => (
          <Grid item className="form-item" key={index}>
            <LinkButton link={button.link } text={button.text} disabled={button.disabled}/>
          </Grid>))}
        <Grid item className="form-item">
          <Button handleClick={handleLogout} text="Logout"/>
        </Grid>
      </>
    );
  return (
    <Form content={content} header="Main menu" />
  );
};

export default StartForm;
