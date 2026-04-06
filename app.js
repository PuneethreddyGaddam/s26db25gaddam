var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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

module.exports = app;
