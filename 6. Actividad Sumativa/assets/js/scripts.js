let carrito = [];

let juegosDisponibles = [];

// Espera a que el contenido HTML esté completamente cargado.
document.addEventListener("DOMContentLoaded", function () {
  cargarJuegos();
  configurarEventos();
  configurarBusqueda();
});

// Obtiene los videojuegos desde el archivo JSON.
function cargarJuegos() {
  fetch("./assets/data/juegos.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("No fue posible cargar los videojuegos.");
      }

      return response.json();
    })

    .then(function (juegos) {
      juegosDisponibles = juegos;
      mostrarJuegos(juegosDisponibles);
    })

    .catch(function (error) {
      const contenedor = document.getElementById("lista_juegos");

      contenedor.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger text-center" role="alert">
                No fue posible cargar los videojuegos.
            </div>
        </div>
    `;

      console.error("Error al cargar los juegos:", error);
    });
}

// Muestra los videojuegos dinámicamente en la página.
function mostrarJuegos(juegos) {
  const contenedor = document.getElementById("lista_juegos");

  contenedor.innerHTML = "";

  if (juegos.length === 0) {
    contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center" role="alert">
                    No se encontraron videojuegos que coincidan con la búsqueda.
                </div>
            </div>
          `;
    return;
  }

  juegos.forEach(function (juego) {
    contenedor.innerHTML += `
            <article class="col">

                <div class="card h-100 shadow-sm">

                    <img src="${juego.imagen}"
                        class="card-img-top"
                        alt="${juego.titulo}">

                    <div class="card-body">

                        <h3 class="card-title h5">
                            ${juego.titulo}
                        </h3>

                        <p class="text-primary fw-semibold">
                            ${juego.genero}
                        </p>

                        <p class="card-text fw-bold">
                            $${juego.precio.toLocaleString("es-CL")}
                        </p>

                        <p class="card-text descripcion-juego">
                            ${juego.descripcion}
                        </p>

                        <button class="btn btn-primary boton-agregar" data-id="${juego.id}">
                            Agregar al carrito
                        </button>

                    </div>

                </div>

            </article>
        `;
  });

  const botonesAgregar = document.querySelectorAll(".boton-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", function () {
      const idJuego = Number(this.dataset.id);

      const juegoSeleccionado = juegos.find((juego) => juego.id === idJuego);

      agregarAlCarrito(juegoSeleccionado);
    });
  });

  configurarEventosTarjetas();
}

// Agrega un videojuego al carrito y actualiza su contenido.
function agregarAlCarrito(juego) {
  carrito.push(juego);

  actualizarCarrito();
}

// Actualiza visualmente los productos y el total del carrito.
function actualizarCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  const carritoVacio = document.getElementById("carrito-vacio");
  const totalCarrito = document.getElementById("total-carrito");

  listaCarrito.innerHTML = "";

  // Si el carrito está vacío, muestra el mensaje correspondiente.
  if (carrito.length === 0) {
    carritoVacio.style.display = "block";
    totalCarrito.textContent = "$0";
    return;
  }

  carritoVacio.style.display = "none";

  // Crea dinámicamente los productos agregados al carrito.
  carrito.forEach((juego) => {
    const producto = document.createElement("div");

    producto.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "border-bottom",
      "py-2",
    );

    producto.innerHTML = `
      <div>
        <strong>${juego.titulo}</strong>

        <span class="ms-2">
          $${juego.precio.toLocaleString("es-CL")}
        </span>
      </div>

      <button
        class="btn btn-danger btn-sm boton-eliminar"
        data-id="${juego.id}">
        Eliminar
      </button>
    `;

    listaCarrito.appendChild(producto);
  });

  // Configura los botones para eliminar productos.
  const botonesEliminar = document.querySelectorAll(".boton-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", function () {
      const idJuego = Number(this.dataset.id);

      eliminarDelCarrito(idJuego);
    });
  });

  // Calcula el total del carrito.
  const total = carrito.reduce((acumulador, juego) => {
    return acumulador + juego.precio;
  }, 0);

  totalCarrito.textContent = `$${total.toLocaleString("es-CL")}`;
}

