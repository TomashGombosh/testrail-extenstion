export type CreateSectionRequest = {
    name: string,
    description: string,
    projectId: number,
    teamSectionId?: number,
};

export type SectionQuery = {
    projectId: number,
    name: string,
}
