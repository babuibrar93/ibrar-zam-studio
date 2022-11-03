import axios from "axios";
import { URL, endpoints } from "../../endpoints";
import * as FormData from "form-data";

export const addTopic =
  (name, categoryId, category_input, company_id, token) => async () => {
    console.log(name, categoryId, category_input, company_id);
    const formData = new FormData();
    formData.append("name[]", name);
    formData.append("categoryId", categoryId);
    formData.append("category_input", category_input);
    formData.append("company_id", company_id);
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

export const updateTopic =
  (method, categoryId, name, id, company_id, token) => async () => {
    const formData = new FormData();
    formData.append("_method", method);
    formData.append("category_id", categoryId);
    formData.append("name[]", name);
    formData.append("id", id);
    formData.append("company_id", company_id);
    try {
      const response = await axios.post(
        `${URL}${endpoints.UPDATE_TOPIC}`,
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

export const getAllTopics = (id, token) => async () => {
  try {
    const response = await axios.get(
      `${URL}${endpoints.GET_ALL_TOPIC}?company_id=${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTopics = (method, ids, token) => async () => {
  const formData = new FormData();
  formData.append("_method", method);
  formData.append("ids[]", ids);
  try {
    const response = await axios.post(
      `${URL}${endpoints.DELETE_TOPIC}`,
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
