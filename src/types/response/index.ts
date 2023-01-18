export type MergeResult = {
    copyId: string,
    originalId: string,
    status: string,
}

export type MeResponse = {
    id: string,
    email: string,
    isFirstLogin: boolean,
    isHasTestRailToken: boolean,
    isHasTestRailUrl: boolean,
    history: History[],
    events: Event[],
}

export type History = {
    id: string,
    message: string,
    createdDate: string,
}

export type Event = {
    id: string,
    type: any,
    message: string,
    userId: string,
    createdDate: string,
}
