const router = require('express').Router();
const axios = require('axios');
const translateProducts = require('../translate');
const agregarOfertas = require('../agregarOfertas');

// index.pug
router.get('/', (req, res, next)=> {
    res.render('index')
    next()
});

// productos
router.get('/products', async (req, res) => {
    // tuve que realizar la solicitud con axios xq fetch traiga conflicto con los modulos de node
    const response = await axios.get('https://fakestoreapi.com/products')
    const data = response.data;
    const dataTranslate = await translateProducts(data);
    const dataTranslateConOfertas = await agregarOfertas(dataTranslate);
    res.send(dataTranslateConOfertas);
});

module.exports = router;
