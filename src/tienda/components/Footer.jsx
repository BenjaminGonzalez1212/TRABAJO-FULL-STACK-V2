export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-4 mt-5">
      <div className="container">
        <div className="row text-start">

          <div className="col-md-4 mb-3">
            <h5>Sobre nosotros</h5>
            <p>
              En Pastelería Gamery combinamos el amor por los videojuegos y la repostería.
              Diseñamos pasteles únicos con diseños inspirados en tus video juegos favoritos.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-geo-alt-fill me-2"></i>Av. Gamer #123, Santiago, RM</li>
              <li><i className="bi bi-envelope-fill me-2"></i>PasteleriaGamery@gamery.cl</li>
              <li><i className="bi bi-telephone-fill me-2"></i>+56 9 4756 3875 3454</li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Síguenos</h5>
            <div>
              <a className="text-white me-3"><i className="bi bi-facebook fs-4"></i></a>
              <a className="text-white me-3"><i className="bi bi-instagram fs-4"></i></a>
              <a className="text-white"><i className="bi bi-twitter-x fs-4"></i></a>
            </div>
          </div>

        </div>

        <div className="text-center mt-3 border-top border-light pt-3">
          2025 Pastelería Gamery — Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}
