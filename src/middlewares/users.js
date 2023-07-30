import { readFile } from '../utils/filesystem.js';
import jwt from 'jsonwebtoken';
import { join } from 'path';
import { SECRET_KEY } from '../utils/constants.js';
import bcrypt from 'bcrypt';

export const ADD_USER_VALID = (req, res, next) => {
  try {
    const users = readFile(join('src', 'models'), 'users.json');
    const { name, lastName, age, gender, isMarried, email, password } = req.body;
    const user = users.find((user) => user.email == email);

    if (!name || !email || !password || !isMarried || !lastName || !age || !gender) {
      return res.status(400).json({ status: 400, data: null, error: 'Bad Request' });
    }

    if (user) {
      return res.status(409).json({ status: 409, data: null, error: 'User already exists' });
    }

    next();
  } catch (error) {
    res.status(500).json({ stutus: 500, data: null, error: error.message });
  }
};

export const LOGIN_USER_VALID = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = readFile(join('src', 'models'), 'users.json');
    const user = users.find((user) => user.email == email);

    if (!email || !password) {
      return res.status(400).json({ status: 400, data: null, error: 'Bad Request' });
    }

    if (!user) {
      return res.status(401).json({ status: 401, data: null, error: 'User Unauthorized' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(403).json({ status: 403, data: null, error: 'Password is incorrect' });
    }

    next();
  } catch (error) {
    res.status(500).json({ stutus: 500, data: null, error: error.message });
  }
};

export const GET_USER_VALID = (req, res, next) => {
  try {
    const { token } = req.headers;
    const { email, password } = jwt.verify(token, SECRET_KEY);

    if (!email || !password) {
      return res.status(498).json({ status: 498, data: null, error: 'Invalid Token' });
    }

    next();
  } catch (error) {
    res.status(500).json({ stutus: 500, data: null, error: error.message });
  }
};

export const USER_BY_ID_VALID = (req, res, next) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({ status: 400, data: null, error: 'Invalid request params' });
    }
    const users = readFile(join('src', 'models'), 'users.json');

    const user = users.find((user) => user.id == id);

    if (!user) {
      return res.status(404).json({ status: 404, data: null, error: 'User Not Found' });
    }

    if (req.method == 'PUT') {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ status: 400, data: null, error: 'Bad Request' });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ stutus: 500, data: null, error: error.message });
  }
};
