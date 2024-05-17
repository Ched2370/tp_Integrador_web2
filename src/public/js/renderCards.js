const div_container = document.getElementById("card");

function cargarTarjetas(element) {
  /*agregar funsion filtro para buscador*/

  const div_card = document.createElement("div");
  div_card.className = "text-bg-light p-3 rounded position-relative tarjeta";
  div_card.id = `tarjeta-${element.id}`;
  div_card.style.maxWidth = "clamp(18rem, 18%, 24rem)";
  div_card.style.height = "32rem";
  div_card.style.cursor = "pointer";

  const img = document.createElement("img");
  img.className = "card-img-top mx-auto h-50";
  img.src = element.image;

  // creo overlay sobre imagen para mostrar el % de ofertas
  const cardOverlay = document.createElement("div");
  cardOverlay.className = "card-img-overlay py-5 my-xxl-3 my-4 h-50";

  const porcentajeOferta = document.createElement("p");
  porcentajeOferta.className = `p-2 text-bg-danger bg-opacity-50 fs-2 p-3 mt-3`;
  porcentajeOferta.innerHTML = `<strong>OFERTA<br> ${element.oferta.porcentaje}% OFF</strong>`;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h6");
  title.className = "card-title mt-4 px-1 py-0";
  title.textContent = element.title;

  const descripcion = document.createElement("p");
  descripcion.className = "card-text px-2 py-2";
  const desc =
    element.description.length > 30
      ? element.description.slice(0, 30 - element.description.length) + "..."
      : element.description;
  descripcion.textContent = desc;

  const cont_pre_btn = document.createElement("div");
  cont_pre_btn.className =
    "card-footer position-absolute bottom-0 start-50 translate-middle-x w-100 p-0 h-25";

  const precio = document.createElement("p");
  precio.className = "text-bg-warning p-3 h-100 py-2 rounded";
  if (element.price > 100) {
    precio.innerHTML = `<b>Categoria: <b>${element.category}<br> 
                          <b>Precio: <b><span class="text-decoration-line-through text-bg-secondary rounded px-1">$${element.price}</span><br>
                          <b>Oferta: <b><span class="text-bg-danger rounded px-1">$${element.oferta.precioConDescuento}</span><br>
                          <b>Te ahorras: <b><span class="text-bg-success rounded px-1">$${(element.price - element.oferta.precioConDescuento).toFixed(2)}</span><br>
                          `;
  } else {
    precio.innerHTML = `<b>Categoria: <b>${element.category}<br> 
                          <b>Precio: <b><span class="text-bg-secondary rounded px-1">$${element.price}</span><br>
                          `;
  }

  const btnAgregar = document.createElement("button");
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
    const storage = JSON.parse(localStorage.getItem('list'));

    if (!storage) {
      console.log('localstorage');
      await invocarCarrito(element);
    } else {
      const item = storage.find(e => e.id === element.id);
      console.log(item);
      if (item) {
        await invocarCarrito(item, item.cantidad);
      } else {
        await invocarCarrito(element);
      }
    }
  });
  
  

  // muestra descripcion
  div_card.addEventListener("mouseover", () => {
    descripcion.textContent = element.description;
    cardBody.className = "desc";
  });

  // trunca la descripcion
  div_card.addEventListener("mouseout", async () => {
    descripcion.textContent = desc;
    cardBody.classList.remove("desc");
  });
}
