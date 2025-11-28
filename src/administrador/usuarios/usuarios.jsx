import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ visible: false, userId: null });
  const [modal_add, setModal_add] = useState({ visible_add: false });
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [modal_edit, setModal_edit] = useState({ visible_edit: false, userId: null });
  const [editUser, setEditUser] = useState({ name: "", email: "", password: "" });

  const fetchUsuarios = () => {
    fetch(`/api/personas`)
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al momento de cargar usuarios:", err);
        setLoading(false);
      });
  };

  useEffect(
    () => {
      fetchUsuarios();
    }, []
  );

  const deletePopUp = (id) => {
    setModal({ visible: true, userId: id });
  };

  const closeDeletePopUp = () => {
    setModal({ visible: false, userId: null });
  };

  //-------------------------

  const addUserPopUp = () => {
    setModal_add({ visible_add: true });
  };

  const closeaddUserPopUp = () => {
    setModal_add({ visible_add: false });
  };

  //-------------------------

  const editPopUp = (usuario) => {
    setEditUser({
      name: usuario.name,
      email: usuario.email,
      password: usuario.password
    });
    setModal_edit({ visible_edit: true, userId: usuario.id });
  };

  const closeeditPopUp = () => {
    setModal_edit({ visible_edit: false, userId: null });
  }

  //-------------------------

  const deleteConfirm = (e) => {
    e.preventDefault();
    const id = modal.userId;
      fetch(`/api/personas/${id}`, {
        method: "DELETE",
      }
    )

    .then(
      (res) => {
        if (res.ok) {
          setUsuarios(usuarios.filter((u) => u.id !== id));
          closeDeletePopUp();
        } else {
          alert("Error usuario no eliminado");
        }
      }
    )

    .catch(
      (err) => {
        console.error("Error usuario no eliminado:", err);
        alert("Error usuario no eliminado");
      }
    );
  };

  const addUserConfirm = (e) => {
    e.preventDefault();
    fetch(`/api/personas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    )

    .then(
      (res) => {
        if (res.ok) {
          fetchUsuarios();
          closeaddUserPopUp();
        } else {
          alert("Error usuario no añadido");
        }
      }
    )
      
    .catch(
      (err) => {
        console.error("Error usuario no añadido:", err);
        alert("Error usuario no añadido");
      }
    );
  }

  const editUserConfirm = (e) => {
    e.preventDefault();
    const id = modal_edit.userId;

    fetch(`/api/personas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: editUser.name,
        email: editUser.email,
        password: editUser.password
      })
    })
      .then(res => {
        if (res.ok) {
          fetchUsuarios();
          setModal_edit({ visible_edit: false, userId: null });
        } else {
          alert("Error editando usuario");
        }
      })
      .catch(err => {
        console.error("Error editando usuario:", err);
        alert("Error editando usuario");
      });
  };


  if (loading) return <p>Cargando usuarios...</p>;
  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      <button type="button" onClick={addUserPopUp} style={{ color: "green" }}>
        Añadir usuario
      </button>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.password}</td>

              <td>
                <button onClick={() => deletePopUp(u.id)} style={{ color: "red" }}>
                  Eliminar
                </button>
                <button type="button" onClick={() => editPopUp(u)} style={{ color: "orange" }}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {
        modal.visible && (
          <div style={
            {
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000
            }
          } >
            <div style={
              {
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                minWidth: "300px",
                textAlign: "center"
              }
            }>
              <p>¿Eliminar usuario?</p>
              <button onClick={deleteConfirm} style={{ marginRight: "10px", color: "red" }}>
                Eliminar
              </button>
              <button
                onClick={closeDeletePopUp}>Cancelar
              </button>
            </div>
          </div>
        )
      }

      {
        modal_add.visible_add && (
          <div style={
            { position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000
            }
          } >
            <div style={
              {
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                minWidth: "300px",
                textAlign: "center"
              }
            }>
              <h3>Añadir Nuevo Usuario</h3>
              <form>
                <div>
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value = {newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>

                <div>
                  <label>Email:</label>
                  <input
                  type="email"
                  name="email"
                  value = {newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>

                <div>
                  <label>Contraseña:</label>
                  <input
                  type="password"
                  name="password"
                  value = {newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>

                <button type="button" onClick={addUserConfirm} style={{ marginRight: "10px", color: "green" }}>
                  Añadir
                </button>

                <button type="button" onClick={closeaddUserPopUp}>
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )
      }

      {
        modal_edit.visible_edit && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "300px",
            textAlign: "center"
          }}>
            <h3>Editar Usuario</h3>
            <form onSubmit={editUserConfirm}>
              <input
                type="text"
                value={editUser.name}
                onChange={e => setEditUser({ ...editUser, name: e.target.value })}
              />
              <input
                type="email"
                value={editUser.email}
                onChange={e => setEditUser({ ...editUser, email: e.target.value })}
              />
              <input
                type="password"
                value={editUser.password}
                onChange={e => setEditUser({ ...editUser, password: e.target.value })}
              />
              <button type="submit" style={{ marginRight: "10px", color: "green" }}>Guardar</button>
              <button type="button" onClick={closeeditPopUp}>Cancelar</button>
            </form>
          </div>
        </div>
        )
      }

    </div>
  );
}
