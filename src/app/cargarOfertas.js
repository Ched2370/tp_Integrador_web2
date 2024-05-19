const fs = require('fs').promises;

async function cargarOfertas(productos) {
    try {
        let productoDeOfertaData = await fs.readFile('src/json/cargarOfertas.json', 'utf8');
        let productosDeOferta = JSON.parse(productoDeOfertaData);

        let ofertasMap = new Map(productosDeOferta.map(oferta => [oferta.id, oferta]));

        productos = productos.map(producto => {
            if (ofertasMap.has(producto.id)) {
                return ofertasMap.get(producto.id);
            } else {
                return producto;
            }
        });
        return productos;
    } catch (error) {
        throw new Error(`Error al cargar ofertas persistentes: ${error.message}`);
    }
}

module.exports = cargarOfertas;