// Elimina un videojuego seleccionado del carrito.
function eliminarDelCarrito(idJuego) {
  const indice = carrito.findIndex((juego) => juego.id === idJuego);

  if (indice !== -1) {
    carrito.splice(indice, 1);
  }

  actualizarCarrito();
}

// Configura los eventos de interacción de la página.
function configurarEventos() {
  const menuJuegos = document.getElementById("menu_juegos");
  const menuOfertas = document.getElementById("menu_ofertas");
  const mensajePrincipal = document.getElementById("mensaje_principal");
  const botonOfertas = document.getElementById("boton_ofertas");
  const seccionOfertas = document.getElementById("ofertas");

  // Cambia el mensaje cuando el usuario pasa el mouse sobre "Juegos".
  menuJuegos.addEventListener("mouseover", function () {
    mensajePrincipal.innerHTML =
      "<strong>Explora nuestro catálogo y descubre nuevos videojuegos.</strong>";

    mensajePrincipal.classList.add("text-primary");
  });

  // Restaura el mensaje cuando el mouse sale de "Juegos".
  menuJuegos.addEventListener("mouseout", function () {
    mensajePrincipal.innerHTML =
      "Descubre videojuegos, novedades y grandes aventuras.";

    mensajePrincipal.classList.remove("text-primary");
  });

  // Cambia el mensaje cuando el usuario pasa el mouse sobre "Ofertas".
  menuOfertas.addEventListener("mouseover", function () {
    mensajePrincipal.innerHTML =
      "<strong>Revisa nuestras promociones y encuentra tu próxima aventura.</strong>";

    mensajePrincipal.classList.add("text-primary");
  });

  // Restaura el mensaje al retirar el mouse de "Ofertas".
  menuOfertas.addEventListener("mouseout", function () {
    mensajePrincipal.innerHTML =
      "Descubre videojuegos, novedades y grandes aventuras.";

    mensajePrincipal.classList.remove("text-primary");
  });

  // Muestra contenido dinámico al presionar el botón de ofertas.
  botonOfertas.addEventListener("click", function () {
    seccionOfertas.innerHTML = `
            <h2>Ofertas de la semana</h2>

            <p class="lead">
                ¡Tenemos promociones especiales para nuestros jugadores!
            </p>

            <p>
                Revisa nuestro catálogo y descubre nuevos títulos.
            </p>
        `;

    seccionOfertas.scrollIntoView({
      behavior: "smooth",
    });
  });
}

// Configura el formulario de búsqueda de videojuegos.
function configurarBusqueda() {
  const formBusqueda = document.getElementById("form-busqueda");
  const inputBusqueda = document.getElementById("busqueda");

  formBusqueda.addEventListener("submit", function (event) {
    event.preventDefault();

    const textoBusqueda = inputBusqueda.value.trim().toLowerCase();

    const juegosFiltrados = juegosDisponibles.filter(function (juego) {
      return juego.titulo.toLowerCase().includes(textoBusqueda);
    });

    mostrarJuegos(juegosFiltrados);
  });
}

// Configura eventos mouseover y mouseout en las tarjetas.
function configurarEventosTarjetas() {
  const tarjetas = document.querySelectorAll(".card");

  tarjetas.forEach(function (tarjeta) {
    const titulo = tarjeta.querySelector(".card-title").textContent.trim();
    const descripcion = tarjeta.querySelector(".descripcion-juego");
    const textoOriginal = descripcion.innerHTML;

    // Cambia el texto de la tarjeta al pasar el mouse.
    tarjeta.addEventListener("mouseover", function () {
      descripcion.innerHTML = "<strong>Estás viendo: " + titulo + "</strong>";
    });

    // Restaura la descripción original al retirar el mouse.
    tarjeta.addEventListener("mouseout", function () {
      descripcion.innerHTML = textoOriginal;
    });
  });
}
