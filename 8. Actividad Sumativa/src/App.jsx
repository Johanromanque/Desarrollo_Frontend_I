import { useEffect, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import Offers from "./components/Offers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import ProductModal from "./components/ProductModal";
import CartToast from "./components/CartToast";

function App() {
  // Estado para almacenar los productos, el carrito y la búsqueda
  const [juegos, setJuegos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [mensajeToast, setMensajeToast] = useState("");

  // Carga dinámica del catálogo desde la API REST.
  // Si la API no está disponible, utiliza el JSON local como respaldo.
  useEffect(() => {
    async function cargarProductos() {
      try {
        setCargando(true);
        setError(null);

        const respuesta = await fetch("http://localhost:3000/api/productos");

        if (!respuesta.ok) {
          throw new Error("No fue posible cargar la API");
        }

        const datos = await respuesta.json();

        setJuegos(datos);
      } catch (errorApi) {
        console.warn(
          "API REST no disponible. Se utilizará el JSON local.",
          errorApi,
        );

        try {
          const respuestaLocal = await fetch(
            `${import.meta.env.BASE_URL}data/productos.json`,
          );

          if (!respuestaLocal.ok) {
            throw new Error("No fue posible cargar los datos locales");
          }

          const datosLocales = await respuestaLocal.json();

          setJuegos(datosLocales);
        } catch (errorLocal) {
          console.error(errorLocal);
          setError("No fue posible cargar el catálogo de videojuegos.");
        }
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  // Agrega un videojuego al carrito y muestra una notificacion temporal
  function agregarAlCarrito(juego) {
    setCarrito((carritoActual) => [...carritoActual, juego]);

    setMensajeToast(`✓ ${juego.titulo} agregado al carrito.`);
  }

  // Elimina un videojuego del carrito según su posición.
  function eliminarDelCarrito(indice) {
    setCarrito(carrito.filter((_, posicion) => posicion !== indice));
  }

  // Filtra el catálogo según el texto ingresado en el buscador.
  const juegosFiltrados = juegos.filter((juego) =>
    juego.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <>
      <Header cantidadCarrito={carrito.length} />

      <main>
        <Hero />

        <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />

        {cargando ? (
          <div className="container py-5 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>

            <p className="mt-3">Cargando videojuegos...</p>
          </div>
        ) : error ? (
          <div className="container py-5">
            <div className="alert alert-danger">{error}</div>
          </div>
        ) : (
          <ProductList
            juegos={juegosFiltrados}
            agregarAlCarrito={agregarAlCarrito}
            carrito={carrito}
            onVerDetalle={setJuegoSeleccionado}
          />
        )}

        <ShoppingCart
          carrito={carrito}
          eliminarDelCarrito={eliminarDelCarrito}
        />

        <Offers />

        <Contact />
      </main>

      <Footer />
      <ProductModal
        juego={juegoSeleccionado}
        onCerrar={() => setJuegoSeleccionado(null)}
      />
      <CartToast mensaje={mensajeToast} onCerrar={() => setMensajeToast("")} />
    </>
  );
}

export default App;
