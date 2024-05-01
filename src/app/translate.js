const translate = require("node-google-translate-skidz");

async function translateProduct(product) {
  try {
    const titleTranslation = await translate({
      text: product.title,
      source: 'en',
      target: 'es'
    });
    const descriptionTranslation = await translate({
      text: product.description,
      source: 'en',
      target: 'es'
    });
    product.title = titleTranslation.data[0];
    product.description = descriptionTranslation.data[0];
    return product;
  } catch (error) {
    throw new Error(`Error al traducir el producto: ${error.message}`);
  }
}

async function translateProducts(products) {
  try {
    const translatedProducts = await Promise.all(products.map(async (product) => {
      return await translateProduct(product);
    }));
    return translatedProducts;
  } catch (error) {
    throw new Error(`Error al traducir los productos: ${error.message}`);
  }
}

module.exports = translateProducts;
