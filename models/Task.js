import exp from "constants";
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must provide name'],
        maxlenght: [20, "name cannot be more than 20 characters"],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = new mongoose.model('Task', TaskSchema);

export default Task;