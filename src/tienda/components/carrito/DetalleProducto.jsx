import { useParams } from "react-router-dom";
import { productos } from "../../data/Products";

export default function DetalleProducto() {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>
      Producto no encontrado
    </h2>;
  }

  return (
    <div style={{
      display: "flex",
      gap: "40px",
      padding: "40px 80px",
      alignItems: "flex-start",
      flexWrap: "wrap"
    }}>

      <div style={{ flex: "1", minWidth: "350px" }}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "700px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        />
      </div>

      <div style={{ flex: "1", minWidth: "350px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          {producto.nombre}
        </h1>

        <p style={{ fontSize: "18px", color: "#666" }}>{producto.categoria}</p>

        <div style={{ margin: "20px 0" }}>
          <span style={{
            textDecoration: "line-through",
            marginRight: "10px",
            color: "#999",
            fontSize: "18px"
          }}>
            {producto.precio_descuento} CLP
          </span>

          <span style={{
            fontWeight: "bold",
            fontSize: "32px",
            color: "#222"
          }}>
            {producto.precio_nuevo} CLP
          </span>
        </div>

        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          <strong>Descripción:</strong> {producto.descripcion}
        </p>

        <p style={{ fontSize: "18px" }}>
          <strong>Ingredientes:</strong> {producto.ingredientes}
        </p>

        <p style={{ fontSize: "18px" }}>
          <strong>Porciones:</strong> {producto.porciones}
          {producto.esPastel ? " personas" : ""}
        </p>

        <p style={{ fontSize: "18px" }}>
          <strong>Stock:</strong> {producto.stock} disponibles
        </p>
      </div>
    </div>
  );
}