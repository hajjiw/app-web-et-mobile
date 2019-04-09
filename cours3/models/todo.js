const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  todo: String,
  done: Boolean,
  date: String,
  category: String,
  user: String
});

let Todo = new mongoose.model('Todo', TodoSchema, 'todolist');

module.exports = Todo;
