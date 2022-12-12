type Routing = Record<string, string>;

export const PUBLIC_ROUTES: Routing = {
  LOGIN: "/login",
};

export const AUTH_ROUTES: Routing = {
  DASHBOARD: "/",
  TOKEN: "/token",
  PROJECTS: "/projects",
  WORK: "/work",
  SECTIONS: "/sections",
  CASES: "/cases",
  REFERENCES: "/references",
};

export const API_ROUTES: Routing = {
  LOGIN: "/login",
  USER: "/users",
  ME: "/me",
  UPDATE_TEST_RAIL: "/testrail",
  PROJECTS: "/projects",
  SECTIONS: "/sections",
  CASES: "/cases",
  COPY: "/copy",
  MERGE: "/merge",
};
