import { Router } from 'express';
import { ADD_USER, GET_USERS, LOGIN_USER, GET_USER, UPDATE_USER, DELETE_USER } from '../controllers/users.js';
import { ADD_USER_VALID, GET_USER_VALID, LOGIN_USER_VALID, USER_BY_ID_VALID } from '../middlewares/users.js';

export const userRouter = Router();

userRouter.get('/users', GET_USERS);
userRouter.get('/user', GET_USER_VALID, GET_USER);
userRouter.post('/sign-up', ADD_USER_VALID, ADD_USER);
userRouter.post('/sign-in', LOGIN_USER_VALID, LOGIN_USER);
userRouter.put('/users', UPDATE_USER);
userRouter.delete('/users/:id', USER_BY_ID_VALID, DELETE_USER);
