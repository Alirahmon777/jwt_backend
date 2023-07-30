import { readFile } from '../utils/filesystem.js';
import { join } from 'path';

export const ADD_TASK_VALID = (req, res, next) => {
  try {
    const { title, body, userId } = req.body;
    const users = readFile(join('src', 'models'), 'users.json');
    const user = users.find((user) => user.id == userId);

    if (!user) {
      return res.status(404).json({ status: 404, data: null, error: 'User Not Found. Please change (userId)' });
    }

    if (!title || !userId) {
      return res.status(400).json({ status: 400, data: null, error: 'Bad Request' });
    }

    next();
  } catch (error) {
    res.status(500).json({ stutus: 500, data: null, error: error.message });
  }
};

export const TASK_BY_ID_VALID = (req, res, next) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({ status: 400, data: null, error: 'Invalid request params' });
    }
    const tasks = readFile(join('src', 'models'), 'tasks.json');

    const task = tasks.find((task) => task.id == id);

    if (!task) {
      return res.status(404).json({ status: 404, data: null, error: 'Task Not Found' });
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
