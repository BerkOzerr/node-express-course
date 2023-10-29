const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // res.status(200).json({ tasks, amount: tasks.lenght });
  // res
  //   .status(200)
  //   .json({ status: "success", data: { tasks, amount: tasks.lenght } });
});

const createTasks = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with Id : ${taskID}`, 404));
    // const error = new Error("Not Found.");
    // error.status = 404;
    // return next(error);
    // return res.status(404).json({ msg: `No task with Id : ${taskID}` });
  }
  res.status(200).json({ task });
});
const deleteTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with Id : ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with Id : ${taskID}` });
  }
  res.status(200).json({ task });
  //res.status(200).send()
  // res.status(200).json({ task: null, status: "success" });
});

const updateTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with Id : ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with Id : ${taskID}` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTasks,
  getTasks,
  updateTasks,
  deleteTasks,
};
