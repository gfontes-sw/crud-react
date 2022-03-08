import { getPrivateApi } from "../api/connections";

const showProducts = async () => {
  try {
    const api = getPrivateApi();
    return await api.get("https://fakestoreapi.com/products");
  } catch (error) {
    const showError = error;
    console.error("Unable to save user. ", showError);
    return false;
  }
};
export default showProducts;
