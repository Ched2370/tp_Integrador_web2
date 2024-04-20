const express = require('express');
const morgan = require('morgan')
const app = express();
const publicPath = __dirname.replace('app', 'public');
const router = require('./router/router')

app.set('port', process.env.PORT || 4030);
app.set('views', `${publicPath}/templates`);
app.set("view engine", "pug");
// midleware funcion q se ejecuta dentro de express
app.use(express.static(publicPath)) // especificamos donde estan los archivos public para llamar el css
app.use(morgan("dev"))
app.use('/', router)


module.exports = app;