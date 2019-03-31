const Todo = require('../models/models').Todo;

const list = async (req, res) => {
  try {
    return res.json(await Todo.find());
  } catch (error) {
    res.send(error);
  }
};

const get_todo = async (req, res) => {
  try {
    return res.json(await Todo.findById(req.params.list_id));
  } catch (error) {
    res.send(error);
  }
};

const add = async (req, res) => {
  try {
    await Todo.create({
      todo: req.body.todo,
      done: false,
      date: new Date().toLocaleTimeString()
    });
    return res.json(await Todo.find());
  } catch (error) {
    res.send(error);
  }
};

const remove = async (req, res) => {
  try {
    await Todo.deleteOne({
      _id: req.params.list_id
    });
    return res.json(await Todo.find());
  } catch (err) {
    res.send(err);
  }
};

const update = async (req, res) => {
  try {
    await Todo.findOneAndUpdate(req.params.list_id, {
      done: true
    });
    return res.json(await Todo.find());
  } catch (err) {
    res.send(err);
  }
};

const update_todo = async (req, res) => {
  try {
    await Todo.findOneAndUpdate(req.params.list_id, {
      date: new Date().toLocaleTimeString(),
      todo: req.body.todo
    });
    return res.json(await Todo.find());
  } catch (err) {
    res.send(err);
  }
};

module.exports = { list, add, update, remove, update_todo, get_todo };
