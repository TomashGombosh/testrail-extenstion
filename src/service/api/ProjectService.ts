import api from "./api";

class ProjectService {
    async getProjects() {
        return await api.get("/projects");
    }
}

export default new ProjectService();