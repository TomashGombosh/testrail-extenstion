// API
export const TEST_RAIL_MIDDLE_WARE_URL = process.env.REACT_APP_API_URL;

// LOCAL STORAGE
export const TEST_RAIL_TOKEN_ATTRIBUTE = "apiKey";
export const TEST_RAIL_EMAIL_ATTRIBUTE = "email";
export const TEST_RAIL_PROJECT_ATTRIBUTE = "project";
export const TEST_RAIL_TEAM_SECTION = "team";
export const TEST_RAIL_SECTION_NAME_ATTRIBUTE = "sectionName";
export const TEST_RAIL_CASES_IDS_ATTRIBUTE = "casesIds";
export const TEST_RAIL_REFERENCES_ATTRIBUTE = "references";
export const STATE_ROUTE_ATTRIBUTE = "routingState";
export const AUTH_TOKEN_ATTRIBUTE = "token";

export const PASSWORD_LENGTH = 8;
export const WEAK_PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,10}$/g;

export const DEFAULT_ERROR_MESSAGE = "This field is required";

export * from "./routes";

export * from "./statusCodes";
