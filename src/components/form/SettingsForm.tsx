import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import LinkButton, { LinkButtonProps } from "../button/LinkButton";
import CircularProgress from "@mui/material/CircularProgress";
import { AUTH_ROUTES } from "../../constants";

import "./Form.css";
import Form from "./Form";

const SettingsForm = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(false);
  }, [isLoading]);

  const buttons: Array<LinkButtonProps> = [
    {
      link: `${AUTH_ROUTES.SETTINGS}${AUTH_ROUTES.PROJECTS}`,
      text: "Projects",
      disabled: false,
    },
    {
      link: `${AUTH_ROUTES.SETTINGS}${AUTH_ROUTES.TEAMS}`,
      text: "Teams",
      disabled: false,
    },
    {
      link: `${AUTH_ROUTES.SETTINGS}${AUTH_ROUTES.TOKEN}`,
      text: "Testrail data",
      disabled: false,
    },
    {
      link: AUTH_ROUTES.DASHBOARD,
      text: "Back",
      disabled: false,
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
      </>
    );
  return (
    <Form content={content} header="Main menu" />
  );
};

export default SettingsForm;
