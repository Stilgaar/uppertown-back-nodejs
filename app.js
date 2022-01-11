var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require("./db.js");

//l'import des routes
const usersRouter = require("./routes/users");
const announcesRouter = require("./routes/announces");
const uploads = require("./routes/upload");
const admin = require("./routes/admin");
const transac = require('./routes/transac')

var app = express();
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use('/private', express.static(path.join(__dirname, 'private')));
app.use(cors())
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter); // Acces aux données
app.use("/api/announces", announcesRouter);
app.use("/up", uploads);
app.use("/admin", admin)
app.use("/transac", transac)


module.exports = app;
