import React from "react";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import IconButton from "@mui/material/IconButton";

const autoGenerate = (onClickFunction: any,
  placement: TooltipProps["placement"],
  disabled: boolean) => ({
  endAdornment: (
    <Tooltip
      title="Generate value automatically"
      arrow
      placement={placement}
      disableHoverListener={disabled}
      disableFocusListener={disabled}
    ><IconButton onClick={onClickFunction} disabled={disabled}>
        <AutoFixHighIcon />
      </IconButton>
    </Tooltip>),
});

export default autoGenerate;
