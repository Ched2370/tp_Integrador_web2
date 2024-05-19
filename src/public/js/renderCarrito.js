const carro = document.getElementById("carrito");
const carritoContainer = document.getElementById("carrito");
const precioTotal = document.getElementById("precioTotal");

const crearCard = function agregarNuevoProducto(element) {
  let storage = JSON.parse(localStorage.getItem("lista")) || [];

  // contrlamos elementos
  let itemEnStorage = storage.find((e) => e.id === element.id);

  if (itemEnStorage) {
    element.cantidad = itemEnStorage.cantidad;
  } else {
    element.cantidad = 1;
  }

  const idProd = element.id;
  let divCarrito = document.getElementById(`producto-${idProd}`);

  // funcion para crear las cards
  const crearTarjeta = () => {
    const nuevaTarjeta = document.createElement("div");
    nuevaTarjeta.classList.add(
      "container-fluid",
      "d-flex",
      "justify-content-center",
      "row",
      "producto"
    );
    nuevaTarjeta.id = `producto-${idProd}`;
    nuevaTarjeta.innerHTML = `
            <div class="card p-3 m-3" style="width: 16rem; height: 24rem;">
                <img src="${element.image}" class="card-img-top h-75" alt="...">
                <div class="card-body">
                    <h6 class="card-title text-truncate">${element.title}</h6>
                    <div class="d-flex rounded px-2 h-10">
                        <p class="fs-6 h-100 py-2 my-auto me-auto precio">$${(
                          parseFloat(element.oferta.precioConDescuento) *
                          element.cantidad
                        ).toFixed(2)}</p>
                        <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                            <button type="button" class="btn btn-primary ms-auto restar"><i class="bi bi-dash-lg"></i></button>
                            <button type="button" class="btn btn-outline-secondary contador" disabled>${
                              element.cantidad
                            }</button>
                            <button type="button" class="btn btn-primary sumar"><i class="bi bi-plus-lg"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;
    carro.appendChild(nuevaTarjeta);
    divCarrito = nuevaTarjeta;

    // Añadir manejadores de eventos para los botones de incremento y decremento
    divCarrito.querySelector(".sumar").addEventListener("click", () => {
      element.cantidad++;
      actualizarCantidad(element);
    });

    divCarrito.querySelector(".restar").addEventListener("click", () => {
      element.cantidad--;
      actualizarCantidad(element);
      if (element.cantidad === 0) {
        eliminarProducto(element.id);
      }
    });
  };

  const actualizarCantidad = (element) => {
    let storage = JSON.parse(localStorage.getItem("lista")) || [];
    let itemIndex = storage.findIndex((e) => e.id === element.id);

    if (itemIndex !== -1) {
      storage[itemIndex].cantidad = element.cantidad;
      if (element.cantidad === 0) {
        storage.splice(itemIndex, 1);
      }
    } else {
      storage.push(element);
    }

    localStorage.setItem("lista", JSON.stringify(storage));
    if (element.cantidad > 0) {
      document
        .getElementById(`producto-${element.id}`)
        .querySelector(".contador").innerText = element.cantidad;
      document
        .getElementById(`producto-${element.id}`)
        .querySelector(".precio").innerText = `$${(
        parseFloat(element.oferta.precioConDescuento) * element.cantidad
      ).toFixed(2)}`;
    }
  };

  const eliminarProducto = (id) => {
    let divCarrito = document.getElementById(`producto-${id}`);
    if (divCarrito) {
      divCarrito.remove();
    }
  };

  if (divCarrito) {
    // Si la tarjeta ya existe, solo actualizar la cantidad
    divCarrito.querySelector(".contador").innerText = element.cantidad;
    divCarrito.querySelector(".precio").innerText = `$${(
      parseFloat(element.oferta.precioConDescuento) * element.cantidad
    ).toFixed(2)}`;
  } else {
    crearTarjeta();
  }

  // Función para agregar al storage
  (function agregarAlStorage() {
    if (itemEnStorage) {
      // Si el item ya está en el storage, actualizar la cantidad
      itemEnStorage.cantidad = element.cantidad;
    } else {
      // si no esta en el storage, añadirlo
      storage.push(element);
    }
    localStorage.setItem("lista", JSON.stringify(storage));
  })();
};

// funcion para cargar los productos al cargar la pagina
const cargarProductosDesdeStorage = () => {
  let storage = JSON.parse(localStorage.getItem("lista")) || [];
  storage.forEach((element) => {
    crearCard(element);
  });
};

// llamamos la funcion al cargar la pagina
document.addEventListener("DOMContentLoaded", cargarProductosDesdeStorage);

// DOM carrito
const btnEliminarCompra = document.getElementById("btnEliminarCompra");
const btnCarrito = document.getElementById('btnCarrito');
const badgeCantidad = document.createElement('span');
btnCarrito.appendChild(badgeCantidad);


// boton eliminar productos del carrito
btnEliminarCompra.addEventListener("click", () => {
  if (confirm("Desea cancelar la compra?")) {
    localStorage.clear("lista");
    const elementos = document.querySelectorAll(".producto");
    elementos.forEach((elem) => {
      elem.remove();
    });
    alert("compra cancelada con exito");
  }
});

let precioT = document.getElementById("precioTotal");
// actualizar precio total de la compra
function actualizarPrecioTotal() {
  let dataP = JSON.parse(localStorage.getItem("lista"));
  let aux, aux2;
  if (dataP && dataP.length > 0) {
    aux = dataP.reduce((acc, item) => {
      return (acc + parseFloat(item.oferta.precioConDescuento * item.cantidad));
    }, 0);
    aux2 = dataP.reduce((acc, item) => {
      return (acc + parseFloat(item.cantidad));
    }, 0);
    precioT.textContent = `Total -$ ${parseFloat(aux).toFixed(2)}`;
    badgeCantidad.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger';
    badgeCantidad.textContent = `${aux2}`;
  } else {
    precioT.textContent = "Total -$ 0.00";
    badgeCantidad.className = 'visually-hidden';
  }
}
setInterval(actualizarPrecioTotal, 1000);
