const router = require('express').Router();
const axios = require('axios');
const translateProducts = require('../translate');
const agregarOfertas = require('../agregarOfertas');
const guardarOfertasPersistentes = require('../crearOfertasPersistentes'); // Corregido
const fs = require('fs');

router.get('/', (req, res, next) => {
    res.render('index');
    next();
});

router.get('/products', async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const data = response.data;
        const dataTranslate = await translateProducts(data); // traduzco api
        const dataTranslateConOfertas = await agregarOfertas(dataTranslate); // le agrego ofertas
        const ofertasPersistentes = await guardarOfertasPersistentes(dataTranslateConOfertas); // cargo ofertas en varible
        const ofertasPersistentesJSON = JSON.stringify(ofertasPersistentes, null, 2); // paso a JSON
        // Crea ofertasPersistentes si no existe
        fs.writeFileSync('ofertasPersistentes.json', ofertasPersistentesJSON);
        res.send(dataTranslateConOfertas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;

