const express = require("express");
const ENDPOINTS = require("./apiEndpoints");
const router = express.Router();
const controller = require("../controller/userController");
const jwtVerification = require("../middleware/jwtVerification");
const uploadImage = require("../middleware/uploadImage");

router.post(
  ENDPOINTS.ADD_USER,
  uploadImage.single("image"),
  controller.userSignup
);
router.post(ENDPOINTS.LOGIN_USER, controller.userLogin);
router.get(ENDPOINTS.GET_ALL_USERS, jwtVerification, controller.getAllUsers);
router.get(ENDPOINTS.GET_USERS_BY_ID, jwtVerification, controller.getUserById);

router.post(
  ENDPOINTS.GET_USER_PROFILE,
  jwtVerification,
  controller.getUserProfile
);
router.put(
  ENDPOINTS.UPDATE_USERS_BY_ID,
  jwtVerification,
  uploadImage.single("image"),
  controller.updateUserById
);

module.exports = router;
