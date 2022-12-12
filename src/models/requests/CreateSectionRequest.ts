export default class CreateSectionRequest {
    readonly projectId: string;
    readonly name: string;
    readonly description: string;

    constructor(projectId: string, name: string, description: string) {
        this.projectId = projectId;
        this.name = name;
        this.description = description;
    }
}