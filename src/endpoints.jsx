export const production = "https://safetydevapis.safetytracker.be/public/api/";
export const development = "https://safetydevapis.safetytracker.be/public/api/";
export const URL =
  process.env.NODE_ENV === "development" ? development : production;

export const endpoints = {
  //Auth
  LOGIN: "login",

  // Category Endpoints
  SAVE_CATEGORY: "management/competence-setting/category/add",
  UPDATE_CATEGORY: "management/competence-setting/category/update",
  DELETE_CATEGORY: "management/competence-setting/category/delete",
  GET_ALL_CATEGORY: "management/competence-setting/category/show",

  // Topic Endpoints
  SAVE_TOPIC: "management/competence-setting/topic/add",
  UPDATE_TOPIC: "management/competence-setting/topic/update",
  DELETE_TOPIC: "management/competence-setting/topic/delete",
  GET_ALL_TOPIC: "management/competence-setting/topic/get",
};
