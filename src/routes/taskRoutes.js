const express = require("express");
const ENDPOINTS = require("./apiEndpoints");
const router = express.Router();
const controller = require("../controller/taskController");
const jwtVerification = require("../middleware/jwtVerification");

router.post(ENDPOINTS.ADD_TASK, jwtVerification, controller.addTask);
router.get(ENDPOINTS.GET_ALL_TASK, jwtVerification, controller.getAllTask);
router.get(ENDPOINTS.GET_MY_TASK, jwtVerification, controller.getMyTask);
router.get(ENDPOINTS.GET_TASK_BY_ID, jwtVerification, controller.getTaskById);
router.put(
  ENDPOINTS.UPDATE_TASK_BY_ID,
  jwtVerification,
  controller.updateTaskById
);
router.delete(
  ENDPOINTS.DELETE_TASK_BY_ID,
  jwtVerification,
  controller.deleteTaskById
);

module.exports = router;
