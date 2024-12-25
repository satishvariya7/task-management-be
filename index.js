const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./src/routes/userRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const activityRoutes = require("./src/routes/activityRoutes");
const errorHandler = require("./src/middleware/errorHandler");
const path = require("path");
const dotEnv = require("dotenv");

dotEnv.config({ path: ".env" });

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

//Route....
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);
app.use("/activity", activityRoutes);

//Get product-images...
app.use(
  "/users/images",
  express.static(path.join(__dirname, "src/users-images"))
);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT} port`)
);
