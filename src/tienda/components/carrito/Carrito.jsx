import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";
import { useEffect, useState } from "react";

export default function Carrito() {
  const { cart, changeQuantity, deleteFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [productosBack, setProductosBack] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/productos")
      .then(res => res.json())
      .then(data => setProductosBack(data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.precio_descuento * item.quantity, 
    0
  );

  const handleComprar = () => {
    if (cart.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    setError("");
    navigate("/TRABAJO-FULL-STACK-V2/comprar");
  };

  return (
    <main className="container py-5">
      <h2>Carrito de Compras</h2>

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      <div className="table-responsive mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => {
              const datos = productosBack.find((p) => p.id === item.id);

              return (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="cart-img"
                    />
                  </td>

                  <td>{item.nombre}</td>
                  <td>{item.precio_descuento} clp</td>

                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => changeQuantity(item.id, -1, datos?.stock || 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <span className="mx-2">{item.quantity}</span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => changeQuantity(item.id, 1, datos?.stock || item.stock)}
                        disabled={item.quantity >= (datos?.stock || 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td>{item.precio_descuento * item.quantity} clp</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}

            <tr>
              <td colSpan="4" className="text-end fw-bold">
                Total
              </td>
              <td colSpan="2" className="fw-bold">
                {total} clp
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-end mt-3">
        <button className="btn btn-primary me-2" onClick={clearCart}>
          Limpiar Carrito
        </button>
        <button className="btn btn-success" onClick={handleComprar}>
          Comprar ahora
        </button>
      </div>
    </main>
  );
}
