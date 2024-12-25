const ENDPOINTS = {
  //User Endpoint
  ADD_USER: "/add",
  LOGIN_USER: "/login",
  GET_ALL_USERS: "/all",
  GET_USERS_BY_ID: "/:id",
  UPDATE_USERS_BY_ID: "/update/:id",
  DELETE_USERS_BY_ID: "/delete/:id",
  CHANGE_USERS_PASSWORD: "/change-password",
  GET_USER_PROFILE: "/profile",
  //Products Endpoint
  ADD_PROJECT: "/add",
  GET_ALL_PROJECT: "/all",
  GET_PROJECT_BY_ID: "/:id",
  UPDATE_PROJECT_BY_ID: "/update/:id",
  DELETE_PROJECT_BY_ID: "/delete/:id",
  //Task Endpoint
  ADD_TASK: "/add",
  GET_ALL_TASK: "/all",
  GET_MY_TASK: "/my-task/:id",
  GET_TASK_BY_ID: "/:id",
  UPDATE_TASK_BY_ID: "/update/:id",
  DELETE_TASK_BY_ID: "/delete/:id/:userId",
  //Task Endpoint
  GET_ACTIVITY: "/all",
};

module.exports = ENDPOINTS;
