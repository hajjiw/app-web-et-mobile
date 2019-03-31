const express = require('express');
const session = require('express-session');
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
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'my secret'
  })
);

// on connecte
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true });

app.get('/', (req, res) => {
  console.log(req.session.user);
  if (!req.session.user) res.redirect('/login');
});
app
  .route('/api/list')
  .get(routes.list)
  .post(routes.add);

app
  .route('/api/list/:list_id')
  .put(routes.update)
  .delete(routes.remove);
app
  .route('/api/list/todo/:list_id')
  .get(routes.get_todo)
  .put(routes.update_todo);

app
  .route('/login')
  .get((req, res) => {
    res.sendFile('/public/login.html', { root: __dirname });
  })
  .post(routes.login);

app.get('/api/list/user', routes.get_current_user);
app.get('/logout', routes.logout);
app.post('/signin', routes.signin);

app.listen(3001, () => {
  console.log('express started on 3001');
});
