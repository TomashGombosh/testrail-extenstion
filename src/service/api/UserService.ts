import { AxiosResponse } from "axios";
import { API_ROUTES } from "../../constants";
import { StoreUserTestRailDataRequest } from "../../types/requests";
import api from "./api";

class UserService {
  async updateTestRailData (request: StoreUserTestRailDataRequest): Promise<AxiosResponse> {
    return await api.patch(`${API_ROUTES.USER}${API_ROUTES.UPDATE_TEST_RAIL}`, request);
  };

  async getMe (): Promise<AxiosResponse> {
    return await api.get(`${API_ROUTES.USER}${API_ROUTES.ME}`);
  }
}

export default new UserService();
