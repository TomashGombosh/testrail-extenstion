export type CreateSectionRequest = {
    name: string,
    description: string,
    projectId: number
};

export type SectionQuery = {
    projectId: number,
    name: string,
}
