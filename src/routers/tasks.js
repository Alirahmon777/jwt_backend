import { Router } from 'express';
import { ADD_TASK, DELETE_TASK, GET_TASKS, GET_TASK_BY_ID, UPDATE_TASK } from '../controllers/tasks.js';
import { ADD_TASK_VALID, TASK_BY_ID_VALID } from '../middlewares/tasks.js';

export const tasksRouter = Router();

tasksRouter.get('/tasks', GET_TASKS);
tasksRouter.get('/tasks/:id', TASK_BY_ID_VALID, GET_TASK_BY_ID);
tasksRouter.post('/tasks', ADD_TASK_VALID, ADD_TASK);
tasksRouter.put('/tasks/:id', TASK_BY_ID_VALID, UPDATE_TASK);
tasksRouter.delete('/tasks/:id', TASK_BY_ID_VALID, DELETE_TASK);
