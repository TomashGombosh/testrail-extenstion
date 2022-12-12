import { API_ROUTES } from "../../constants";
import { StoreUserTestRailDataRequest } from "../../types/requests";
import api from "./api";

class UserService {
  updateTestRailData = async (request: StoreUserTestRailDataRequest) => (await api.patch(`${API_ROUTES.USER}${API_ROUTES.UPDATE_TEST_RAIL}`, request));
}

export default new UserService();
