import { API_ROUTES } from "./../../constants/routes";
import { CreateSectionRequest } from "../../types/requests";
import api from "./api";
import { AxiosResponse } from "axios";

class SectionService {
  async createSection (request: CreateSectionRequest): Promise<AxiosResponse> {
    return await api.post(API_ROUTES.SECTIONS, request);
  }

  async getTeams (projectId: string): Promise<AxiosResponse> {
    return await api.get(`${API_ROUTES.SECTIONS}${API_ROUTES.TEAMS}?projectId=${projectId}`);
  }
}

export default new SectionService();
