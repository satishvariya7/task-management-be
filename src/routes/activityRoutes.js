const express = require("express");
const ENDPOINTS = require("./apiEndpoints");
const router = express.Router();
const controller = require("../controller/activityController");
const jwtVerification = require("../middleware/jwtVerification");

router.get(ENDPOINTS.GET_ACTIVITY, jwtVerification,controller.getAllActivities);

module.exports = router;
