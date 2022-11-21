import api from "./api";

class CasesService {

    async updateTestCases(data: object, projectId: string, sectionId: string, casesIds: string[], references: string) {
        return await api.post("/cases", {
            sectionId, 
            projectId,
            casesIds,
            references
        }, 
        {
            params: {
                information: JSON.stringify(data)
            }
        });
    }
}

export default new CasesService();