async function guardarOfertasPersistentes(products) {
    try {
        const ofertasPersistentes = products.filter(product => product.oferta && product.oferta.porcentaje > 0); // Filtrar productos con oferta
        return ofertasPersistentes;
    } catch (error) {
        throw new Error(`Error al guardar ofertas persistentes: ${error.message}`);
    }
}

module.exports = guardarOfertasPersistentes;
