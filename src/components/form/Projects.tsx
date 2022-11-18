import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import Project from "../../types/Project";
import ProjectService from "../../service/api/ProjectService";

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const getProjects = async () => {
            const response = await ProjectService.getProjects();
            if(response.status === 200) {
                setProjects(response.data.projects);
            }
        }

        getProjects();
    }, []);

    return (<div>
        {projects.map((project) => (
            <div>
                <span>{project.id}</span>
                <span>{project.name}</span>
            </div>
        ))}
    </div>)
}

export default Projects;