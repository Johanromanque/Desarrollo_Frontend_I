
function ProductCard({ juego, agregarAlCarrito }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">

        <img
          src={juego.imagen}
          className="card-img-top"
          alt={juego.titulo}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title">
            {juego.titulo}
          </h5>

          <p className="text-muted">
            {juego.genero}
          </p>

          <p className="card-text">
            {juego.descripcion}
          </p>

          <div className="mt-auto">

            <p className="mb-1">
              <span className="text-decoration-line-through text-muted">
                ${juego.precioNormal.toLocaleString("es-CL")}
              </span>
            </p>

            <p className="fs-5 fw-bold text-danger">
              Oferta: ${juego.precioOferta.toLocaleString("es-CL")}
            </p>

            <button
              className="btn btn-primary w-100"
              onClick={() => agregarAlCarrito(juego)}
            >
              Agregar al carrito
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
