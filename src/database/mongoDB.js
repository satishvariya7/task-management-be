const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/users");
const { ObjectId } = require("mongodb");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  hobbies: { type: Array, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  teamMember: { type: Array, required: true },
  user: { type: String, required: true },
  userId: { type: Object, required: true },
});

const taskSchema = new mongoose.Schema({
  projectId: { type: Object, required: true },
  userId: { type: Object, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  author: { type: String, required: true },
  teamMember: { type: Array, required: true },
});

const activitySchema = new mongoose.Schema({
  activity: { type: String, required: true },
  userId: { type: Object, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const users = mongoose.model("logged-users", userSchema);
const projects = mongoose.model("projects", projectSchema);
const tasks = mongoose.model("tasks", taskSchema);
const activities = mongoose.model("activities", activitySchema);

const database_models = {
  //User models
  addUser: async (user) => {
    const data = await new users(user);
    return data.save();
  },
  existEmail: async (email) => {
    return await users.findOne({ email: email });
  },
  loginUser: async (user) => {
    const data = await users.findOne({
      email: user.email,
      password: user.password,
    });
    if (data) {
      return data.toObject();
    } else return false;
  },
  getAllUsers: async () => {
    return await users.find();
  },
  getUserWithId: async (id) => {
    return await users.findOne({ _id: id });
  },
  updateUserWithId: async (id, user) => {
    const data = await users.updateOne({ _id: id }, user);
    if (data.matchedCount > 0) return true;
    else return false;
  },
  deleteUserWithId: async (id) => {
    const data = await users.deleteOne({ _id: id });
    if (data.deletedCount > 0) return true;
    else return false;
  },
  getUserForChanges: async (user) => {
    const data = await users.findOne({
      email: user.email,
      password: user.password,
    });
    if (data) {
      return data.toObject();
    } else return false;
  },
  changePassword: async (id, user) => {
    const data = await users.updateOne({ _id: id }, user);
    if (data.matchedCount > 0) return true;
    else return false;
  },
  //Product models
  existProject: async (name) => {
    return await projects.findOne({ projectName: name });
  },
  addProject: async (project) => {
    const data = await new projects(project);
    return data.save();
  },
  getAllProjects: async () => {
    return await projects.find();
  },
  getProjectWithId: async (id) => {
    const data = await projects.findOne({ _id: id });
    return data;
  },
  updateProjectWithId: async (id, project) => {
    const data = await projects.updateOne({ _id: id }, project);
    if (data.matchedCount > 0) return true;
    else return false;
  },
  deleteProjectWithId: async (id) => {
    const data = await projects.deleteOne({ _id: id });
    if (data.deletedCount > 0) return true;
    else return false;
  },
  // Task models
  addTask: async (task) => {
    const data = await new tasks(task);
    return data.save();
  },
  getAllTasks: async () => {
    return await tasks.find();
  },
  getTaskWithId: async (id) => {
    const data = await tasks.findOne({ _id: id });
    return data;
  },
  updateTaskWithId: async (id, project) => {
    const data = await tasks.updateOne({ _id: id }, project);
    if (data.matchedCount > 0) return true;
    else return false;
  },
  deleteTaskWithId: async (id) => {
    const data = await tasks.deleteOne({ _id: id });
    if (data.deletedCount > 0) return true;
    else return false;
  },
  getMyTasks: async (userId, searchValue) => {
    try {
      const matchStage = {
        $match: { "teamMember._id": new ObjectId(userId) },
      };
      if (searchValue) {
        const searchCriteria = Object.keys(searchValue).reduce((acc, key) => {
          acc[key] = searchValue[key];
          return acc;
        }, {});
        matchStage.$match = { ...matchStage.$match, ...searchCriteria };
      }

      const data = await tasks.aggregate([
        matchStage,
        {
          $lookup: {
            from: "logged-users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $project: {
            activity: 1,
            date: 1,
            time: 1,
            title: 1,
            description: 1,
            dueDate: 1,
            priority: 1,
            status: 1,
            author: 1,
            teamMember: 1,
          },
        },
      ]);
      if (data && data.length > 0) return data;
      else return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  },
  //Activity models
  addActivity: async (activity) => {
    const data = await new activities(activity);
    return data.save();
  },
  getAllActivities: async (value) => {
    try {
      const data = await activities.aggregate([
        {
          $lookup: {
            from: "logged-users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $project: {
            activity: 1,
            date: 1,
            time: 1,
            userName: "$userDetails.name",
            category: "$userDetails.category",
          },
        },
        { $limit: value },
      ]);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getIdProject: async (userId) => {
    const data = await activities.aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "logged-users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          activity: 1,
          activity: 1,
          time: 1,
          name: "$userDetails.name",
        },
      },
    ]);

    return data;
  },
};

module.exports = database_models;
