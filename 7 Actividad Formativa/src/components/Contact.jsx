function Contact() {
  return (
    <section id="contacto" className="py-5">
      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <h2 className="fw-bold text-center mb-4">
              Contacto
            </h2>

            <div className="card shadow-sm">

              <div className="card-body p-4">

                <p className="text-center text-muted">
                  ¿Tienes alguna consulta? Escríbenos.
                </p>

                <div className="mb-3">
                  <label
                    htmlFor="nombre"
                    className="form-label"
                  >
                    Nombre
                  </label>

                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="correo"
                    className="form-label"
                  >
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    id="correo"
                    className="form-control"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="mensaje"
                    className="form-label"
                  >
                    Mensaje
                  </label>

                  <textarea
                    id="mensaje"
                    className="form-control"
                    rows="4"
                    placeholder="Escribe tu mensaje"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100"
                >
                  Enviar mensaje
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;
