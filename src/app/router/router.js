const express = require("express");
const axios = require("axios");
const translateProducts = require("../translate");
const agregarOfertas = require("../agregarOfertas");
// const guardarOfertasPersistentes = require("../crearOfertasPersistentes");
const cargarOfertas = require("../cargarOfertas");
const fs = require("fs/promises");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
  next();
});

router.get("/products", async (req, res, next) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const data = response.data;
    const dataTranslate = await translateProducts(data); // traduzco api
    const dataTranslateConOfertas = await agregarOfertas(dataTranslate); // le agrego ofertas
    const dataCompleta = await cargarOfertas(dataTranslateConOfertas);
    /*const ofertasPersistentes = await guardarOfertasPersistentes(dataTranslateConOfertas); // cargo ofertas en varible
    const ofertasPersistentesJSON = JSON.stringify(ofertasPersistentes, null, 2);
    await fs.writeFile("src/json/ofertasPersistentes.json", ofertasPersistentesJSON); */
    res.send(dataCompleta);
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Error interno del servidor", message: error.message });
  }
});

router.post("/compra", async (req, res) => {
  try {
    console.log("Llego al server");
    let compra = req.body;

    let comprasData = await fs.readFile('src/json/comprasRealizadas.json');
    
    let compras = JSON.parse(comprasData);

    let ids = compras.map(e => e.idCompra);
    
    let compraId;

    if (ids == null || ids.length == 0) {
      compraId = 0;
    } else {
      compraId = Math.max(...ids) + 1;
    }
    
    let totalAPagar = compra.reduce((acc, item) => { return acc = acc + (parseFloat(item.oferta.precioConDescuento) * item.cantidad)}, 0);
    

    compras.push({
      idCompra: compraId,
      fecha: new Date(),
      total: parseFloat(totalAPagar).toFixed(2),
      productos: { ...compra }
    });

    await fs.writeFile('src/json/comprasRealizadas.json', JSON.stringify(compras, null, 2));
    res.json({carga: 'exitosa'});
  } catch (err) {
    console.log("Error al cargar la compra", err.message);
    res.status(500).send({ error: "Error interno del servidor", message: err.message });
  }
});

router.get('/cargarTabla', async (req, res) => {
  try {
    let cargarTabla = await fs.readFile('src/json/comprasRealizadas.json');

    cargarTabla = JSON.parse(cargarTabla);
    
    res.send(cargarTabla);
  } catch (err) {
    console.log("Error al enviar tabla de compras", err.message);
    res.status(500).send({ error: "Error interno del servidor", message: err.message });
  }
})

module.exports = router;
