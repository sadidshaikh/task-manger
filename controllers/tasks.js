import Task from "../models/Task.js";
import asyncWrapper from '../middleware/async.js';
import { createCustomError } from "../errors/custom-error.js";


const getAllTasks = asyncWrapper(async (req, res) => {
    const readAllTasks = await Task.find();
    res.status(201).json(readAllTasks);
});


const createTask = asyncWrapper(async (req, res) => {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
});


const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustomError("Not Found", 404));
        // return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(201).json(task);
});


const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.deleteOne({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(201).json(task);
});


const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    // const task = await Task.updateOne({_id:taskID}, {$set: req.body});
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, runValidators: true
    });
    res.status(201).json(task);
});

export { getAllTasks, createTask, getTask, updateTask, deleteTask };