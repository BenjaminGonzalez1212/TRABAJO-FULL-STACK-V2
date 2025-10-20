import { useState } from "react";
import "bootswatch/dist/journal/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "./App.css";
import { useAuth } from "./tienda/auth/AuthProvider";

function App() {

  const auth = useAuth();
  let navContent;

  if (auth.isAuthenticated === false) {
    navContent = (
      <>
        <li className="nav-item"><a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/login">Login</a></li>
        <li className="nav-item"><a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/signup">SignUp</a></li>
      </>
    )
  } else {
    navContent = (
      <li className="nav-item">
        <button
          className="nav-link active"
          onClick={(e) => {
            e.preventDefault();
            auth.logout();
          }}>
          Logout
        </button>
      </li>
    )
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Pastelería Gamery</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/carrito">Productos</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  Más
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/TRABAJO-FULL-STACK-V2/blogs">Blog</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/TRABAJO-FULL-STACK-V2/administrador/inicio">Administrador</a>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">{navContent}</ul>
          </div>
        </div>
      </nav>

      <main
        className="text-center text-white d-flex align-items-center justify-content-center bg-dark"
        style={{
          backgroundImage: "url('https://cdn.shopify.com/s/files/1/0163/5948/9636/files/1Y6A4999_2048x2048.jpg?v=1575910896')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "80vh",
        }}
      >
        <div className="bg-dark bg-opacity-50 p-5 rounded shadow-lg">
          <h1 className="display-3 fw-bold text-white">
            ¡Pastelería Gamery!
          </h1>
          <p className="lead mb-4">
            Sube de nivel con nuestros pasteles inspirados en tus videojuegos favoritos!
          </p>
          <a href="/TRABAJO-FULL-STACK-V2/carrito" className="btn btn-primary btn-lg">
            Explorar productos
          </a>
        </div>
      </main>

      <section className="container py-5">
        <h2 className="text-center text-primary fw-bold mb-4">Productos destacados</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img
                src="img/pastel-mario.jpg"
                className="card-img-top"
                alt="Pastel Mario"
              />
              
              <div className="card-body">
                <h5 className="card-title">Pastel Mario</h5>
                <p className="card-text">
                  Torta de frambuesa manjar de Super Mario Bros con diseño de overol hecho en fondant
                </p>

                <a className="button" href="/TRABAJO-FULL-STACK-V2/carrito">
                  <button className="btn btn-primary">Ver más</button>
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img
                src="img/pastel-zelda.jpg"
                className="card-img-top"
                alt="Pastel Zelda"
              />
              <div className="card-body">
                <h5 className="card-title">Pastel Zelda</h5>
                <p className="card-text">
                  Torta tres leches de The Legend of Zelda Ocarina Of Time con exterior de fondant
                </p>
                
                <a className="button" href="/TRABAJO-FULL-STACK-V2/carrito">
                  <button className="btn btn-primary">Ver más</button>
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img
                src="img/pastel-minecraft.jpg"
                className="card-img-top"
                alt="Pastel Pokémon"
              />
              <div className="card-body">
                <h5 className="card-title">Pastel minecraft</h5>
                <p className="card-text">
                  Torta de mermelada de frambuesa de Minecraft, tal y como se ve en el juego con un diseño hecho en fondant
                </p>

                <a className="button" href="/TRABAJO-FULL-STACK-V2/carrito">
                  <button className="btn btn-primary">Ver más</button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <footer className="bg-primary text-white pt-4 mt-5">
        <div className="container">
          <div className="row text-start">
            <div className="col-md-4 mb-3">
              <h5>Sobre nosotros</h5>
              <p>
                En Pastelería Gamery combinamos el amor por los videojuegos y la repostería. Diseñamos pasteles únicos con diseños inspirados en tus video juegos favoritos
              </p>
            </div>

            <div className="col-md-4 mb-3">
              <h5>Contacto</h5>
              <ul className="list-unstyled">
                <li><i className="bi bi-geo-alt-fill me-2"></i> Av. Gamer #123, Santiago, RM</li>
                <li><i className="bi bi-envelope-fill me-2"></i> PasteleriaGamery@gamery.cl</li>
                <li><i className="bi bi-telephone-fill me-2"></i> +56 9 4756 3875 3454</li>
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
    </>
  );
}

export default App;

