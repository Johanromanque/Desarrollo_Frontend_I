import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import Footer from "./components/Footer";

import juegos from "./data/juegos";

import Offers from "./components/Offers";
import Contact from "./components/Contact";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  function agregarAlCarrito(juego) {
    setCarrito([...carrito, juego]);
  }

  function eliminarDelCarrito(indice) {
    setCarrito(carrito.filter((_, posicion) => posicion !== indice));
  }

  const juegosFiltrados = juegos.filter((juego) =>
    juego.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <>
      <Header />

      <main>
        <Hero />

        <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />

        <ProductList
          juegos={juegosFiltrados}
          agregarAlCarrito={agregarAlCarrito}
        />

        <ShoppingCart
          carrito={carrito}
          eliminarDelCarrito={eliminarDelCarrito}
        />

        <Offers />

        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
