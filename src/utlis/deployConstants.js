export const API_BASE_URL_DEV = "";

export const API_BASE_URL_STAGE = "";

export const API_BASE_URL_PROD = "";

const { REACT_APP_BUILD_ENV } = process.env;

const ENVS = {
  PROD: API_BASE_URL_PROD,
  STAGE: API_BASE_URL_STAGE,
  DEV: API_BASE_URL_DEV,
};

export const API_BASE_URL = ENVS[REACT_APP_BUILD_ENV];
