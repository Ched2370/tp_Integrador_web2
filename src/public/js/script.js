//traigo los productos de la api procesada al navegador
fetch("/products")
  .then((res) => res.json())
  .then((json) => {
    json.forEach((element) => {
      cargarTarjetas(element);
    });
  })
  .catch((err) => {
    throw new Error(`error al conectar la api: ${err.message}`);
  });


  const cTabla = (function recargarTabla(){
    fetch("/cargarTabla")
    .then((res) => res.json())
    .then((json) => {
      json.forEach((element) => {
        cargarTablaDeCompras(element);
      });
    })
    .catch((err) => {
      throw new Error(`error al conectar la api: ${err.message}`);
    });
  })();
