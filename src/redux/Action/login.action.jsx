import axios from "axios";
import { URL, endpoints } from "../../endpoints";
import * as FormData from "form-data";

export const login = (email, password) => async (dispatch) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  try {
    const response = await axios.post(`${URL}${endpoints.LOGIN}`, formData);
    // console.log(response?.data?.token);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        token: response?.data?.token,
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
