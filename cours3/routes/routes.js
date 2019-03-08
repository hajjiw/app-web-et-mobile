const Todo = require('../models/models').Todo;

const list = (req, res) => {
  Todo.find((err, list) => {
    if (err) res.send(err);
    res.json(list);
  });
};

const add = (req, res) => {
  Todo.create(
    {
      todo: req.body.todo,
      done: false,
      date: new Date().toLocaleTimeString()
    },
    (err, list) => {
      if (err) res.send(err);
      Todo.find((err, list) => {
        if (err) res.send(err);
        res.json(list);
      });
    }
  );
  console.log(req.body.todo);
};

const remove = (req, res) => {
  Todo.deleteOne(
    {
      _id: req.params.list_id
    },
    (err, list) => {
      if (err) res.send(err);
      res.json(list);
    }
  );
};

const update = (req, res) => {
  Todo.updateOne(
    {
      _id: req.params.list_id
    },
    {
      done: true
    },
    (err, list) => {
      if (err) res.send(err);
      res.json(list);
    }
  );
};

module.exports = { list, add, update, remove };
