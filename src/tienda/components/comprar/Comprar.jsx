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
  const [calle, setCalle] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [comunaSeleccionada, setComunaSeleccionada] = useState('');
  const [indicaciones, setIndicaciones] = useState('');
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [errors, setErrors] = useState({});

  const validarFormulario = () => {
  const newErrors = {};

  if (!nombre.trim()) {
    newErrors.nombre = "El nombre es obligatorio.";
  } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(nombre)) {
    newErrors.nombre = "Solo se permiten letras.";
  }

  if (!apellidos.trim()) {
    newErrors.apellidos = "Los apellidos son obligatorios.";
  } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(apellidos)) {
    newErrors.apellidos = "Solo se permiten letras.";
  }

  if (!correo.trim()) {
    newErrors.correo = "El correo es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(correo)) {
    newErrors.correo = "Formato de correo no válido.";
  }

  if (!calle.trim()) {
    newErrors.calle = "La calle es obligatoria.";
  } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9 ]+$/.test(calle)) {
    newErrors.calle = "La calle solo puede contener letras y números.";
  }

  if (departamento.trim() && !/^[0-9]+$/.test(departamento)) {
    newErrors.departamento = "El departamento solo puede contener números.";
  }

  if (!regionSeleccionada) {
    newErrors.region = "Selecciona una región.";
  }

  if (!comunaSeleccionada) {
    newErrors.comuna = "Selecciona una comuna.";
  }

  if (indicaciones.trim() && !/^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9 ,.()\n-]*$/.test(indicaciones)) {
  newErrors.indicaciones = "Las indicaciones contienen caracteres no permitidos.";
}

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

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
     if (!validarFormulario()) {
    alert("Por favor corrige los campos marcados.");
    return;
  }

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

  return (
    <>
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
                      className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value.replace(/[0-9]/g, ""))}
                      required
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Apellidos *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value.replace(/[0-9]/g, ""))}
                  />
                  {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="correo">
                    Correo *
                  </label>
                  <input
                    id="correo"
                    className={`form-control ${errors.correo ? "is-invalid" : ""}`}
                    required
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
              </div>
              </div>

              <h4 className="mt-4">Dirección de entrega</h4>
              <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="calle">
                  Calle *
                </label>
                <input
                  type="text"
                  id="calle"
                  className={`form-control ${errors.calle ? "is-invalid" : ""}`}
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                  required
                />
                {errors.calle && (
                  <div className="invalid-feedback">{errors.calle}</div>
                )}
              </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Departamento (opcional)</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.departamento ? "is-invalid" : ""}`}
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    placeholder="Ej: 603" 
                  />
                  {errors.departamento && (
                    <div className="invalid-feedback">{errors.departamento}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Región *</label>
                  <select
                    className={`form-select ${errors.region ? "is-invalid" : ""}`}
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
                  {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Comuna *</label>
                  <select 
                    className={`form-select ${errors.comuna ? "is-invalid" : ""}`} 
                    value={comunaSeleccionada}
                    onChange={(e) => setComunaSeleccionada(e.target.value)}
                    required>
                    <option value="">Seleccione una comuna</option>
                    {comunasFiltradas.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>

                  {errors.comuna && (
                    <div className="invalid-feedback">{errors.comuna}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Indicaciones (opcional)</label>
                  <textarea
                    className={`form-control ${errors.indicaciones ? "is-invalid" : ""}`}
                    rows="3"
                    placeholder="Ej.: Entre calles, color del edificio..."
                    value={indicaciones}
                    onChange={(e) => setIndicaciones(e.target.value)}
                  ></textarea>

                  {errors.indicaciones && (
                    <div className="invalid-feedback">{errors.indicaciones}</div>
                  )}
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
    </>
  );
}
