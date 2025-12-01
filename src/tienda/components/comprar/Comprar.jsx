import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootswatch/dist/journal/bootstrap.min.css";

export default function Comprar() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [indicaciones, setIndicaciones] = useState("");

  const [errors, setErrors] = useState({});

  const validarFormulario = () => {
    const e = {};
    if (!nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!apellidos.trim()) e.apellidos = "Los apellidos son obligatorios.";
    if (!correo.trim()) e.correo = "El correo es obligatorio.";
    else if (!/^\S+@\S+\.\S+$/.test(correo)) e.correo = "Correo no válido.";
    if (!telefono.trim()) e.telefono = "El número es obligatorio.";
    else if (!/^[0-9 +()-]+$/.test(telefono)) e.telefono = "Número inválido.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const totalPago = storedCart.reduce(
      (acc, item) => acc + item.precio * item.quantity,
      0
    );
    setTotal(totalPago);
  }, []);

  const handleComprar = async () => {
    if (!validarFormulario()) {
      alert("Por favor corrige los campos marcados.");
      return;
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const pedido = {
      tipo: "ENCARGO",
      nombres: nombre,
      apellidos,
      email: correo,
      telefono,
      instrucciones: indicaciones,
      date: new Date().toISOString().split("T")[0],
      total,
      items: cart.map((item) => ({
          nombreProducto: item.nombre,
          categoria: item.categoria,
          precio: item.precio,
          cantidad: item.quantity
      }))
    };

    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!res.ok) {
        alert("Error al registrar el pedido.");
        return;
      }

      alert("Compra realizada con éxito. ¡Gracias!");
      localStorage.removeItem("cart");

      setCart([]);
      setTotal(0);

      setNombre("");
      setApellidos("");
      setCorreo("");
      setTelefono("");
      setIndicaciones("");

      navigate("/TRABAJO-FULL-STACK-V2/");
    } catch (err) {
      console.error("Error al registrar pedido:", err);
      alert("Error al enviar el pedido.");
    }
  };

  return (
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
                      <td>${item.precio}</td>
                      <td>{item.quantity}</td>
                      <td>${item.precio * item.quantity}</td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan="4" className="text-end fw-bold">
                      Total
                    </td>
                    <td className="fw-bold">${total}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr />

            <h4 className="mt-4">Datos de contacto</h4>

            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre *</label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                {errors.nombre && (
                  <div className="invalid-feedback">{errors.nombre}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Apellidos *</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.apellidos ? "is-invalid" : ""
                  }`}
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
                {errors.apellidos && (
                  <div className="invalid-feedback">{errors.apellidos}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Correo *</label>
                <input
                  type="email"
                  className={`form-control ${
                    errors.correo ? "is-invalid" : ""
                  }`}
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                {errors.correo && (
                  <div className="invalid-feedback">{errors.correo}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Número de contacto *</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.telefono ? "is-invalid" : ""
                  }`}
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+56 9 1234 5678"
                />
                {errors.telefono && (
                  <div className="invalid-feedback">{errors.telefono}</div>
                )}
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Detalles / Indicaciones</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={indicaciones}
                  onChange={(e) => setIndicaciones(e.target.value)}
                  placeholder="Detalles adicionales..."
                />
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
  );
}
