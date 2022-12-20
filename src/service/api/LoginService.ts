import { API_ROUTES } from "../../constants";
import { LoginRequest } from "../../types/requests/LoginRequest";
import api from "./api";
import { AxiosResponse } from "axios";

class LoginService {
  async login (request: LoginRequest): Promise<AxiosResponse> {
    return await api.post(API_ROUTES.LOGIN, request);
  }
}

export default new LoginService();
