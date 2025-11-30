import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import "./Productos.css";

export default function Productos() {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const calcularPrecioConDescuento = (precioBase, porcentaje) => {
    return Math.round(precioBase - (precioBase * porcentaje) / 100);
  };

  useEffect(() => {
    fetch("/api/productos")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando productos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="container py-5">
        <h2 className="mb-4">Productos</h2>
        <p>Cargando productos...</p>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h2 className="mb-4">Productos</h2>

      <div className="row mb-5">
        {productos.map((producto) => {
          
          const precioFinal = isAuthenticated
            ? calcularPrecioConDescuento(
                producto.precio_descuento,
                producto.precio_nuevo
              )
            : producto.precio_descuento;

          return (
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

                    {isAuthenticated && (
                      <span className="text-muted text-decoration-line-through">
                        {producto.precio_descuento} CLP
                      </span>
                    )}

                    <span className="fw-bold ms-2">
                      {precioFinal} CLP
                    </span>

                    {isAuthenticated && (
                      <span className="badge bg-success ms-2">
                        -{producto.precio_nuevo}%
                      </span>
                    )}

                    <div className="d-grid mt-2">
                      <button
                        className="btn btn-dark mb-2"
                        onClick={() => addToCart({
                          ...producto,
                          precio: precioFinal
                        })}
                      >
                        Añadir
                      </button>

                      <Link
                        to={`/TRABAJO-FULL-STACK-V2/producto/${producto.id}`}
                        className="btn btn-outline-primary"
                      >
                        Ver Detalles
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
