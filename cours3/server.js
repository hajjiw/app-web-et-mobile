const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
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

app.get('/api/list', routes.list);
app.post('/api/list', routes.add);
app.put('/api/list/:list_id', routes.update);
app.delete('/api/list/:list_id', routes.remove);

app.listen(3000);
console.log('express started !');
