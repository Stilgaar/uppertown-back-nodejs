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
const transacRouter = require("./routes/transactions");
const propertiesRouter = require("./routes/properties");
const salesRouter = require("./routes/sales");
const uploads = require("./routes/upload");
const admin = require("./routes/admin");

var app = express();
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use('/private', express.static(path.join(__dirname, 'private')));
app.use(cors())
app.use(logger('dev'));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter); // Acces aux données
app.use("/api/announces", announcesRouter);
app.use("/api/transactions", transacRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/sales", salesRouter);
app.use("/up", uploads);
app.use("/admin", admin)

//Les routes
app.use('/', indexRouter);

module.exports = app;
