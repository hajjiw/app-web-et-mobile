const Todo = require('../models/todo');
const User = require('../models/user');

const list = async (req, res) => {
  try {
    if (req.session.user) return res.json(await Todo.find());
    else return res.redirect('/login');
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

const login = async (req, res) => {
  try {
    const result = await User.authenticate(
      req.body.username,
      req.body.password
    );
    req.session.user = result;
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const signin = async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password
    });
    return res.redirect('/login');
  } catch (error) {
    return res.send(error);
  }
};

const logout = (req, res) => {
  try {
    req.session.destroy();
    return res.redirect('/login');
  } catch (error) {
    return res.send(error);
  }
};

const get_current_user = (req, res) => {
  try {
    return res.send(req.session.user.username);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  list,
  add,
  update,
  remove,
  update_todo,
  get_todo,
  login,
  logout,
  signin,
  get_current_user
};
