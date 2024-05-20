async function agregarOfertas(products) {
  try {
    const ofertasPromises = products.map(async (product) => {
      let oferta = 0;
      // ver readme
      /*if (product.price > 100 && product.price < 500) {
        oferta = 0.1;
      } else if (product.price > 500) {
        oferta = 0.25;
      }  */
      const precioConDescuento = product.price * (1 - oferta);
      product.oferta = {
        porcentaje: oferta * 100,
        precioConDescuento: precioConDescuento.toFixed(2)
      };
      return product;
    });

    const productosConOfertas = await Promise.all(ofertasPromises);
    return productosConOfertas;
  } catch (error) {
    throw new Error(`Error al agregar ofertas a los productos: ${error.message}`);
  }
}

module.exports = agregarOfertas;