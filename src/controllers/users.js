import { readFile, writeFile } from '../utils/filesystem.js';
import { SECRET_KEY } from '../utils/constants.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { join } from 'path';

export const GET_USERS = (req, res) => {
  try {
    const users = readFile(join('src', 'models'), 'users.json');

    res.status(200).json({ status: 200, data: users, error: null });
  } catch (error) {
    res.status(500).json({ status: 500, data: null, error: error.message });
  }
};

export const GET_USER = (req, res) => {
  try {
    const { token } = req.headers;
    const users = readFile(join('src', 'models'), 'users.json');

    const { email, password } = jwt.verify(token, SECRET_KEY);

    const user = users.find((user) => user.email == email && bcrypt.compareSync(password, user.password));

    res.status(200).json({ status: 200, data: user, error: null });
  } catch (error) {
    res.status(500).json({ status: 500, data: null, error: error.message });
  }
};

export const UPDATE_USER = (req, res) => {
  try {
    const { token } = req.headers;

    const { email } = jwt.verify(token, SECRET_KEY);

    const { name, lastName, gender, email: mail, password, newPassword, isMarried, age } = req.body;
    const users = readFile(join('src', 'models'), 'users.json');
    const user = users?.find((user) => user.email == email);
    let comparesPass;
    let hashedPassword;

    if (password) {
      comparesPass = bcrypt.compareSync(password, user.password);
      if (!comparesPass) {
        return res.status(400).json({
          status: 400,
          data: null,
          error: newPassword ? 'Invalid password' : 'New Password Required: newPassword',
        });
      }
      hashedPassword = bcrypt.hashSync(newPassword, 10);
    }

    if (newPassword && !password) {
      return res.status(400).json({
        status: 400,
        data: null,
        error: 'password is required: password',
      });
    }

    user.name = name ?? user.name;
    user.lastName = lastName ?? user.lastName;
    user.gender = gender ?? user.gender;
    user.email = mail ?? user.email;
    user.password = hashedPassword ?? user.password;
    user.isMarried = isMarried ?? user.isMarried;
    user.age = age ?? user.age;

    writeFile(join('src', 'models'), 'users.json', users);

    res.status(200).json({ stutus: 200, data: users, error: null });
  } catch (error) {
    res.status(500).json({ stutus: 500, data: null, error: error.message });
  }
};

export const DELETE_USER = (req, res) => {
  try {
    const id = req.params.id;

    const tasks = readFile(join('src', 'models'), 'users.json');

    const filteredTasks = tasks.filter((task) => task.id != id);

    writeFile(join('src', 'models'), 'users.json', filteredTasks);

    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const ADD_USER = (req, res) => {
  try {
    const users = readFile(join('src', 'models'), 'users.json');
    const { name, lastName, age, gender, isMarried, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    users.push({
      id: users.at(-1)?.id + 1 || 1,
      name,
      lastName,
      email,
      gender,
      isMarried,
      age,
      password: hashedPassword,
    });

    const token = jwt.sign({ email, password }, SECRET_KEY);

    writeFile(join('src', 'models'), 'users.json', users);

    res.status(201).json({ status: 201, token, error: null });
  } catch (error) {
    res.status(500).json({ status: 500, data: null, error: error.message });
  }
};

export const LOGIN_USER = (req, res) => {
  try {
    const { email, password } = req.body;

    const token = jwt.sign({ email, password }, SECRET_KEY);

    res.status(200).json({ status: 200, token, error: null });
  } catch (error) {
    res.status(500).json({ status: 500, data: null, error: error.message });
  }
};
