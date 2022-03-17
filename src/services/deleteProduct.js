/* eslint-disable */
import { getPrivateApi } from "../api/connections";

export const deleteProducts = async id => {
  try {
    const api = await getPrivateApi();
    return await api.delete(`${process.env.REACT_APP_PRODUCT}api/v1/Product/${id}`);
  } catch (error) {
    return error;
  }
};
