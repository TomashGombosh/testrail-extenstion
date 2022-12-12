import { API_ROUTES } from "../../constants";
import { LoginRequest } from "../../models/requests/LoginRequest";
import api from "./api";

class LoginService {

    async login(request: LoginRequest) {
        return await api.post(API_ROUTES.LOGIN, request);
    }
}

export default new LoginService();