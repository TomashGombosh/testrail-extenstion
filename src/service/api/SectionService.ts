import { API_ROUTES } from "./../../constants/routes";
import { CreateSectionRequest } from "../../types/requests";
import api from "./api";

class SectionService {
  async createSection (request: CreateSectionRequest) {
    return await api.post(API_ROUTES.SECTIONS, request);
  }

  async getTeams (projectId: string) {
    return await api.get(`${API_ROUTES.SECTIONS}${API_ROUTES.TEAMS}?projectId=${projectId}`);
  }
}

export default new SectionService();
