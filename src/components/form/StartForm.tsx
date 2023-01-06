import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LinkButton, { LinkButtonProps } from "../button/LinkButton";
import Button from "../button/Button";
import { AUTH_ROUTES, AUTH_TOKEN_ATTRIBUTE, PUBLIC_ROUTES } from "../../constants";
import Form from "./core/Form";
import Loader from "../loader/Loader";
import { STATE_ROUTE_ATTRIBUTE } from "../../constants/index";
import UserService from "../../service/api/UserService";

const StartForm = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTheLoginAndRouteState = async () => {
      const response = await UserService.getMe();
      if (response.data.isFirstLogin) {
        navigate(AUTH_ROUTES.CHANGE_PASSWORD);
      }
      const route = localStorage.getItem(STATE_ROUTE_ATTRIBUTE);
      if (route !== null) {
        navigate(route);
      }
      setLoading(false);
    };

    checkTheLoginAndRouteState();
  }, []);

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
    ? <Loader />
    : (
      <>
        {buttons.map((button: LinkButtonProps, index) => (
          <Grid item className="form-item" key={index}>
            <LinkButton link={button.link} text={button.text} disabled={button.disabled}/>
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
