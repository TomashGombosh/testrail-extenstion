import { AxiosResponse } from "axios";
import { API_ROUTES } from "../../constants";
import { MergeTestCasesRequest, UpdateTestCasesRequest } from "../../types/requests";
import api from "./api";

class CasesService {
  async copyTestCases (request: UpdateTestCasesRequest): Promise<AxiosResponse> {
    return await api.post(`${API_ROUTES.CASES}${API_ROUTES.COPY}`, request);
  }

  async mergeTestCases (request: MergeTestCasesRequest): Promise<AxiosResponse> {
    return await api.post(`${API_ROUTES.CASES}${API_ROUTES.MERGE}`, request);
  }
}

export default new CasesService();
