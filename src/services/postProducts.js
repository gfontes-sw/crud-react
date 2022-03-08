import { getPrivateApi } from "../api/connections";

const postProducts = async ({ title, price, description, image, category }) => {
  try {
    const body = {
      title,
      price,
      description,
      image,
      category,
    };
    const api = getPrivateApi();

    return await api.post(process.env.REACT_APP_POST_PRODUCT, body);
  } catch (error) {
    const showError = error;
    console.error("Unable to save user. ", showError);
    return false;
  }
};
export default postProducts;
