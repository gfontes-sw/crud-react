import { getPrivateApi } from "../api/connections";

export const saveProducts = async ({ title, price, description, image, category }) => {
  try {
    const body = {
      title,
      price,
      description,
      image,
      category,
    };
    const api = getPrivateApi();

    return await api.post("https://fakestoreapi.com/products", body);
  } catch (error) {
    const showError = error;
    console.error("Unable to save user. ", showError);
    return false;
  }
};
export default saveProducts;
