export type UpdateTestCasesRequest = {
    projectId: string;
    sectionId: string;
    casesIds: string[];
    references: string
}

export type MergeTestCasesRequest = {
    casesIds: string[];
}
