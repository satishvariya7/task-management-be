const db = require("../database/mongoDB");
const getFullDate = require("../middleware/getFullDate");
const getFullTime = require("../middleware/getFullTime");
const { ObjectId } = require("mongodb");

class Controller {
  addTask = async (req, res, next) => {
    const response = { message: "Add task Successfully!" };
    try {
      req.body.userId = new ObjectId(req.body.userId);
      req.body.projectId = new ObjectId(req.body.projectId);
      await req.body.teamMember.forEach((i) => {
        i._id = new ObjectId(i._id);
      });

      await db.addTask(req.body);
      response.success = true;

      const currentTime = await getFullTime();
      const currentDate = await getFullDate();
      await db.addActivity({
        activity: "Add Task",
        userId: new ObjectId(req.body.userId),
        date: currentDate,
        time: currentTime,
      });
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  getAllTask = async (req, res, next) => {
    const response = { message: "Task list are empty!", data: [] };
    try {
      const data = await db.getAllTasks();
      if (data.length > 0) {
        response.data = data;
        response.message = "Get Task successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  getTaskById = async (req, res, next) => {
    const response = { message: "Task not found!" };
    try {
      const data = await db.getTaskWithId(req.params.id);
      if (data) {
        response.data = data;
        response.message = "Get task by id successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  updateTaskById = async (req, res, next) => {
    const response = { message: "Task not found!" };
    try {
      req.body.userId = new ObjectId(req.body.userId);
      req.body.projectId = new ObjectId(req.body.projectId);
      await req.body.teamMember.forEach((i) => {
        i._id = new ObjectId(i._id);
      });

      const data = await db.updateTaskWithId(req.params.id, req.body);
      if (data) {
        response.updated = true;
        response.message = "Update task by id successfully!";

        const currentTime = await getFullTime();
        const currentDate = await getFullDate();
        await db.addActivity({
          activity: "Update Task",
          userId: new ObjectId(req.body.userId),
          date: currentDate,
          time: currentTime,
        });
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  deleteTaskById = async (req, res, next) => {
    const response = { message: "Task not found!" };
    try {
      const { id, userId } = req.params;
      const data = await db.deleteTaskWithId(id);
      if (data) {
        response.deleted = true;
        response.message = "Delete Task by id successfully!";

        const currentTime = await getFullTime();
        const currentDate = await getFullDate();
        await db.addActivity({
          activity: "Delete Task",
          userId: new ObjectId(userId),
          date: currentDate,
          time: currentTime,
        });
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  getMyTask = async (req, res, next) => {
    const response = { message: "Task list are empty!", data: [] };
    try {
      const data = await db.getMyTasks(req.params.id);
      if (data) {
        response.data = data;
        response.message = "Get Task successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Controller();
