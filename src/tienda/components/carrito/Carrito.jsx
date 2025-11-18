import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootswatch/dist/journal/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Carrito.css";
import { productos } from "../../data/Products";
import { useAuth } from "../../auth/AuthProvider";

export default function Carrito() {
  const [cart, setCart] = useState([]);
  const [totalCompras, setTotalCompras] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + item.precio_nuevo * item.quantity, 0);
    setTotalCompras(total);
  }, [cart]);

  const addToCart = (producto) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === producto.id);
      if (existing) {
        if (existing.quantity >= producto.stock) {
          alert(`No puedes añadir más de ${producto.stock} unidades.`);
          return prev;
        }
        return prev.map(p => p.id === producto.id ? { ...p, quantity: p.quantity + 1 } : p);
      } else {
        return [...prev, { ...producto, quantity: 1 }];
      }
    });
  };

  const changeQuantity = (id, delta) => {
    setCart(prev =>
      prev
        .map(p => p.id === id
          ? { ...p, quantity: Math.max(1, Math.min(p.quantity + delta, productos.find(pr => pr.id === id).stock)) }
          : p
        )
        .filter(p => p.quantity > 0)
    );
  };

  const deleteFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const clearCart = () => setCart([]);

  const handleComprar = () => {
    if (cart.length === 0) {
      alert(" Tu carrito está vacío. Agrega productos antes de comprar.");
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    navigate("/TRABAJO-FULL-STACK-V2/comprar");
  };


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
      <main className="container py-5">
        <h2 className="mb-4">Productos</h2>
        <div className="row mb-5">
          {productos.map(producto => (
            <div key={producto.id} className="col-md-3 mb-3">
              <div className="card card-producto h-100">
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre} 
                  className="card-img-top"
                  style={{ width: "700px", height: "350px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text text-muted">{producto.categoria}</p>
                  <div className="mt-auto">
                    <span className="text-decoration-line-through">${producto.precio_descuento}</span>{" "}
                    <span className="fw-bold">${producto.precio_nuevo}</span>
                    <div className="d-grid mt-2">
                      <button className="btn btn-dark" onClick={() => addToCart(producto)}>Añadir</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Carrito de Compras</h2>
        <div className="table-responsive">
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
              {cart.map(item => (
                <tr key={item.id}>
                  <td>
                    <img 
                      src={item.imagen} 
                      alt={item.nombre} 
                      style={{ width: "100px", height: "60px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.nombre}</td>
                  <td>${item.precio_nuevo}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => changeQuantity(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => changeQuantity(item.id, 1)} disabled={item.quantity >= item.stock}>+</button>
                    </div>
                  </td>
                  <td>${item.precio_nuevo * item.quantity}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => deleteFromCart(item.id)}>Eliminar</button></td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" className="text-end fw-bold">Total</td>
                <td colSpan="2" className="fw-bold">${totalCompras}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-end mt-3">
          <button className="btn btn-secondary btn-lg me-2" onClick={clearCart}>Limpiar</button>
          <button className="btn btn-success btn-lg" onClick={handleComprar}>Comprar ahora</button>
        </div>
      </main>
    </>
  );
}

