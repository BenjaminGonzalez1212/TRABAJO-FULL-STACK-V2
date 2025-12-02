import { useEffect, useState } from "react";
import "bootswatch/dist/journal/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Home.css";
import { Link } from "react-router-dom";
import { productos } from "./tienda/data/Products.js";

export default function Home() {
  const productosDestacados = productos.filter((p) => p.esPastel).slice(0, 3);

  const imagenes = [
    "https://cdn.shopify.com/s/files/1/0163/5948/9636/files/1Y6A4999_2048x2048.jpg?v=1575910896",
    "https://i.etsystatic.com/16636374/r/il/ce7e38/4637045432/il_fullxfull.4637045432_nkch.jpg",
    "https://pm1.aminoapps.com/6145/06c7f54df462fc13a2ab8bf9304a81972f506b01_hq.jpg"
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % imagenes.length);
        setFade(true);
      }, 500);

    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <main className="hero-container">
        <div
          className={`hero-fondo ${fade ? "fade-in" : "fade-out"}`}
          style={{
            backgroundImage: `url('${imagenes[index]}')`,
          }}
        ></div>

        <div className="hero-content bg-dark bg-opacity-50 p-5 rounded shadow-lg">
          <h1 className="display-3 fw-bold text-white">¡Pastelería Gamery!</h1>

          <p className="lead mb-4">
            Sube de nivel con nuestros pasteles inspirados en tus videojuegos favoritos!
          </p>

          <Link to="/TRABAJO-FULL-STACK-V2/productos" className="btn btn-primary btn-lg me-3">
            Explore nuestros productos!
          </Link>

          <Link to="/TRABAJO-FULL-STACK-V2/pedido" className="btn btn-primary btn-lg">
            Haga un pedido hoy!
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