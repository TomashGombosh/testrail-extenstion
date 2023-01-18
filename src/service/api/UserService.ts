import { AxiosResponse } from "axios";
import { API_ROUTES } from "../../constants";
import { ChangePasswordRequest, RegisterUserRequest, StoreUserTestRailDataRequest } from "../../types/requests";
import { MeResponse } from "../../types/response";
import api from "./api";

class UserService {
  async updateTestRailData (request: StoreUserTestRailDataRequest): Promise<AxiosResponse> {
    return await api.patch(`${API_ROUTES.USER}${API_ROUTES.ME}${API_ROUTES.UPDATE_TEST_RAIL}`, request);
  };

  async getMe (): Promise<AxiosResponse<MeResponse>> {
    return await api.get(`${API_ROUTES.USER}${API_ROUTES.ME}`);
  }

  async changePassword (request: ChangePasswordRequest): Promise<AxiosResponse> {
    return await api.put(`${API_ROUTES.USER}${API_ROUTES.ME}${API_ROUTES.CHANGE_PASSWORD}`, request);
  }

  async firstLogin (): Promise<AxiosResponse> {
    return await api.patch(`${API_ROUTES.USER}${API_ROUTES.ME}${API_ROUTES.FIRST_LOGIN}`);
  }

  async register (request: RegisterUserRequest): Promise<AxiosResponse> {
    return await api.patch(`${API_ROUTES.USER}${API_ROUTES.REGISTRATION}`, request);
  }
}

export default new UserService();
