import { getPrivateApi } from "../api/connections";

const getProducts = async () => {
  try {
    const api = getPrivateApi();
    return await api.get(process.env.REACT_APP_GET_PRODUCT);
  } catch (error) {
    const showError = error;
    console.error("Unable to save user. ", showError);
    return false;
  }
};
export default getProducts;
