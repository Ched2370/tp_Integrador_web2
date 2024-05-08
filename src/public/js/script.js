
fetch("/products")
  .then((res) => res.json())
  .then((json) => {
    json.forEach((element) => {
      cargarTarjetas(element);
    });})
  .catch((err) => {
    throw new Error(`error al conectar la api: ${err.message}`);
  });
