import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootswatch/dist/journal/bootstrap.min.css";

export default function Comprar() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState("");
  const [comunasFiltradas, setComunasFiltradas] = useState([]);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const totalPago = storedCart.reduce(
      (acc, item) => acc + item.precio_nuevo * item.quantity,
      0
    );
    setTotal(totalPago);

    import("../../data/zonas.js").then((mod) => {
      setRegiones(mod.regiones);
      setComunas(mod.comunas);
    });
  }, []);

  useEffect(() => {
    if (regionSeleccionada) {
      const filtradas = comunas.filter(
        (c) => c.regionId === parseInt(regionSeleccionada)
      );
      setComunasFiltradas(filtradas);
    } else {
      setComunasFiltradas([]);
    }
  }, [regionSeleccionada, comunas]);

  const handleComprar = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de comprar.");
      return;
    }

    alert("Compra realizada con éxito. ¡Gracias por tu pedido!");
    localStorage.removeItem("cart");
    setCart([]);
    setTotal(0);
    navigate("/TRABAJO-FULL-STACK-V2/app");
  };

  const handleVolverCarrito = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/TRABAJO-FULL-STACK-V2/carrito");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span
            className="navbar-brand"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/TRABAJO-FULL-STACK-V2/app")}
          >
            Pastelería Gamery
          </span>
          <div className="d-flex">
            <button className="btn btn-light" onClick={handleVolverCarrito}>
              ← Volver al Carrito
            </button>
          </div>
        </div>
      </nav>

      <div className="container my-5">
        <div className="card shadow-lg p-4">
          <h3 className="text-center mb-4">🛒 Carrito de Compra</h3>

          {cart.length === 0 ? (
            <div className="alert alert-warning text-center">
              Tu carrito está vacío
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-primary">
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            style={{ width: "50px", borderRadius: "8px" }}
                          />
                        </td>
                        <td>{item.nombre}</td>
                        <td>${item.precio_nuevo}</td>
                        <td>{item.quantity}</td>
                        <td>${item.precio_nuevo * item.quantity}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="4" className="text-end fw-bold">
                        Total
                      </td>
                      <td colSpan="2" className="fw-bold">
                        ${total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr />
              <h4 className="mt-4">Información del cliente</h4>
              <div className="row mt-3">
                <div className="col-md-6 mb-3">
                <label htmlFor="nombre" className="form-label">Nombre *</label>
                    <input
                      id="nombre"
                      type="text"
                      className="form-control"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value.replace(/[0-9]/g, ''))}
                      required
                    />
              </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Apellidos *</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="correo">
                    Correo *
                  </label>
                  <input
                    id="correo"
                    className="form-control"
                    required
                    type="email"
                  />
              </div>
              </div>

              <h4 className="mt-4">Dirección de entrega</h4>
              <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="calle">
                  Calle *
                </label>
                <input
                  id="calle"
                  className="form-control"
                  required
                  type="text"
                />
              </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Departamento (opcional)</label>
                  <input type="text" className="form-control" placeholder="Ej: 603" />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Región *</label>
                  <select
                    className="form-select"
                    onChange={(e) => setRegionSeleccionada(e.target.value)}
                    value={regionSeleccionada}
                    required
                  >
                    <option value="">Seleccione una región</option>
                    {regiones.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Comuna *</label>
                  <select className="form-select" required>
                    <option value="">Seleccione una comuna</option>
                    {comunasFiltradas.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Indicaciones (opcional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Ej.: Entre calles, color del edificio..."
                  ></textarea>
                </div>
              </div>

              <div className="text-end mt-4">
                <button onClick={handleComprar} className="btn btn-success btn-lg">
                  Comprar ahora
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="bg-dark text-light text-center py-3 mt-5">
        © 2025 Pastelería Gamery — Todos los derechos reservados 
      </footer>
    </>
  );
}
