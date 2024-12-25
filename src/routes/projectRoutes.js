const express = require("express");
const ENDPOINTS = require("./apiEndpoints");
const router = express.Router();
const controller = require("../controller/projectController");
const jwtVerification = require("../middleware/jwtVerification");

router.post(ENDPOINTS.ADD_PROJECT, jwtVerification, controller.addProject);
router.get(
  ENDPOINTS.GET_ALL_PROJECT,
  jwtVerification,
  controller.getAllProject
);
router.get(
  ENDPOINTS.GET_PROJECT_BY_ID,
  jwtVerification,
  controller.getProjectById
);
router.put(
  ENDPOINTS.UPDATE_PROJECT_BY_ID,
  jwtVerification,
  controller.updateProjectById
);

router.delete(
  ENDPOINTS.DELETE_PROJECT_BY_ID,
  jwtVerification,
  controller.deleteProjectById
);

module.exports = router;
