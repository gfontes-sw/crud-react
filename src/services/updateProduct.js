import { getPrivateApi } from "../api/connections";

export const updateProduct = async ({ id, name, description, rate }) => {
  try {
    const body = {
      id,
      name,
      description,
      rate,
    };
    const api = getPrivateApi();

    const fd = new FormData();

    fd.append("id", body.id);
    fd.append("name", body.name);
    fd.append("description", body.description);
    fd.append("rate", body.rate);
    return await api.put(`${process.env.REACT_APP_PRODUCT}api/v1/Product/Update`, fd);
  } catch (error) {
    const showError = error;
    console.error("Unable to post product. ", showError);
    return false;
  }
};
