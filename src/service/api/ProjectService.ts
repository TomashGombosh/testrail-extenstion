import api from "./api";

class ProjectService {

    async getProjects(data: object) {
        return await api.get("/projects", {
            params: {
                information: JSON.stringify(data)
            }
        });
    }
}

export default new ProjectService();