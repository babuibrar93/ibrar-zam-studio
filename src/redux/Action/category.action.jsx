import axios from "axios";
import { URL, endpoints } from "../../endpoints";
import * as FormData from "form-data";

export const addCategory = (name, companyId, token) => async () => {
  const formData = new FormData();
  formData.append("name[0]", name);
  formData.append("company_id", companyId);
  try {
    const response = await axios.post(
      `${URL}${endpoints.SAVE_CATEGORY}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory =
  (method, name, companyId, id, token) => async () => {
    const formData = new FormData();
    formData.append("_method", method);
    formData.append("name[0]", name);
    formData.append("company_id", companyId);
    formData.append("id[0]", id);
    try {
      const response = await axios.post(
        `${URL}${endpoints.UPDATE_CATEGORY}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

export const getAllCategory = (id, token) => async () => {
  try {
    const response = await axios.get(
      `${URL}${endpoints.GET_ALL_CATEGORY}?company_id=${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = (method, ids, token) => async () => {
  const formData = new FormData();
  formData.append("_method", method);
  formData.append("ids[]", ids);
  try {
    const response = await axios.post(
      `${URL}${endpoints.DELETE_CATEGORY}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
