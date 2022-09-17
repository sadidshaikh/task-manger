import Task from "../models/Task.js";

const getAllTasks = async (req, res) => {
    try {
        const readAllTasks = await Task.find();
        res.status(201).json(readAllTasks);
    } catch (err) {
        res.status(400).send(err);
    }
};


const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).send(err);
    }
};


const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ msg: err })
    }
};


const deleteTask = async (req, res) => {
    try {
        const { id:taskID } = req.params;
        const task = await Task.deleteOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }
        res.status(201).json(task);
        // or 
        // res.send(201).send();
        // res.status(201).json({ task: null, status: 'success'});
    } catch (err) {
        res.status(500).json({ msg: err })
    }
};


const updateTask = async (req, res) => {
    try{
        const { id:taskID } = req.params;
        // const task = await Task.updateOne({_id:taskID}, {$set: req.body});
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new:true, runValidators:true
        });
        // res.status(201).json({id:taskID, data:req.body});
        res.status(201).json(task);
    }catch(err){
        res.status(500).json({ msg: err })
    }
};

export { getAllTasks, createTask, getTask, updateTask, deleteTask };