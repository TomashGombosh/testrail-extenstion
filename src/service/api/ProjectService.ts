import { API_ROUTES } from "../../constants";
import api from "./api";
import { AxiosResponse } from "axios";

class ProjectService {
  async getProjects (): Promise<AxiosResponse> {
    return await api.get(API_ROUTES.PROJECTS);
  }
}

export default new ProjectService();
