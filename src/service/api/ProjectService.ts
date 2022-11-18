import api from "./api";

const data = {
    url: "https://idealscorp.testrail.io",
    email: "tomash.gombosh@idealscorp.com",
    apiToken: "bZMH02rV4zNPn4JggPO1-CIxBeuPr0e6G0Syjz5N/",
}
class ProjectService {
    async getProjects() {
        return await api.get("/projects", {
            params: {
                information: JSON.stringify(data)
            }
        });
    }
}

export default new ProjectService();