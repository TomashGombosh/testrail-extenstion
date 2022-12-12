import axios from "axios";
import { OK, SERVER_ERROR, TEST_RAIL_MIDDLE_WARE_URL } from "../../constants";

const instance = axios.create({
  baseURL: TEST_RAIL_MIDDLE_WARE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
  validateStatus (status) {
    return status >= OK && status < SERVER_ERROR;
  },
});

export default instance;
