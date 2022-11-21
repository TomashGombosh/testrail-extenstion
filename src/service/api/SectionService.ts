import api from "./api";

class SectionService {

    async createSection(data: object, projectId: string, name: string) {
        return await api.post("/section", {
            name: name, 
            projectId: projectId,
            description: name
        }, 
        {
            params: {
                information: JSON.stringify(data)
            }
        });
    }
}

export default new SectionService();