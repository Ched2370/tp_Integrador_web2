const carro = document.getElementById("carrito");
const carritoContainer = document.getElementById("carrito"); // Cambio de ID a carritoContainer

const crearCard = function agregarNuevoProducto(element) {
    let storage = JSON.parse(localStorage.getItem('lista')) || [];

    // Verificar si el elemento ya está en el storage
    let itemEnStorage = storage.find(e => e.id === element.id);

    if (itemEnStorage) {
        element.cantidad = itemEnStorage.cantidad;
    } else {
        element.cantidad = 1;
    }

    const idProd = element.id;
    let divCarrito = document.getElementById(`producto-${idProd}`);

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
                        <p class="fs-6 h-100 py-2 my-auto me-auto precio">$${(parseFloat(element.oferta.precioConDescuento) * element.cantidad).toFixed(2)}</p>
                        <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                            <button type="button" class="btn btn-primary ms-auto restar"><i class="bi bi-dash-lg"></i></button>
                            <button type="button" class="btn btn-outline-secondary contador" disabled>${element.cantidad}</button>
                            <button type="button" class="btn btn-primary sumar"><i class="bi bi-plus-lg"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;
        carro.appendChild(nuevaTarjeta);
        divCarrito = nuevaTarjeta;

        // Añadir manejadores de eventos para los botones de incremento y decremento
        divCarrito.querySelector('.sumar').addEventListener('click', () => {
            element.cantidad++;
            actualizarCantidad(element);
        });

        divCarrito.querySelector('.restar').addEventListener('click', () => {
            element.cantidad--;
            actualizarCantidad(element);
            if (element.cantidad === 0) {
                eliminarProducto(element.id);
            }
        });
    }

    const actualizarCantidad = (element) => {
        let storage = JSON.parse(localStorage.getItem('lista')) || [];
        let itemIndex = storage.findIndex(e => e.id === element.id);

        if (itemIndex !== -1) {
            storage[itemIndex].cantidad = element.cantidad;
            if (element.cantidad === 0) {
                storage.splice(itemIndex, 1); // Eliminar el elemento del array si la cantidad es 0
            }
        } else {
            storage.push(element);
        }

        localStorage.setItem('lista', JSON.stringify(storage));
        if (element.cantidad > 0) {
            document.getElementById(`producto-${element.id}`).querySelector('.contador').innerText = element.cantidad;
            document.getElementById(`producto-${element.id}`).querySelector('.precio').innerText = `$${(parseFloat(element.oferta.precioConDescuento) * element.cantidad).toFixed(2)}`;
        }
    }

    const eliminarProducto = (id) => {
        let divCarrito = document.getElementById(`producto-${id}`);
        if (divCarrito) {
            divCarrito.remove();
        }
    }

    if (divCarrito) {
        // Si la tarjeta ya existe, solo actualizar la cantidad
        divCarrito.querySelector('.contador').innerText = element.cantidad;
        divCarrito.querySelector('.precio').innerText = `$${(parseFloat(element.oferta.precioConDescuento) * element.cantidad).toFixed(2)}`;
    } else {
        crearTarjeta();
    }

    // Función para agregar al storage
    (function agregarAlStorage() {
        if (itemEnStorage) {
            // Si el item ya está en el storage, actualizar la cantidad
            itemEnStorage.cantidad = element.cantidad;
        } else {
            // Si el item no está en el storage, añadirlo
            storage.push(element);
        }
        localStorage.setItem('lista', JSON.stringify(storage));
    })();
}

// Función para cargar los productos desde localStorage al cargar la página
const cargarProductosDesdeStorage = () => {
    let storage = JSON.parse(localStorage.getItem('lista')) || [];
    storage.forEach(element => {
        crearCard(element);
    });
}

// Llamar a la función para cargar los productos cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarProductosDesdeStorage);
