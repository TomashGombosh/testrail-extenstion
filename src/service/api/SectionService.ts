import { CreateSectionRequest } from "../../types/requests";
import api from "./api";

class SectionService {
  async createSection (request: CreateSectionRequest) {
    return await api.post("/section", request);
  }
}

export default new SectionService();
