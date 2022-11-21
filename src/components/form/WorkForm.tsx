import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import { TEST_RAIL_EMAIL_ATTRIBUTE, 
    TEST_RAIL_PROJECT_IDS_ATTRIBUTE, 
    TEST_RAIL_SECTION_NAME_ATTRIBUTE, 
    TEST_RAIL_CASES_IDS_ATTRIBUTE,
    TEST_RAIL_TOKEN_ATTRIBUTE, 
    TEST_RAIL_URL, 
    TEST_RAIL_REFERENCES_ATTRIBUTE} from '../../constants';
import SectionService from '../../service/api/SectionService';
import CasesService from '../../service/api/CasesService';
import { ChromeMessage, Sender } from "../../types";
import "./Form.css";
import { IconButton } from '@mui/material';

const WorkForm = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [sectionName, setSectionName] = useState<string>("");
    const [casesIds, setCasesIds] = useState<string>("");
    const [reference, setReference] = useState<string>("");
    const [error, setError ] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>("This field is required");
    const [disabled, setDisabled] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();

    const [isSection, setSection] = useState<boolean>(true);
    const [isCases, setCases] = useState<boolean>(false);
    const [isReferences, setReferences] = useState<boolean>(false);

    useEffect(() => {
        if(localStorage.getItem(TEST_RAIL_EMAIL_ATTRIBUTE) === null 
            && localStorage.getItem(TEST_RAIL_TOKEN_ATTRIBUTE) === null) {
                navigate("/token");
        }
        if (location.pathname === "/work/references" 
            && localStorage.getItem(TEST_RAIL_CASES_IDS_ATTRIBUTE) !== null
            && localStorage.getItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE) !== null) {
            setSection(false);
            setCases(false);
            setReferences(true);
            setSectionName(`${localStorage.getItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE)}`);
            setCasesIds(`${localStorage.getItem(TEST_RAIL_CASES_IDS_ATTRIBUTE)}`);
            setReference(`${localStorage.getItem(TEST_RAIL_REFERENCES_ATTRIBUTE) !== null ? localStorage.getItem(TEST_RAIL_REFERENCES_ATTRIBUTE) : ""}`);
        } else if(location.pathname === "/work/cases" && localStorage.getItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE) !== null) {
            setSection(false);
            setCases(true);
            setReferences(false);
            setSectionName(`${localStorage.getItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE)}`);
            setCasesIds(`${localStorage.getItem(TEST_RAIL_CASES_IDS_ATTRIBUTE) === null ? "" : localStorage.getItem(TEST_RAIL_CASES_IDS_ATTRIBUTE)}`);
        } else if(localStorage.getItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE) !== null) {
            setSection(true);
            setCases(false);
            setReferences(false); 
            setSectionName(`${localStorage.getItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE)}`);
        } else {
            setSection(true);
            setCases(false);
            setReferences(false);
        }
        setLoading(false);
    }, [location.pathname, navigate, sectionName]);

    const handleClear = () => {
        if(isSection) {
            setSectionName("");
            localStorage.removeItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE);
            return;
        }
        if(isCases) {
            setCasesIds("");
            localStorage.removeItem(TEST_RAIL_CASES_IDS_ATTRIBUTE);
            return;
        }
        if(isReferences) {
            setReference("");
            localStorage.removeItem(TEST_RAIL_REFERENCES_ATTRIBUTE);
            return
        }
    }

    const clearField = () => ({
        endAdornment: (<IconButton onClick={handleClear}>
            <ClearIcon />
        </IconButton>)
    })

    const handleCasesId = (e: any) => {
        setCasesIds(e.target.value.replace(/ /g, ","));
    }

    const handleReference = (e: any) => {
        setReference(e.target.value.replace(/ /g, ","));
        localStorage.setItem(TEST_RAIL_REFERENCES_ATTRIBUTE, e.target.value.replace(/ /g, ","));
    }

    const handleGetFromTestRail = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "get_selected",
        }
        const queryInfo: chrome.tabs.QueryInfo = {
            active: true,
            currentWindow: true
        };
        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
          console.log(tabs);
          const currentTabId = tabs[0].id !== undefined ? tabs[0].id : 1;
          chrome.tabs.sendMessage(
            currentTabId,
            message,
            (response) => {
              if(response === "") {
                setError(true);
                setHelperText("No test cases selected in the testrail");
              } else {
                setCasesIds(`${casesIds},${response}`);
              }
            });
          });
      };

    const handleBack = () => {
        localStorage.removeItem(TEST_RAIL_REFERENCES_ATTRIBUTE);    
        localStorage.removeItem(TEST_RAIL_CASES_IDS_ATTRIBUTE);
        localStorage.removeItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE);
        navigate("/");
    }

    const handleNext = () => {
        setHelperText("This field is required");
        if(isSection) {
            if(sectionName === "") {
                setError(true);
                setDisabled(true);
                return;
            } else {
                localStorage.setItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE, sectionName);
                navigate("/work/cases");
            }
        }
        if(isCases) {
            if(casesIds === "") {
                setError(true);
                setDisabled(true);
                return;
            } else {
                localStorage.setItem(TEST_RAIL_CASES_IDS_ATTRIBUTE, casesIds);
                navigate("/work/references");
            }
        }
    }

    const handleSubmit = async () => { 
        setLoading(true);
        const data = {
            url: TEST_RAIL_URL,
            email: localStorage.getItem(TEST_RAIL_EMAIL_ATTRIBUTE),
            apiToken: localStorage.getItem(TEST_RAIL_TOKEN_ATTRIBUTE),
        }
        const projectId = localStorage.getItem(TEST_RAIL_PROJECT_IDS_ATTRIBUTE);
        if(projectId === null) {
            navigate("/projects");
        } else {
            const sectionResponse = await SectionService.createSection(data, projectId, sectionName);
            console.log(sectionResponse.status);
            if (sectionResponse.status === 200) {
                const sectionId = sectionResponse.data.id;
                const casesResponse = await CasesService.updateTestCases(
                    data, 
                    projectId,
                    sectionId,
                    casesIds.replaceAll(/C/g, "").split(","),
                    reference
                );
                if(casesResponse.status === 200) {
                    navigate("/");
                    localStorage.removeItem(TEST_RAIL_CASES_IDS_ATTRIBUTE);
                    localStorage.removeItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE);
                    localStorage.removeItem(TEST_RAIL_REFERENCES_ATTRIBUTE);
                }
            }
        }
    }

    return (<>
        {isLoading && <CircularProgress />}
        {!isLoading && (<Grid container direction="row" alignItems="center">
       
            <Grid item>
                <h3>Work with test cases form</h3>
            </Grid>
            {isSection && <Grid item className="work-screen-form-item">
                <TextField 
                    placeholder="New section name"
                    onChange={(e) => setSectionName(e.target.value)} 
                    value={sectionName} 
                    size="small"
                    error={error}
                    helperText={error ? "This field is required" : ""}
                    InputProps={clearField()}
                    />
            </Grid>}
            {isCases && (<>
                <Grid item className="work-screen-form-item">
                    <TextField 
                        placeholder="Cases ids" 
                        onChange={(e) => handleCasesId(e)} 
                        value={casesIds} 
                        size="small"
                        error={error}
                        helperText={error ? helperText : ""}/>
                </Grid>
                <Grid item className="work-screen-form-item">
                    <Button className="form-button" variant="contained" size="small" onClick={handleGetFromTestRail}>Get from testrail</Button>
                </Grid>
                </>)}
            {isReferences && <Grid item className="work-screen-form-item">
                <TextField placeholder="References" onChange={(e) => handleReference(e)} value={reference} size="small"/>
            </Grid>}
            <Grid item className="work-screen-form-item">
                <Grid container direction="row">
                    <Grid item>
                        <Button onClick={handleBack} className="form-button small" variant="contained">Back</Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            onClick={isReferences ? handleSubmit : handleNext} 
                            className="form-button small" 
                            variant="contained" 
                            disabled={disabled}>
                                {isReferences ? "Submit" : "Next"}
                            </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>)}
        </>
    )
}

export default WorkForm;