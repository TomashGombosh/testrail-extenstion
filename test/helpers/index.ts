import { v4 } from "uuid";

export const getRandomEmail = (): string => `test${v4().replace(/-/g, "")}@mailinator.com`;
