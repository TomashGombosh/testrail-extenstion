import { API_ROUTES } from "../../constants";
import api from "./api";

class ProjectService {
  async getProjects () {
    return await api.get(API_ROUTES.PROJECTS);
  }
}

export default new ProjectService();
