import ProductCard from "./ProductCard";

function ProductList({ juegos, agregarAlCarrito }) {
  return (
    <section id="juegos" className="py-5">
      <div className="container">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            Nuestros videojuegos
          </h2>

          <p className="text-muted">
            Explora nuestro catálogo y descubre grandes ofertas.
          </p>

        </div>

        {juegos.length === 0 ? (

          <div className="alert alert-warning text-center">
            No se encontraron videojuegos.
          </div>

        ) : (

          <div className="row">
            {juegos.map((juego) => (
              <ProductCard
                key={juego.id}
                juego={juego}
                agregarAlCarrito={agregarAlCarrito}
              />
            ))}
          </div>

        )}

      </div>
    </section>
  );
}

export default ProductList;
