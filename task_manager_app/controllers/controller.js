const { v4: uuidv4 } = require('uuid');
const tasks = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  task ? res.json(task) : res.status(404).json({ message: 'Task not found' });
};

exports.createTask = (req, res) => {
  const { title, completed = false } = req.body;
  const newTask = { id: uuidv4(), title, completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (task) {
    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

exports.deleteTask = (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};
