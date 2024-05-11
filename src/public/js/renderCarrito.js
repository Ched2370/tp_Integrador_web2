let contadorBabgeItems = 0;
let sumaCompraTotal = 0;

// Agregar a carrito
function carrito(element) {
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
  const idProd = element.id;
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
};
