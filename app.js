import express from 'express';
import userRoute from './routes/userRoute.js'
import { config } from 'dotenv';
import cookieParser from "cookie-parser"
import taskRouter from './routes/taskRoute.js';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors'


export const app = express();

config({
    path: './config/.env'
})

// Using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        // origin: [process.env.FRONTEND_URL],
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
);


// Using routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/task', taskRouter)



app.get('/', (req, res) => {
    res.send("Hello world!!!")
});

// Using error middleware
app.use(errorMiddleware)
