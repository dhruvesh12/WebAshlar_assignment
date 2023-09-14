var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dbconnect = require('./DbConfig/mongoConnection')
var Auth = require('./routes/Auth');
var usersRouter = require('./routes/TasksApi');
var cors = require('cors')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




dbconnect()
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Auth', Auth);
app.use('/api', usersRouter);


module.exports = app;
