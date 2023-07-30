import express from 'express';
// import 'dotenv/config';
// import cors from 'cors';
// import { PORT } from './src/utils/constants.js';
// import { userRouter } from './src/routers/users.js';
// import { tasksRouter } from './src/routers/tasks.js';
const app = express();

app.get('/', (req, res) => {
  res.send('Express on Vercel');
});

// app.use(express.json());
// app.use(cors());
// app.use(userRouter);
// app.use(tasksRouter);

app.listen(6000, () => {
  console.log('Running on port 6000.');
});

export default app;
