import { useAuth } from "../auth/AuthProvider";
import { blog_in } from "../data/Blogs_in";
import "./Blogs.css";

export default function Blogs() {
  const auth = useAuth();
  let navContent;

  if (auth.isAuthenticated === false) {
    navContent = (
      <>
        <li className="nav-item"><a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/login">Login</a></li>
        <li className="nav-item"><a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/signup">SignUp</a></li>
      </>
    );
  } else {
    navContent = (
      <li className="nav-item">
        <button
          className="nav-link active btn btn-link"
          onClick={(e) => {
            e.preventDefault();
            auth.logout();
          }}
        >
          Logout
        </button>
      </li>
    );
  }

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/TRABAJO-FULL-STACK-V2/app">Pastelería Gamery</a>
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
              <li className="nav-item"><a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/app">Inicio</a></li>
              <li className="nav-item"><a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/carrito">Productos</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Contacto</a></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Más</a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Blog</a>
                  <a className="dropdown-item" href="#">Ubicación</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Ayuda</a>
                </div>
              </li>
              <li className="nav-item ms-3">
                <a className="nav-link" href="/TRABAJO-FULL-STACK-V2/carrito" title="Ir al carrito">
                  <i className="bi bi-cart-fill" style={{ fontSize: "1.5rem" }}></i>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">{navContent}</ul>
          </div>
        </div>
      </nav>

      <main className="container py-5">
        <h1 className="text-center mb-4 text-primary fw-bold">Blog de Pastelería Gamery</h1>
        <div className="blogs-container">
          
          {blog_in.map((blog) => (
            <div key={blog.id} className="blog-card">
              {blog.image ?
                (
                  <img src={blog.image} alt={blog.name} />
                ):
                
                (
                  <div
                    className="bg-light text-center py-5 text-muted"
                    style={{ fontSize: "0.9rem", height: "381px" }}
                  >
                    Sin imagen
                  </div>
                )
              }
              <div className="card-body">
                <h5 className="card-title">{blog.name}</h5>

                <p className="card-text">
                  <small className="text-muted">Publicado el {blog.date}</small>
                </p>

                <p className="card-desc">
                  <small className="text-muted">{blog.description}</small>
                </p>

                <a href = {`/TRABAJO-FULL-STACK-V2/blogs/${blog.id}`}>
                  <button className="btn btn-primary">Ver más</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-primary text-white text-center py-3 mt-auto">
        2025 Pastelería Gamery
      </footer>
    </>
  );
}
