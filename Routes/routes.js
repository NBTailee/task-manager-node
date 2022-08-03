const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../Controllers/controllers");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
// +---------------------------------------------+
// |  GET    /api/tasks     --- get all tasks    |
// |  POST   /api/tasks     --- create new task  |
// |  GET    /api/tasks/:id --- get single task  |
// |  PATCH  /api/tasks/:id --- update task      |
// |  DELETE /api/tasks/:id --- delete task      |
// +---------------------------------------------+
