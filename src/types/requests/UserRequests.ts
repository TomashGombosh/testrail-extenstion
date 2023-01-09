export type StoreUserTestRailDataRequest = {
    url: string;
    apiKey: string;
}

export type ChangePasswordRequest = {
    oldPassword: string,
    newPassword: string,
}

export type RegisterUserRequest = {
    email: string,
    apiKey: string
}
