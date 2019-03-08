const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// on connecte
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true });
let List = mongoose.model('List', { todo: String, done: Boolean }, 'todolist');

app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
});

app.get('/api/list', (req, res) => {
  List.find((err, list) => {
    if (err) res.send(err);
    res.json(list);
  });
});

app.post('/api/list', (req, res) => {
  List.create(
    {
      todo: req.body.todo,
      done: false
    },
    (err, list) => {
      if (err) res.send(err);
      List.find((err, list) => {
        if (err) res.send(err);
        res.json(list);
      });
    }
  );
  console.log(req.body.todo);
});

app.put('/api/list/:list_id', (req, res) => {
  List.updateOne(
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
});

app.delete('/api/list/:list_id', (req, res) => {
  List.deleteOne(
    {
      _id: req.params.list_id
    },
    (err, list) => {
      if (err) res.send(err);
      res.json(list);
    }
  );
});

app.listen(8080);
console.log('on utilise le port 8080');
