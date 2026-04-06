var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var envPath = path.join(__dirname, 'mongo.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  require('dotenv').config();
}

var mongoose = require('mongoose');
if (!process.env.MONGO_URI) {
  console.warn('MONGO_URI is not set. The app will start without a DB connection.');
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var yurtCampsitesRouter = require('./routes/yurtcampsites');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/yurtcampsites', yurtCampsitesRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);

// If app.js is run directly (e.g., `node app.js`), start the server here.
if (require.main === module) {
  var http = require('http');
  var port = process.env.PORT || '3000';
  app.set('port', port);
  var server = http.createServer(app);
  server.listen(port, () => {
    console.log('Server listening on port ' + port);
  });
}

module.exports = app;
