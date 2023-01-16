import React, { useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import MergeIcon from "@mui/icons-material/Merge";
import Loader from "../../loader/Loader";
import Button from "../../button/Button";
import Form from "../core/Form";
import { AUTH_ROUTES } from "../../../constants";
import { MergeResult } from "../../../types/response";

const MergeCases = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<ReactNode>([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const result = state.map((result: MergeResult, index: number) => (
      <Tooltip
        key={index}
        title={result.status === "success" ? "Merge success" : "Merge failed"}
        arrow
        placement="top-end"
      >
        <Grid item className="form-item">
          <Grid container direction="row">
            <Grid item>{`C${result.copyId}`}</Grid>
            <Grid item style={{paddingLeft: "5px", paddingRight: "5px"}}>
              <MergeIcon color={result.status === "success" ? "success" : "error"}/>
            </Grid>
            <Grid item>{`C${result.originalId}`}</Grid>
            <Grid item style={{paddingLeft: "10px"}}>
              {result.status === "success" ? <DoneIcon color="success"/> : <CloseIcon color="error" />}
            </Grid>
          </Grid>
          <Divider/>
        </Grid>
      </Tooltip>));
    setContent(result);
    setLoading(false);
  }, []);

  const formContent = <>
    {content}
    <Grid item className="form-item" style={{ paddingTop: "15px" }}>
      <Button handleClick={() => navigate(AUTH_ROUTES.DASHBOARD)} text="Go to dashboard"/>
    </Grid>
  </>;

  return isLoading
    ? <Loader/>
    : <Form header="Cases merge result" content={formContent} />;
};

export default MergeCases;
