import { getPrivateApi } from "../api/connections";

const postProducts = async ({ name, barcode, description, rate }) => {
  try {
    const body = {
      name,
      barcode,
      description,
      rate,
    };
    const api = getPrivateApi();

    const fd = new FormData();

    fd.append("name", body.name);
    fd.append("description", body.description);
    fd.append("barcode", body.barcode);
    fd.append("rate", body.rate);
    return await api.post(`${process.env.REACT_APP_PRODUCT}api/v1/Product/Create`, fd);
  } catch (error) {
    const showError = error;
    console.error("Unable to post product. ", showError);
    return false;
  }
};
export default postProducts;
