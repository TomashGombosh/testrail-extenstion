type Routing = Record<string, string>;

export const PUBLIC_ROUTES: Routing = {
  LOGIN: "/login",
};

export const AUTH_ROUTES: Routing = {
  DASHBOARD: "/",
  CHANGE_PASSWORD: "/change-password",
  CASES: "/cases",
  SECTIONS: "/section",
  COPY: "/copy",
  MERGE: "/merge",
  REFERENCES: "/references",
  SETTINGS: "/settings",
  PROJECTS: "/projects",
  TEAMS: "/teams",
  TOKEN: "/token",
  HISTORY: "/history",
};

export const API_ROUTES: Routing = {
  LOGIN: "/login",
  USER: "/users",
  ME: "/me",
  UPDATE_TEST_RAIL: "/testrail",
  CHANGE_PASSWORD: "/change-password",
  FIRST_LOGIN: "/first-login",
  PROJECTS: "/projects",
  SECTIONS: "/sections",
  TEAMS: "/teams",
  CASES: "/cases",
  COPY: "/copy",
  MERGE: "/merge",
};
