// Espera a que el contenido HTML esté completamente cargado.
document.addEventListener("DOMContentLoaded", function () {
  cargarJuegos();
  configurarEventos();
});

// Obtiene los videojuegos desde el archivo JSON.
function cargarJuegos() {
  fetch("./data/juegos.json")
    .then(function (response) {
      return response.json();
    })

    .then(function (juegos) {
      mostrarJuegos(juegos);
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

                        <p class="card-text">
                            ${juego.descripcion}
                        </p>

                    </div>

                </div>

            </article>
        `;
  });
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
      "Explora nuestro catálogo y descubre nuevos videojuegos.";
  });

  // Restaura el mensaje cuando el mouse sale de "Juegos".
  menuJuegos.addEventListener("mouseout", function () {
    mensajePrincipal.innerHTML =
      "Descubre videojuegos, novedades y grandes aventuras.";
  });

  // Cambia el mensaje cuando el usuario pasa el mouse sobre "Ofertas".
  menuOfertas.addEventListener("mouseover", function () {
    mensajePrincipal.innerHTML =
      "Revisa nuestras promociones y encuentra tu próxima aventura.";
  });

  // Restaura el mensaje al retirar el mouse de "Ofertas".
  menuOfertas.addEventListener("mouseout", function () {
    mensajePrincipal.innerHTML =
      "Descubre videojuegos, novedades y grandes aventuras.";
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