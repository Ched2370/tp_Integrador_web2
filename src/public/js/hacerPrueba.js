const crearCartaEnCarrito = function crearItemEnCarrito(producto, contador = 1) {
  const idProd = producto.id;
  let divCarrito = document.getElementById(`producto-${idProd}`);

  if (!divCarrito) {
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
              <img src="${producto.image}" class="card-img-top h-75" alt="...">
              <div class="card-body">
                  <h6 class="card-title text-truncate">${producto.title}</h6>
                  <div class="d-flex rounded px-2 h-10">
                      <p class="fs-6 h-100 py-2 my-auto me-auto precio">$${producto.price.toFixed(2)}</p>
                      <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-primary ms-auto restar"><i class="bi bi-dash-lg"></i></button>
                          <button type="button" class="btn btn-outline-secondary contador" disabled>${contador}</button>
                          <button type="button" class="btn btn-primary sumar"><i class="bi bi-plus-lg"></i></button>
                      </div>
                  </div>
              </div>
          </div>`;
    carro.appendChild(nuevaTarjeta);
    divCarrito = nuevaTarjeta;
  }
};
