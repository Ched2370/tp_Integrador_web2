const div_container = document.getElementById("card");

function cargarTarjetas(element) {
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

  // Agregar a carrito
  btnAgregar.addEventListener("click", function () {
    // Inicio de clausulas
    let contador = 1;
    let precioAcumulado = parseFloat(element.oferta.precioConDescuento);
    // Función para sumar el precio
    function sumarPrecio() {
      precioAcumulado =
        parseFloat(element.oferta.precioConDescuento) * contador;
      return precioAcumulado.toFixed(2);
    }

    // Función para contar los items
    function contarItem() {
      contador++;
      return contador;
    }

    // Función para restar los items
    function restarItem() {
      if (contador > 0) {
        contador--;
        precioAcumulado -= element.oferta.precioConDescuento;
      } else {
        contador = 0;
        precioAcumulado = 0;
      }
      return contador;
    }

    const carro = document.getElementById("carrito");
    const idProd = this.id;
    //si colocaba const generaba error divCarrito
    let divCarrito = document.getElementById(`producto-${idProd}`);

    // Verificar si ya existe una tarjeta para el producto en el carrito
    if (divCarrito) {
      // Si ya existe, incrementar el contador y actualizar la información en esa tarjeta
      contador = parseInt(divCarrito.dataset.contador) + 1;
      divCarrito.dataset.contador = contador;
      const displayContador = divCarrito.querySelector(".contador");
      displayContador.textContent = contador;
      const displayPrecio = divCarrito.querySelector(".precio");
      precioAcumulado = sumarPrecio();
      displayPrecio.textContent = `$${precioAcumulado}`;
    } else {
      // Si no existe, crear una nueva tarjeta y agregarla al carrito
      const nuevaTarjeta = document.createElement("div");
      nuevaTarjeta.classList.add(
        "container-fluid",
        "d-flex",
        "justify-content-center",
        "row",
        "producto"
      );
      nuevaTarjeta.id = `producto-${idProd}`;
      nuevaTarjeta.dataset.contador = contador;
      nuevaTarjeta.innerHTML = `
        <div class="card p-3 m-3" style="width: 16rem; height: 24rem;">
            <img src="${element.image}" class="card-img-top h-75" alt="...">
            <div class="card-body">
                <h6 class="card-title text-truncate">${element.title}</h6>
                <div class="d-flex rounded px-2 h-10">
                    <p class="fs-6 h-100 py-2 my-auto me-auto precio">$${precioAcumulado.toFixed(
                      2
                    )}</p>
                    <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                        <button type="button" class="btn btn-primary ms-auto restar"><i class="bi bi-dash-lg"></i></button>
                        <button type="button" class="btn btn-outline-secondary contador" disabled>${contador}</button>
                        <button type="button" class="btn btn-primary sumar"><i class="bi bi-plus-lg"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
      carro.appendChild(nuevaTarjeta);

      // Asignar divCarrito después de crearlo
      divCarrito = nuevaTarjeta;
    }

    // Obtener los botones de suma y resta por su clase
    const btnSumar = document.querySelector(`#producto-${idProd} .sumar`);
    const btnRestar = document.querySelector(`#producto-${idProd} .restar`);

    // Agregar eventos de clic a los botones de suma y resta
    btnSumar.addEventListener("click", function () {
      contador = contarItem();
      divCarrito.dataset.contador = contador;
      const displayContador = divCarrito.querySelector(".contador");
      displayContador.textContent = contador;
      precioAcumulado = sumarPrecio();
      const displayPrecio = divCarrito.querySelector(".precio");
      displayPrecio.textContent = `$${precioAcumulado}`;
    });

    btnRestar.addEventListener("click", function () {
      contador = restarItem();
      divCarrito.dataset.contador = contador;
      const displayContador = divCarrito.querySelector(".contador");
      displayContador.textContent = contador;
      const displayPrecio = divCarrito.querySelector(".precio");
      precioAcumulado = sumarPrecio();
      displayPrecio.textContent = `$${precioAcumulado}`;

      // Si el contador llega a 0, elimina la tarjeta del carrito
      if (contador < 1) {
        divCarrito.remove();
      }
    });
  });
}
