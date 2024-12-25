const db = require("../database/mongoDB");

class Controller {
  addProject = async (req, res, next) => {
    const response = { message: "Add project Successfully!" };
    try {
      const existProject = await db.existProject(req.body.projectName);
      if (existProject) {
        response.existProject = true;
        response.message = "Project name already exist!";
      } else {
        await db.addProject(req.body);
        response.success = true;
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  getAllProject = async (req, res, next) => {
    const response = { message: "Project list are empty!", data: [] };
    try {
      const data = await db.getAllProjects();
      if (data.length > 0) {
        response.data = data;
        response.message = "Get products successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  getProjectById = async (req, res, next) => {
    const response = { message: "Project not found!" };
    try {
      const data = await db.getProjectWithId(req.params.id);
      if (data) {
        response.data = data;
        response.message = "Get project by id successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  updateProjectById = async (req, res, next) => {
    const response = { message: "Project not found!" };
    try {
      const data = await db.updateProjectWithId(req.params.id, req.body);
      if (data) {
        response.updated = true;
        response.message = "Update project by id successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  deleteProjectById = async (req, res, next) => {
    const response = { message: "Project not found!" };
    try {
      const data = await db.deleteProjectWithId(req.params.id);
      if (data) {
        response.deleted = true;
        response.message = "Delete Project by id successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Controller();
