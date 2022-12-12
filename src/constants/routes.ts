type Routing = Record<string, string>;

export const PUBLIC_ROUTES: Routing = {
    LOGIN: "/login"
}

export const AUTH_ROUTES: Routing = {
    DASHBOARD: "/"
}

export const API_ROUTES: Routing = {
    LOGIN: "/token",
    USER: "/user",
    UPDATE_TEST_RAIL: "/testrail"
}