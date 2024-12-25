const db = require("../database/mongoDB");
const jwt = require("jsonwebtoken");
const removeImage = require("../middleware/removeImage");

class Controller {
  userSignup = async (req, res, next) => {
    const response = { message: "Successfully signup!" };
    try {
      const existEmail = await db.existEmail(req.body.email);
      if (existEmail) {
        response.existEmail = true;
        response.message = "Email already exist!";
        await removeImage(existEmail?.image);
      } else {
        req.body.image = req.file.filename;
        await db.addUser(req.body);
        response.success = true;
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  userLogin = async (req, res, next) => {
    const response = { message: "Credential invalid!", isLogin: false };
    try {
      const data = await db.loginUser(req.body);
      if (data) {
        response.isLogin = true;
        response.message = "Login successfully!";
        response.token = await jwt.sign(data, process.env.SECRETE_KEY, {
          expiresIn: "1 day",
        });
        response.loggedUser = data;
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  getAllUsers = async (req, res, next) => {
    const response = { message: "User list are empty!", data: [] };
    try {
      const data = await db.getAllUsers();
      if (data.length > 0) {
        response.data = data;
        response.message = "Get users successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  getUserById = async (req, res, next) => {
    const response = { message: "User not found!" };
    try {
      const data = await db.getUserWithId(req.params.id);
      if (data) {
        response.data = data;
        response.message = "Get user by id successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  updateUserById = async (req, res, next) => {
    const response = { message: "User not found!" };
    try {
      if (req.body.updated) {
        const oldData = await db.getUserForChanges(req.body);
        if (oldData) {
          removeImage(oldData?.image);
          req.body.image = req.file.filename;
        }
      }
      const data = await db.updateUserWithId(req.params.id, req.body);
      if (data) {
        response.updated = true;
        response.message = "Update user by id successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  getUserProfile = async (req, res, next) => {
    const response = { message: "User not found by provided credential!" };
    try {
      const user = await db.getUserForChanges(req.body);
      if (user) {
        delete user.password;
        response.message = "User get successfully!";
        response.data = user;
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Controller();
