import axios from "axios";

const saveProducts = async ({ title, price, description, image, category }) => {
  try {
    const body = {
      title,
      price,
      description,
      image,
      category,
    };
    const response = await axios.post("https://fakestoreapi.com/products", body);

    if (response.status === 200) {
      return response.data;
    }

    return false;
  } catch (error) {
    const showError = error;
    console.error("Unable to save user. ", showError);
    return false;
  }
};
export default saveProducts;
