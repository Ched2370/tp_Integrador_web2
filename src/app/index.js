const express = require('express');
const morgan = require('morgan')
const app = express();
const publicPath = __dirname.replace('app', 'public');
const router = require('./router/router');

app.set('port', process.env.PORT || 4030);
app.set('views', `${publicPath}/templates`);
app.set("view engine", "pug");

// midleware funcion q se ejecuta dentro de express
app.use(express.static(publicPath))
app.use('/', router)

module.exports = app;
