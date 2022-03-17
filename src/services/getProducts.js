import { getPrivateApi } from "../api/connections";

const getProducts = async () => {
  try {
    const api = getPrivateApi();
    return await api.get(`${process.env.REACT_APP_PRODUCT}api/v1/Product`);
  } catch (error) {
    const showError = error;
    console.error("Unable to get Product. ", showError);
    return false;
  }
};
export default getProducts;
