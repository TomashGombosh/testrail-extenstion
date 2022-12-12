import UpdateTestCasesRequest from "../../models/requests/UpdateTestCasesRequest";
import api from "./api";

class CasesService {

    async updateTestCases(request: UpdateTestCasesRequest) {
        return await api.post("/cases", request);
    }
}

export default new CasesService();