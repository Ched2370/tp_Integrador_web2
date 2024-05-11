const express = require('express');
const morgan = require('morgan')
const app = express();

const publicPath = __dirname.replace('app', 'public');
const router = require('./router/router');

app.set('port', process.env.PORT || 3030);
app.set(morgan);
app.set('views', `${publicPath}/templates`);
app.set("view engine", "pug");

app.use(express.static(publicPath))
app.use('/', router)

module.exports = app;
