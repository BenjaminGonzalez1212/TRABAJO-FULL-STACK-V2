import { useEffect, useState } from "react";

export default function CatalogoAdmin() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalDelete, setModalDelete] = useState({ visible: false, id: null });
  const [modalAdd, setModalAdd] = useState({ visible: false });
  const [modalEdit, setModalEdit] = useState({ visible: false, id: null });
  const [errorsAdd, setErrorsAdd] = useState("");
  const [errorsEdit, setErrorsEdit] = useState("");

  const emptyProduct = {
    esPastel: 0,
    nombre: "",
    categoria: "",
    precio_nuevo: "",
    precio_descuento: "",
    stock: "",
    imagen: "",
    descripcion: "",
    ingredientes: "",
    porciones: "",
    peso: "",
    preparacion: ""
  };

  const [newProd, setNewProd] = useState(emptyProduct);
  const [editProd, setEditProd] = useState(emptyProduct);

  const fetchProductos = () => {
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
  };

  const ValidateProduct = (prod, setError) => {
    const obligatorios = [
      "nombre",
      "categoria",
      "precio_nuevo",
      "precio_descuento",
      "imagen",
      "descripcion",
      "ingredientes",
      "porciones",
      "peso",
      "preparacion"
    ];

    for (const campo of obligatorios) {
      if (!prod[campo] && prod[campo] !== 0) {
        setError(`Se deben rellenar todos los campos / Falta: ${campo}`);
        return false;
      }
    }

  const numeros = ["precio_nuevo", "precio_descuento", "stock", "porciones"];

  const nombresBonitos = {
    precio_nuevo: "Descuento",
    precio_descuento: "Precio",
    stock: "Stock",
    porciones: "Porciones"
  };

  for (const campo of numeros) {
    if (Number(prod[campo]) < 0) {
      const nombreMostrar = nombresBonitos[campo] || campo;
      setError(`El campo "${nombreMostrar}" no puede ser negativo`);
      return false;
    }
  }
    return true;
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const openDelete = (id) => {
    setModalDelete({ visible: true, id });
  };

  const openAdd = () => {
    setErrorsAdd("");
    setNewProd(emptyProduct);
    setModalAdd({ visible: true });
  };

  const openEdit = (prod) => {
    setErrorsEdit("");
    setEditProd({ ...prod });
    setModalEdit({ visible: true, id: prod.id });
  };

  const closeAll = () => {
    setModalAdd({ visible: false });
    setModalDelete({ visible: false, id: null });
    setModalEdit({ visible: false, id: null });
  };

  const confirmDelete = () => {
    fetch(`/api/productos/${modalDelete.id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          setProductos(productos.filter(p => p.id !== modalDelete.id));
          closeAll();
        } else alert("Error eliminando producto");
      });
  };

  const confirmAdd = () => {
    if (!ValidateProduct(newProd, setErrorsAdd)) return;

    fetch(`/api/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProd)
    })
      .then(res => {
        if (res.ok) {
          fetchProductos();
          closeAll();
        } else setErrorsAdd("Error agregando producto");
      })
      .catch(err => console.error("Error:", err));
  };

  const confirmEdit = () => {
    if (!ValidateProduct(editProd, setErrorsEdit)) return;

    fetch(`/api/productos/${modalEdit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editProd)
    })
      .then(res => {
        if (res.ok) {
          fetchProductos();
          closeAll();
        } else setErrorsEdit("Error editando producto");
      })
      .catch(err => console.error("Error:", err));
  };


  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h2>Administración del Catálogo</h2>

      <button onClick={openAdd} style={{ color: "green" }}>
        Añadir Producto
      </button>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio Nuevo</th>
            <th>Precio Descuento</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Opciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>{p.precio_nuevo}</td>
              <td>{p.precio_descuento}</td>
              <td>{p.stock}</td>
              <td>
                <img src={p.imagen} alt="" width="80" />
              </td>
              <td>
                <button onClick={() => openDelete(p.id)} style={{ color: "red" }}>
                  Eliminar
                </button>
                <button onClick={() => openEdit(p)} style={{ color: "orange" }}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalDelete.visible && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.box}>
            <p>¿Eliminar este producto?</p>
            <button onClick={confirmDelete} style={{ color: "red" }}>Eliminar</button>
            <button onClick={closeAll}>Cancelar</button>
          </div>
        </div>
      )}

      {modalAdd.visible && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.box}>
            <h3>Nuevo Producto</h3>

            {errorsAdd && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                {errorsAdd}
              </p>
            )}

            <label>Es Pastel</label>
            <input
              type="checkbox"
              checked={newProd.esPastel}
              onChange={e => setNewProd({ ...newProd, esPastel: e.target.checked ? 1 : 0 })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Nombre</label>
            <input
              type="text"
              value={newProd.nombre}
              onChange={e => setNewProd({ ...newProd, nombre: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Categoría</label>
            <input
              type="text"
              value={newProd.categoria}
              onChange={e => setNewProd({ ...newProd, categoria: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Descuento (en %)</label>
            <input
              type="number"
              value={newProd.precio_nuevo}
              onChange={e => setNewProd({ ...newProd, precio_nuevo: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Precio</label>
            <input
              type="number"
              value={newProd.precio_descuento}
              onChange={e => setNewProd({ ...newProd, precio_descuento: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Stock</label>
            <input
              type="number"
              value={newProd.stock}
              onChange={e => setNewProd({ ...newProd, stock: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Imagen (URL)</label>
            <input
              type="text"
              value={newProd.imagen}
              onChange={e => setNewProd({ ...newProd, imagen: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Descripción</label>
            <textarea
              value={newProd.descripcion}
              onChange={e => setNewProd({ ...newProd, descripcion: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Ingredientes</label>
            <textarea
              value={newProd.ingredientes}
              onChange={e => setNewProd({ ...newProd, ingredientes: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Porciones</label>
            <input
              type="number"
              value={newProd.porciones}
              onChange={e => setNewProd({ ...newProd, porciones: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Peso</label>
            <input
              type="text"
              value={newProd.peso}
              onChange={e => setNewProd({ ...newProd, peso: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Preparación</label>
            <textarea
              value={newProd.preparacion}
              onChange={e => setNewProd({ ...newProd, preparacion: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <button onClick={confirmAdd} style={{ color: "green", marginRight: "8px" }}>Añadir</button>
            <button onClick={closeAll}>Cancelar</button>
          </div>
        </div>
      )}

      {modalEdit.visible && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.box}>
            <h3>Editar Producto</h3>

            {errorsEdit && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                {errorsEdit}
              </p>
            )}

            <label>Es Pastel</label>
            <input
              type="checkbox"
              checked={editProd.esPastel}
              onChange={e => setEditProd({ ...editProd, esPastel: e.target.checked ? 1 : 0 })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Nombre</label>
            <input
              type="text"
              value={editProd.nombre}
              onChange={e => setEditProd({ ...editProd, nombre: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Categoría</label>
            <input
              type="text"
              value={editProd.categoria}
              onChange={e => setEditProd({ ...editProd, categoria: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Descuento</label>
            <input
              type="number"
              value={editProd.precio_nuevo}
              onChange={e => setEditProd({ ...editProd, precio_nuevo: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Precio</label>
            <input
              type="number"
              value={editProd.precio_descuento}
              onChange={e => setEditProd({ ...editProd, precio_descuento: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Stock</label>
            <input
              type="number"
              value={editProd.stock}
              onChange={e => setEditProd({ ...editProd, stock: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Imagen (URL)</label>
            <input
              type="text"
              value={editProd.imagen}
              onChange={e => setEditProd({ ...editProd, imagen: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Descripción</label>
            <textarea
              value={editProd.descripcion}
              onChange={e => setEditProd({ ...editProd, descripcion: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Ingredientes</label>
            <textarea
              value={editProd.ingredientes}
              onChange={e => setEditProd({ ...editProd, ingredientes: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Porciones</label>
            <input
              type="number"
              value={editProd.porciones}
              onChange={e => setEditProd({ ...editProd, porciones: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Peso</label>
            <input
              type="text"
              value={editProd.peso}
              onChange={e => setEditProd({ ...editProd, peso: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <label>Preparación</label>
            <textarea
              value={editProd.preparacion}
              onChange={e => setEditProd({ ...editProd, preparacion: e.target.value })}
              style={{ marginBottom: "8px", display: "block", width: "100%" }}
            />

            <button onClick={confirmEdit} style={{ color: "green", marginRight: "8px" }}>Guardar</button>
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
    minWidth: "400px",
    maxHeight: "90vh",
    overflowY: "auto",
    textAlign: "left"
  }
};
