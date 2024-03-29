import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LinkButton, { LinkButtonProps } from "../button/LinkButton";
import Button from "../button/Button";
import { AUTH_ROUTES,
  AUTH_TOKEN_ATTRIBUTE,
  IS_ADMIN_LOGGED_IN,
  PUBLIC_ROUTES,
  UNAUTHORIZED } from "../../constants";
import Form from "./core/Form";
import Loader from "../loader/Loader";
import { STATE_ROUTE_ATTRIBUTE } from "../../constants/index";
import UserService from "../../service/api/UserService";

const StartForm = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isHasTestRailToken, setHasTestrailToken] = useState<boolean>(false);
  const [isHasTestRailUrl, setHasTestrailUrl] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTheLoginAndRouteState = async () => {
      const response = await UserService.getMe();
      if (response.status === UNAUTHORIZED) {
        handleLogout();
      }
      if (response.data.isFirstLogin) {
        navigate(AUTH_ROUTES.CHANGE_PASSWORD);
      }
      const route = localStorage.getItem(STATE_ROUTE_ATTRIBUTE);
      if (route !== null) {
        navigate(route);
      }
      const isAdmin = localStorage.getItem(IS_ADMIN_LOGGED_IN);
      setIsAdminLoggedIn(isAdmin === "true");
      setHasTestrailToken(response.data.isHasTestRailToken);
      setHasTestrailUrl(response.data.isHasTestRailToken);
      setLoading(false);
    };

    checkTheLoginAndRouteState();
  }, []);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem(AUTH_TOKEN_ATTRIBUTE);
    navigate(PUBLIC_ROUTES.LOGIN);
  };

  const handleAdmin = () => {
    setLoading(true);
    navigate(AUTH_ROUTES.ADMIN);
  };

  const buttons: Array<LinkButtonProps> = [
    {
      link: `${AUTH_ROUTES.CASES}${AUTH_ROUTES.SECTIONS}`,
      text: "Copy cases",
      disabled: !isHasTestRailToken || !isHasTestRailUrl,
    },
    {
      link: `${AUTH_ROUTES.CASES}${AUTH_ROUTES.MERGE}`,
      text: "Merge cases",
      disabled: !isHasTestRailToken || !isHasTestRailUrl,
    },
    {
      link: AUTH_ROUTES.SETTINGS,
      text: "Settings",
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
        {isAdminLoggedIn && (<Grid item className="form-item">
          <Button handleClick={handleAdmin} text="Admin Section"/>
        </Grid>)}
        <Grid item className="form-item">
          <Button handleClick={handleLogout} text="Logout"/>
        </Grid>
        {(!isHasTestRailToken || !isHasTestRailUrl) && (
          <Grid item className="form-item" style={{ textAlign: "center" }}>
            <div className="text">Please, go to the setting and setup Testrail data</div>
          </Grid>
        )}
      </>
    );
  return (
    <Form content={content} header="Main menu" isAdmin={isAdminLoggedIn}/>
  );
};

export default StartForm;
