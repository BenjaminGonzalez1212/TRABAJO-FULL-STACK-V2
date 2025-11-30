import { useEffect, useState } from "react";

export default function PedidoAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalDelete, setModalDelete] = useState({ visible: false, id: null });
  const [modalDetails, setModalDetails] = useState({ visible: false, pedido: null });

  const fetchPedidos = () => {
    fetch("/api/pedidos")
      .then(res => res.json())
      .then(data => {
        setPedidos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando pedidos:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const openDelete = (id) => {
    setModalDelete({ visible: true, id });
  };

  const openDetails = (pedido) => {
    setModalDetails({ visible: true, pedido });
  };

  const closeAll = () => {
    setModalDelete({ visible: false, id: null });
    setModalDetails({ visible: false, pedido: null });
  };

  const confirmarDelete = () => {
    fetch(`/api/pedidos/${modalDelete.id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          setPedidos(prev => prev.filter(p => p.id !== modalDelete.id));
          closeAll();
        } else {
          alert("Error eliminando pedido");
        }
      })
      .catch(err => console.error("Error eliminando pedido:", err));
  };

  const toggleState = (pedido) => {
    const newState = !pedido.state;

    fetch(`/api/pedidos/${pedido.id}/estado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: newState }),
    })
      .then(res => {
        if (res.ok) {
          setPedidos(prev =>
            prev.map(p =>
              p.id === pedido.id ? { ...p, state: newState } : p
            )
          );
        } else {
          alert("Error actualizando estado");
        }
      })
      .catch(err => console.error("Error actualizando estado:", err));
  };

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div>
      <h2>Administración de Pedidos</h2>

      <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Contacto</th>
            <th>Fecha</th>
            <th>Instrucciones</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>

        <tbody>
          {pedidos.map(p => (
            <tr key={p.id} style={{ background: p.state ? "#d3ffd3" : "white" }}>
              <td>{p.id}</td>
              <td><b>{p.nombres}</b> {p.apellidos}</td>
              <td>
                Email: {p.email}<br />
                Tel: {p.telefono}
              </td>
              <td>{p.date}</td>
              <td>{p.instrucciones || <i>Sin instrucciones</i>}</td>
              <td>
                <button
                  onClick={() => toggleState(p)}
                  style={{
                    background: p.state ? "green" : "orange",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "5px"
                  }}
                >
                  {p.state ? "Listo" : "Pendiente"}
                </button>
              </td>
              <td>
                <button onClick={() => openDetails(p)} style={{ marginRight: "5px", color: "blue" }}>
                  Ver detalles
                </button>
                <button onClick={() => openDelete(p.id)} style={{ color: "red" }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalDetails.visible && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.box}>
            <h4>Detalles del Pedido #{modalDetails.pedido.id}</h4>
            <p><b>Cliente:</b> {modalDetails.pedido.nombres} {modalDetails.pedido.apellidos}</p>
            <p><b>Email:</b> {modalDetails.pedido.email}</p>
            <p><b>Teléfono:</b> {modalDetails.pedido.telefono}</p>
            <p><b>Fecha:</b> {modalDetails.pedido.date}</p>
            <p><b>Instrucciones:</b> {modalDetails.pedido.instrucciones || "Sin instrucciones"}</p>
            <p><b>Productos:</b></p>
            <ul>
              {Array.isArray(modalDetails.pedido.productos) && modalDetails.pedido.productos.length > 0
                ? modalDetails.pedido.productos.map((prod, i) => (
                    <li key={i}>{prod.name} — {prod.quantity} x ${prod.price}</li>
                  ))
                : <li>Sin productos</li>
              }
            </ul>
            <p><b>Total:</b> ${modalDetails.pedido.total}</p>
            <button onClick={closeAll}>Cerrar</button>
          </div>
        </div>
      )}

      {modalDelete.visible && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.box}>
            <p>¿Eliminar este pedido?</p>
            <button onClick={confirmarDelete} style={{ color: "red", marginRight: "10px" }}>
              Eliminar
            </button>
            <button onClick={closeAll}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.5)"
  },
  box: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "350px",
    maxHeight: "80vh",
    overflowY: "auto",
    textAlign: "left"
  }
};
