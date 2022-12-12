export default class UpdateTestCasesRequest {
    readonly projectId: string;
    readonly sectionId: string;
    readonly casesIds: string[];
    readonly references: string

    constructor(projectId: string, sectionId: string, casesIds: string[], references: string) {
        this.projectId = projectId;
        this.sectionId = sectionId;
        this.casesIds = casesIds;
        this.references = references;
    }
}