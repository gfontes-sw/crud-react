import axios from "axios";

const privateApi = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 16000,
});

privateApi.interceptors.request.use(async config => {
  const token = await localStorage.getItem("token");
  // eslint-disable-next-line no-param-reassign
  config.headers.common.Authorization = token;
  return config;
});

export const getPrivateApi = () => {
  return privateApi;
};
/* 
const privateFormDataApi = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 16000,
});

privateFormDataApi.interceptors.request.use(async config => {
  const token = await localStorage.getItem("token");
  // eslint-disable-next-line no-param-reassign
  config.headers.common.Authorization = token;
  return config;
});

export const getPrivateFormDataApi = () => {
  return privateFormDataApi;
};
 */
