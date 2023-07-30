import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { PORT } from './utils/constants.js';
import { userRouter } from './routers/users.js';
import { tasksRouter } from './routers/tasks.js';
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(tasksRouter);

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));
