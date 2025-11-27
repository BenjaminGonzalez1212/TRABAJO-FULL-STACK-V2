import "bootswatch/dist/journal/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { Link } from "react-router-dom";
import { productos } from "./tienda/data/Products.js";

export default function Home() {
  const productosDestacados = productos.filter((p) => p.esPastel).slice(0, 3);

  return (
    <>
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
          <h1 className="display-3 fw-bold text-white">¡Pastelería Gamery!</h1>

          <p className="lead mb-4">
            Sube de nivel con nuestros pasteles inspirados en tus videojuegos favoritos!
          </p>

          <Link to="/TRABAJO-FULL-STACK-V2/productos" className="btn btn-primary btn-lg">
            Explorar productos
          </Link>
        </div>
      </main>

      <section className="container py-5">
        <h2 className="text-center text-primary fw-bold mb-4">Productos destacados</h2>

        <div className="row g-4">
          {productosDestacados.map((p) => (
            <div key={p.id} className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img 
                  src={p.imagen}
                  className="card-img-top img-producto"
                  alt={p.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="card-text">{p.descripcion}</p>
                  <Link to="/TRABAJO-FULL-STACK-V2/productos">
                    <button className="btn btn-primary">Ver más</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}