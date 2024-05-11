const div_container = document.getElementById("card");

function cargarTarjetas(element) {

  /*agregar funsion filtro para buscador*/

  const div_card = document.createElement("div");
  div_card.className = "text-bg-light p-3 rounded position-relative";
  div_card.style.maxWidth = "20rem";
  div_card.style.minHeight = "32rem";
  div_card.style.cursor = "pointer";

  const img = document.createElement("img");
  img.className = "card-img-top mx-auto h-50";
  img.src = element.image;

  // creo overlay sobre imagen para mostrar el % de ofertas
  const cardOverlay = document.createElement("div");
  cardOverlay.className = "card-img-overlay py-5";

  const porcentajeOferta = document.createElement("p");
  porcentajeOferta.className = `p-2 text-bg-danger bg-opacity-50 fs-2 p-3 mt-5`;
  porcentajeOferta.innerHTML = `<strong>OFERTA ${element.oferta.porcentaje}% OFF</strong>`;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h6");
  title.className = "card-title my-3 px-2 py-0";
  title.textContent = element.title;

  const descripcion = document.createElement("p");
  descripcion.className = "card-text text-truncate px-2 py-0 h-75 mb-5 fs-6";
  descripcion.textContent = element.description;

  const cont_pre_btn = document.createElement("div");
  cont_pre_btn.className =
    "card-footer position-absolute bottom-0 start-50 translate-middle-x w-100 p-0 h-25";

  const precio = document.createElement("p");
  precio.className = "text-bg-warning p-3 fs-6 h-75 py-2";
  if (element.price > 100) {
    precio.innerHTML = `<b>Categoria: <b>${element.category}<br> 
                          <b>Precio: <b><span class="text-decoration-line-through text-bg-secondary rounded px-1">$${element.price}</span><br>
                          <b>Oferta: <b><span class="text-bg-danger rounded px-1">$${element.oferta.precioConDescuento}</span><br>
                          <b>Ranking: <b>${element.rating.rate}<br>
                          `;
  } else {
    precio.innerHTML = `<b>Categoria: <b>${element.category}<br> 
                          <b>Precio: <b><span class="text-bg-secondary rounded px-1">$${element.price}</span><br>
                          <b>Ranking: <b>${element.rating.rate}<br>
                          `;
  }

  const btnAgregar = document.createElement("button"); // Corregido aquí
  btnAgregar.className =
    "btn btn-primary position-absolute top-0 end-0 m-3 btnAgregar";
  btnAgregar.id = `btn${element.id}`;
  btnAgregar.innerHTML = '<i class="bi bi-cart-plus"></i>';

  div_container.appendChild(div_card);
  div_card.appendChild(img);

  if (element.price > 100) {
    div_card.appendChild(cardOverlay);
    cardOverlay.appendChild(porcentajeOferta);
  }

  div_card.appendChild(cardBody);
  cardBody.appendChild(title);
  cardBody.appendChild(descripcion);
  div_card.appendChild(cont_pre_btn);
  cont_pre_btn.appendChild(precio);
  div_card.appendChild(btnAgregar);

  btnAgregar.addEventListener("click", async () => {
    await carrito(element);
});

}
