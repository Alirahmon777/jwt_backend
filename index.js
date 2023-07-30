import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { PORT } from './src/utils/constants.js';
import { userRouter } from './src/routers/users.js';
import { tasksRouter } from './src/routers/tasks.js';
const app = express();

app.get('/', (req, res) => {
  try {
    res.status(200).send('Welcome');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(tasksRouter);


app.listen(PORT, () => console.log('Server listening on port: ' + PORT));
