const fs = require('fs').promises;

async function cargarOfertas(productos) {
    try {
        let productoDeOfertaData = await fs.readFile('src/json/cargarOfertas.json', 'utf8');
        let productosDeOferta = JSON.parse(productoDeOfertaData);

        let ofertasMap = new Map(productosDeOferta.map(oferta => [oferta.id, oferta]));

        productos = productos.map(producto => {
            if (ofertasMap.has(producto.id)) {
                console.log(`Reemplazando producto ID: ${producto.id} con oferta`);
                return ofertasMap.get(producto.id);
            } else {
                console.log(`No hay oferta para el producto ID: ${producto.id}`);
                return producto;
            }
        });
        return productos;
    } catch (error) {
        throw new Error(`Error al cargar ofertas persistentes: ${error.message}`);
    }
}

module.exports = cargarOfertas;
