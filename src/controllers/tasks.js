import { readFile, writeFile } from '../utils/filesystem.js';
import { join } from 'path';

export const GET_TASKS = (req, res) => {
  try {
    const tasks = readFile(join('src', 'models'), 'tasks.json');

    res.status(200).json({ status: 200, data: tasks, error: null });
  } catch (error) {
    res.status(500).json({ status: 500, data: null, error: error.message });
  }
};

export const GET_TASK_BY_ID = (req, res) => {
  try {
    const id = req.params.id;

    const tasks = readFile(join('src', 'models'), 'tasks.json');

    const task = tasks.find((task) => task.id == id);

    res.status(200).json({ status: 200, data: task, error: null });
  } catch (error) {
    res.status(500).json({ status: 500, data: null, error: error.message });
  }
};

export const UPDATE_TASK = (req, res) => {
  try {
    const { id } = req.params;

    const { title, body, completed, userId } = req.body;
    const tasks = readFile(join('src', 'models'), 'tasks.json');
    const task = tasks?.find((task) => task.id == id);

    task.title = title ?? task.title;
    task.body = body ?? task.body;
    task.completed = completed ?? task.completed;
    task.userId = userId ?? task.userId;

    writeFile(join('src', 'models'), 'tasks.json', tasks);

    res.status(200).json({ stutus: 200, data: tasks, error: null });
  } catch (error) {
    res.status(500).json({ stutus: 500, data: null, error: error.message });
  }
};

export const ADD_TASK = (req, res) => {
  try {
    const { title, body, userId } = req.body;
    const tasks = readFile(join('src', 'models'), 'tasks.json');
    const users = readFile(join('src', 'models'), 'users.json');
    const user = users.find((user) => user.id == userId);

    console.log(user);

    const newTask = {
      id: tasks.at(-1)?.id + 1 || 1,
      title,
      completed: false,
      body: body ?? '',
      userId,
    };

    user.tasks.push({
      id: newTask.id,
      title,
      completed: false,
      body: body ?? '',
    });

    tasks.push(newTask);

    writeFile(join('src', 'models'), 'users.json', users);
    writeFile(join('src', 'models'), 'tasks.json', tasks);

    res.status(200).json({ stutus: 200, data: tasks, error: null });
  } catch (error) {
    res.status(500).json({ stutus: 500, data: null, error: error.message });
  }
};

export const DELETE_TASK = (req, res) => {
  try {
    const id = req.params.id;

    const tasks = readFile(join('src', 'models'), 'tasks.json');

    const filteredTasks = tasks.filter((task) => task.id != id);

    writeFile(join('src', 'models'), 'tasks.json', filteredTasks);

    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
