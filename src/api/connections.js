import axios from "axios";

const privateApi = axios.create({
  headers: {
    "Content-Type": "application/json",
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
