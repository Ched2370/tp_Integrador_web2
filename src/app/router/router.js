const router = require('express').Router();
const axios = require('axios');
const translateProducts = require('../translate');

router.get('/', (req, res, next)=> {
    res.render('index')
    next()
});

router.get('/products', async (req, res) => {
    // tuve que realizar la solicitud con axios xq fetch traiga conflicto con los modulos de node
    const response = await axios.get('https://fakestoreapi.com/products')
    const data = response.data;
    const dataTranslate = await translateProducts(data);
    res.send(dataTranslate);
});

module.exports = router;