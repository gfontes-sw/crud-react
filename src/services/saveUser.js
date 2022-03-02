import axios from "axios";

const saveUser = async ({ email, password }) => {
  try {
    const body = {
      email,
      password,
    };
    const response = await axios.post("https://localhost:44315/api/Account/authenticate", body);
    if (response.status === 200) {
      return response.data.data;
    }
    console.error("Unable to save order. Response Status Text", response.statusText);
    console.error("Unable to save order. Response Status Code", response.status);
    console.error("Unable to save order. Response Data ", response.data);
    return false;
  } catch (error) {
    const showError = error;

    console.error("Unable to save order. ", showError);

    return false;
  }
};
export default saveUser;
