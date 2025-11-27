import { Link } from "react-router-dom";
import { productos } from "../../data/Products";
import { useCart } from "../../context/CartContext";
import "./Productos.css";

export default function Productos() {
  const { addToCart } = useCart();

  return (
    <main className="container py-5">
      <h2 className="mb-4">Productos</h2>

      <div className="row mb-5">
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-3 mb-3">
            <div className="card card-producto h-100">
              <Link to={`/TRABAJO-FULL-STACK-V2/producto/${producto.id}`}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="card-img-top product-img"
                />
              </Link>

              <div className="card-body d-flex flex-column">
                <Link
                  to={`/TRABAJO-FULL-STACK-V2/producto/${producto.id}`}
                  className="text-decoration-none"
                >
                  <h5 className="card-title">{producto.nombre}</h5>
                </Link>

                <p className="card-text text-muted">{producto.categoria}</p>

                <div className="mt-auto">
                  <span className="text-decoration-line-through">
                    {producto.precio_descuento} clp
                  </span>{" "}
                  <span className="fw-bold">{producto.precio_nuevo} clp</span>

                  <div className="d-grid mt-2">
                    <button
                      className="btn btn-dark"
                      onClick={() => addToCart(producto)}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

        <div className="text-center mt-4">
            <Link 
                to="/TRABAJO-FULL-STACK-V2/carrito" 
                className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
            >
                Ir al carrito 
                <i className="bi bi-cart3" style={{ fontSize: "1.4rem", marginLeft: "8px" }}></i>
            </Link>
        </div>
    </main>
  );
};