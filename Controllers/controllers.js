const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json(err);
  }
};
const createTask = async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    // console.log(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).send(err);
  }
};
const getSingleTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({ msg: `No task found with id: ${taskID}` });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(taskID, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task found with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findByIdAndDelete(taskID);
    if (!task) {
      return res.status(404).json({ msg: `No task found with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
