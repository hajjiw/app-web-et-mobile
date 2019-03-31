const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// on connecte
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true });

app.get('/api/list', routes.list);
app.get('/login', (req, res) => {
  res.sendFile('/public/login.html', { root: __dirname });
});
app.get('/api/list/todo/:list_id', routes.get_todo);
app.post('/api/list', routes.add);
app.put('/api/list/:list_id', routes.update);
app.put('/api/list/todo/:list_id', routes.update_todo);
app.delete('/api/list/:list_id', routes.remove);

app.listen(3001, () => {
  console.log('express started on 3001');
});
