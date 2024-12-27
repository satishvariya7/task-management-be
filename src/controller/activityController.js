const db = require("../database/mongoDB");

class Controller {
  getAllActivities = async (req, res, next) => {
    const response = { message: "Activity list are empty!", data: [] };
    try {
      const data = await db.getAllActivities(parseInt(req.params.value));
      if (data.length > 0) {
        response.data = data;
        response.message = "Get Activity successfully!";
      }
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Controller();
