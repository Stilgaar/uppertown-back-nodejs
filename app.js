var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require("./db_connect");


//l'import des routes
var indexRouter = require('./routes/index');
const usersRouter = require("./routes/users");
const announcesRouter = require("./routes/announces");
//const uploads = require("./routes/upload");

var app = express();
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors())
app.use(logger('dev'));
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter); // Acces aux données
app.use("/api/announces", announcesRouter);
//app.use("/up", uploads);

//Les routes
app.use('/', indexRouter);

module.exports = app;
