import { getPrivateFormDataApi } from "../api/connections";

const postProducts = async ({ name, description, barcode, rate, image, productCategoryId }) => {
  try {
    const body = {
      name,
      description,
      barcode,
      rate,
      image,
      productCategoryId,
    };
    const api = getPrivateFormDataApi();

    const fd = new FormData();

    fd.append("name", body.name);
    fd.append("description", body.description);
    fd.append("barcode", body.barcode);
    fd.append("rate", body.rate);

    return await api.post(process.env.REACT_APP_POST_PRODUCT, fd);
  } catch (error) {
    const showError = error;
    console.error("Unable to save user. ", showError);
    return false;
  }
};
export default postProducts;
