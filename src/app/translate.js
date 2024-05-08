const translate = require("node-google-translate-skidz");

async function translateProducts(products) {
  try {
    const translationPromises = products.map(async (product) => {
      const titleTranslation = translate({
        text: product.title,
        source: 'en',
        target: 'es'
      });

      const descriptionTranslation = translate({
        text: product.description,
        source: 'en',
        target: 'es'
      });

      const categoryTranslation = translate({
        text: product.category,
        source: 'en',
        target: 'es'
      });

      const [titleResult, descriptionResult, categoryResult] = await Promise.all([titleTranslation, descriptionTranslation, categoryTranslation]);

      product.title = titleResult.translation;
      product.description = descriptionResult.translation;
      product.category = categoryResult.translation;

      return product;
    });

    const translatedProducts = await Promise.all(translationPromises);
    return translatedProducts;
  } catch (error) {
    throw new Error(`Error al traducir los productos: ${error.message}`);
  }
}

module.exports = translateProducts;

