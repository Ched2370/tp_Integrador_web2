const carro = document.getElementById("carrito");

const invocarCarrito = function carrito(element, contador = 1) {
  let compra = JSON.parse(localStorage.getItem('lista')) || [];

  console.log(`contador inicio = ${contador}`);

  let precioAcumulado = parseFloat(element.oferta.precioConDescuento);

  function sumarPrecio() {
    precioAcumulado = parseFloat(element.oferta.precioConDescuento) * contador;
    return precioAcumulado.toFixed(2);
  }

  function contarItem() {
    contador++;
    agregarAlStorage();
    return contador;
  }

  function restarItem() {
    if (contador > 0) {
      contador--;
      precioAcumulado -= element.oferta.precioConDescuento;
      agregarAlStorage();
    } else {
      contador = 0;
      precioAcumulado = 0;
    }
    return contador;
  }

  const idProd = element.id;
  let divCarrito = document.getElementById(`producto-${idProd}`);

  if (divCarrito) {
    contador = parseInt(divCarrito.dataset.contador) + 1;
    divCarrito.dataset.contador = contador;

    const displayContador = divCarrito.querySelector(".contador");
    displayContador.textContent = contador;
    
    const displayPrecio = divCarrito.querySelector(".precio");
    precioAcumulado = sumarPrecio();
    displayPrecio.textContent = `$${precioAcumulado}`;
  } else {
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
    divCarrito = nuevaTarjeta;
  }

  const btnSumar = document.querySelector(`#producto-${idProd} .sumar`);
  const btnRestar = document.querySelector(`#producto-${idProd} .restar`);

  btnSumar.addEventListener("click", function () {
    contador = contarItem();
    divCarrito.dataset.contador = contador;

    const displayContador = divCarrito.querySelector(".contador");
    displayContador.textContent = contador;
    precioAcumulado = sumarPrecio();

    const displayPrecio = divCarrito.querySelector(".precio");
    displayPrecio.textContent = `$${precioAcumulado}`;
    element.cantidad = contador;
 

  });
  
  btnRestar.addEventListener("click", function () {

    contador = restarItem();
    divCarrito.dataset.contador = contador;

    const displayContador = divCarrito.querySelector(".contador");
    displayContador.textContent = contador;

    const displayPrecio = divCarrito.querySelector(".precio");
    precioAcumulado = sumarPrecio();
    displayPrecio.textContent = `$${precioAcumulado}`;

    console.log(`${contador}`);
  
    if (!contador > 0) {
      divCarrito.remove();
      // Eliminar el elemento del localStorage si el contador llega a cero
      compra = compra.filter(item => item.id !== element.id);
      localStorage.setItem('lista', JSON.stringify(compra));
    } else {
      element.cantidad = contador; 
    }
  });

  //para saber si existe el item en el localstorage
  function propiedadExiste() {
    for (const item of compra) {
      if (item.id === element.id) {
        return true;
      }
    }
    return false;
  }
  

  function agregarAlStorage() {
    if (contador === 0) {
      // Si la cantidad es 0, eliminar el elemento del carrito
      for (let i = 0; i < compra.length; i++) {
        if (compra[i].id === element.id) {
          compra.splice(i, 1); // Remover el elemento del array
          break;
        }
      }
    } else {
      if (!propiedadExiste()) {
        //console.log('El elemento no existe en el almacenamiento local');
        element.cantidad = contador;
        compra.push(element);
      } else {
        //console.log('El elemento ya existe en el almacenamiento local');
        // Modificar la propiedad cantidad del elemento existente
        for (const item of compra) {
          if (item.id === element.id) {
            item.cantidad = contador;
            break;
          }
        }
      }
    }
    localStorage.setItem('lista', JSON.stringify(compra));
  }
  agregarAlStorage();
}

if (localStorage.getItem('lista')) {
  const lista = JSON.parse(localStorage.getItem('lista'));
  lista.forEach(async e => {
    await invocarCarrito(e, e.cantidad);
  });
}

