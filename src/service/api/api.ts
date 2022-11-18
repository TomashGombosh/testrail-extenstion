import axios from "axios";
import { TEST_RAIL_MIDDLE_WARE_URL } from "../../constants";

const instance = axios.create({
    baseURL: TEST_RAIL_MIDDLE_WARE_URL,
    headers : {
        "Content-Type" : "application/json",
    },
    timeout: 20000,
    validateStatus: function(status) {
        return status >= 200 && status < 500
    }
})

export default instance;