const bTabla = document.getElementById("agregarCompras");

const cargarTablaDeCompras = async function cargarTabla(prodComprados) {
  try {
    await cargarTablaConProductos(prodComprados);
  } catch (err) {
    console.log("error al cargar compras", err.message);
  }
};

function cargarTablaConProductos(compra) {
  const tr = document.createElement("tr");

  const tdTicket = document.createElement("td");
  tdTicket.textContent = `#00${compra.idCompra}`;

  const tdProductos = document.createElement("td");
  tdProductos.className = "d-flex gap-1";
  const ulProdImg = document.createElement("ul");
  const ulProdTitle = document.createElement("ul");

  for (const key in compra.productos) {
    if (compra.productos.hasOwnProperty(key)) {
      const producto = compra.productos[key];
      const liImage = document.createElement("li");
      liImage.innerHTML = `<img src="${producto.image}" style="width: 25px">`;
      liImage.className = "mb-1 my-auto";
      ulProdImg.appendChild(liImage);
    }
  }

  for (const key in compra.productos) {
    if (compra.productos.hasOwnProperty(key)) {
      const producto = compra.productos[key];
      const liTitle = document.createElement("li");
      if (producto.title.length > 40) {
        producto.title = producto.title.substring(0, 30) + "...";
      }
      liTitle.textContent = `${producto.title}`;
      liTitle.className = "text-truncate py-1 mb-1";
      ulProdTitle.appendChild(liTitle);
    }
  }

  const tdCantidad = document.createElement("td");
  const ulCantidad = document.createElement("ul");

  for (const key in compra.productos) {
    if (compra.productos.hasOwnProperty(key)) {
      const producto = compra.productos[key];
      const liCantidad = document.createElement("li");
      liCantidad.textContent = `${producto.cantidad}`;
      liCantidad.className = "py-1 mb-1";
      ulCantidad.appendChild(liCantidad);
    }
  }

  const tdTotal = document.createElement("td");
  tdTotal.textContent = `$ ${parseFloat(compra.total).toFixed(2)}`;

  let fecha = new Date(compra.fecha);
  let dia = `${fecha.getDate()}`;
  let mes = `${fecha.getMonth()}`;
  let anyo = `${fecha.getFullYear()}`;
  let hh = `${fecha.getHours()}`;
  let min = `${fecha.getMinutes()}`;
  const tdFecha = document.createElement("td");
  tdFecha.textContent = `${hh}:${min}hs - ${dia}/${parseInt(mes) + 1}/${anyo}`;

  tr.appendChild(tdTicket);
  tr.appendChild(tdProductos);
  tdProductos.appendChild(ulProdImg);
  tdProductos.appendChild(ulProdTitle);
  tr.appendChild(tdCantidad);
  tdCantidad.appendChild(ulCantidad);
  tr.appendChild(tdTotal);
  tr.appendChild(tdFecha);
  bTabla.appendChild(tr);
}
