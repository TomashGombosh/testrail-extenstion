import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Button from "../../button/SmallButton";
import UserService from "../../../service/api/UserService";
import { AUTH_ROUTES,
  PUBLIC_ROUTES,
  AUTH_TOKEN_ATTRIBUTE,
  DEFAULT_ERROR_MESSAGE,
  OK,
  WEAK_PASSWORD_REGEX } from "../../../constants";
import Loader from "../../loader/Loader";
import Form from "../core/Form";
import { PASSWORD_LENGTH } from "../../../constants/index";
import { ChangePasswordRequest } from "../../../types/requests";

const ChagePasswordForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isShowOldPassword, setShowOldPassowrd] = useState<boolean>(false);
  const [isShowNewPassword, setShowNewPassowrd] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string|undefined>(undefined);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [newPasswordErrorText, setNewPasswordErrorText] = useState<string|undefined>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState<string|undefined>(undefined);
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    if (oldPassword) {
      const request: ChangePasswordRequest = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      try {
        const changePasswordResponse = await UserService.changePassword(request);
        if (changePasswordResponse.status === OK) {
          const firstLoginResponse = await UserService.firstLogin();
          if (firstLoginResponse.status === OK) {
            navigate(AUTH_ROUTES.DASHBOARD);
          }
        }
      } catch (err) {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    setLoading(true);
    localStorage.removeItem(AUTH_TOKEN_ATTRIBUTE);
    navigate(PUBLIC_ROUTES.LOGIN);
  };

  const handleNewPassword = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length < PASSWORD_LENGTH) {
      setNewPasswordError(true);
      setNewPasswordErrorText("New password shoud have 8 symbols");
    }
    if (value.match(WEAK_PASSWORD_REGEX) === null) {
      setNewPasswordError(true);
      setNewPasswordErrorText("Password too easy. Please use uppercase, lowercase and numbers");
    } else {
      setNewPasswordError(false);
      setNewPasswordErrorText(undefined);
    }
    setNewPassword(value);
  };

  const handleConfirmPassword = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value !== newPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText("Password is not the same");
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorText(undefined);
    }
    setConfirmPassword(value);
  };

  const showPassword = (onClickFunction: any,
    isShowIcon: boolean,
    disabled: boolean) => ({
    endAdornment: (
      <Tooltip
        title="Show password"
        arrow
        placement="top-end"
        disableHoverListener={disabled}
        disableFocusListener={disabled}
      ><IconButton onClick={onClickFunction} disabled={disabled}>
          {isShowIcon ? (<VisibilityIcon />) : (<VisibilityOffIcon/>)}
        </IconButton>
      </Tooltip>),
  });

  const fields = [
    {
      element: (<TextField
        type={isShowOldPassword ? "text" : "password"}
        placeholder="Old password"
        onChange={(e) => setOldPassword(e.target.value)}
        value={oldPassword}
        error={oldPassword === ""}
        helperText={oldPassword === "" ? DEFAULT_ERROR_MESSAGE : undefined}
        size="small"
        InputProps={showPassword(() => setShowOldPassowrd(!isShowOldPassword), isShowOldPassword, false)}
        data-testid="old-password"/>),
    },
    {
      element: (<TextField
        type={isShowNewPassword ? "text" : "password"}
        placeholder="New password"
        onChange={(e) => handleNewPassword(e)}
        value={newPassword}
        error={newPasswordError}
        helperText={newPasswordError ? newPasswordErrorText : undefined }
        disabled={oldPassword === undefined || oldPassword === ""}
        size="small"
        InputProps={showPassword(
          () => setShowNewPassowrd(!isShowNewPassword),
          isShowNewPassword,
          oldPassword === undefined || oldPassword === "")}
        data-testid="new-password"/>),
    },
    {
      element: (<TextField
        type={isShowNewPassword ? "text" : "password"}
        placeholder="Confirm new password"
        onChange={(e) => handleConfirmPassword(e)}
        value={confirmPassword}
        error={confirmPasswordError}
        helperText={confirmPasswordError ? confirmPasswordErrorText : undefined }
        disabled={newPasswordError || newPassword === ""}
        size="small"
        InputProps={showPassword(
          () => setShowNewPassowrd(!isShowNewPassword),
          isShowNewPassword,
          newPasswordError || newPassword === "")}
        data-testid="confirm-password"/>),
    },
  ];

  const content = isLoading
    ? <Loader />
    : (<>{fields.map((el, index) => (
      <Grid item key={index} className="form-item">
        {el.element}
      </Grid>))}
    <Grid item className="form-item" style={{width: "100%"}} id="buttons">
      <Button handleClick={handleBack} text="Back" />
      <Button
        handleClick={handleClick}
        text="Change"
        disabled={oldPassword === "" || newPasswordError || confirmPasswordError}/>
    </Grid>
    </>);
  return (<Form header="Change your current password" content={content} />);
};

export default ChagePasswordForm;
