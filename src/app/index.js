const express = require('express');
const morgan = require('morgan');
const app = express();

const publicPath = __dirname.replace('app', 'public');
const router = require('./router/router');

// Configuración del puerto
app.set('port', process.env.PORT || 5041);

// Configuración de vistas
app.set('views', `${publicPath}/templates`);
app.set('view engine', 'pug');

// Middlewares
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.static(publicPath));

// Rutas
app.use('/', router);

module.exports = app;
