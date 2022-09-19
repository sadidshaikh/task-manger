import express from 'express';
import tasks from './routes/tasks.js';
import connectDB from './db/connection.js';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import { config } from 'dotenv';
const app = express();
const port = process.env.PORT || 9090;
config();

// middleware
app.use(express.json());
app.use(express.static("public"));

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);

// custom error handeling middleware
// app.use(errorHandlerMiddleware);

/* this start function will make sure that first   
 we will connect  our database then to server */
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to DataBase: TASK-MANAGER...");
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();
