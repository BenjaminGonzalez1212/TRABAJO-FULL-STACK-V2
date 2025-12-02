import { useEffect, useState } from "react";

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalDelete, setModalDelete] = useState({ visible: false, id: null });
  const [modalAdd, setModalAdd] = useState({ visible: false });
  const [modalEdit, setModalEdit] = useState({ visible: false, id: null });

  const [error, setError] = useState("");

  const [newPost, setNewPost] = useState({
    name: "",
    date: "",
    description: "",
    content: "",
    image: ""
  });

  const [editPost, setEditPost] = useState({
    name: "",
    date: "",
    description: "",
    content: "",
    image: ""
  });

  const fetchBlogs = () => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando blogs:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openDelete = (id) => {
    setModalDelete({ visible: true, id });
  };

  const openAdd = () => {
    const today = new Date().toISOString().slice(0, 10);
    setNewPost(prev => ({ ...prev, date: today }));
    setError("");
    setModalAdd({ visible: true });
  };

  const openEdit = (blog) => {
    setEditPost({
      name: blog.name,
      date: blog.date,
      description: blog.description,
      content: blog.content,
      image: blog.image
    });
    setError("");
    setModalEdit({ visible: true, id: blog.id });
  };

  const closeAll = () => {
    setModalAdd({ visible: false });
    setModalDelete({ visible: false, id: null });
    setModalEdit({ visible: false, id: null });
    setError("");
  };

  const confirmDelete = () => {
    fetch(`/api/blogs/${modalDelete.id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          setBlogs(blogs.filter(b => b.id !== modalDelete.id));
          closeAll();
        } else alert("Error eliminando post");
      })
      .catch(err => {
        console.error("Error eliminando post:", err);
      });
  };

  const confirmAdd = () => {
    if (!newPost.name || !newPost.date || !newPost.description || !newPost.content || !newPost.image) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setError("");

    const postToAdd = { ...newPost };

    fetch(`/api/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postToAdd)
    })
      .then(res => {
        if (res.ok) {
          fetchBlogs();
          closeAll();
        } else alert("Error agregando post");
      })
      .catch(err => console.error("Error agregando post:", err));
  };

  const confirmEdit = () => {
    if (!editPost.name || !editPost.date || !editPost.description || !editPost.content || !editPost.image) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setError("");

    fetch(`/api/blogs/${modalEdit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editPost)
    })
      .then(res => {
        if (res.ok) {
          fetchBlogs();
          closeAll();
        } else alert("Error editando post");
      })
      .catch(err => console.error("Error editando post:", err));
  };

  if (loading) return <p>Cargando blog...</p>;

  return (
    <div>
      <h2>Administración de Blog</h2>

      <button onClick={openAdd} style={{ color: "green" }}>
        Añadir Post
      </button>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Opciones</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>{b.date}</td>
              <td>{b.description}</td>
              <td>
                <img src={b.image} alt="" width="80" />
              </td>
              <td>
                <button onClick={() => openDelete(b.id)} style={{ color: "red" }}>
                  Eliminar
                </button>
                <button onClick={() => openEdit(b)} style={{ color: "orange" }}>
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
            <p>¿Eliminar este post?</p>
            <button onClick={confirmDelete} style={{ color: "red" }}>Eliminar</button>
            <button onClick={closeAll}>Cancelar</button>
          </div>
        </div>
      )}

      {modalAdd.visible && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.box}>
            <h3>Nuevo Post</h3>

            <input
              type="text"
              placeholder="Título"
              value={newPost.name}
              onChange={e => setNewPost({ ...newPost, name: e.target.value })}
            />

            <input
              type="date"
              value={newPost.date}
              onChange={e => setNewPost({ ...newPost, date: e.target.value })}
            />

            <textarea
              placeholder="Descripción"
              value={newPost.description}
              onChange={e => setNewPost({ ...newPost, description: e.target.value })}
            />

            <textarea
              placeholder="Contenido"
              value={newPost.content}
              onChange={e => setNewPost({ ...newPost, content: e.target.value })}
            />

            <input
              type="text"
              placeholder="URL de imagen"
              value={newPost.image}
              onChange={e => setNewPost({ ...newPost, image: e.target.value })}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={confirmAdd} style={{ color: "green" }}>Añadir</button>
            <button onClick={closeAll}>Cancelar</button>
          </div>
        </div>
      )}

      {modalEdit.visible && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.box}>
            <h3>Editar Post</h3>

            <input
              type="text"
              value={editPost.name}
              onChange={e => setEditPost({ ...editPost, name: e.target.value })}
            />

            <input
              type="date"
              value={editPost.date}
              onChange={e => setEditPost({ ...editPost, date: e.target.value })}
            />

            <textarea
              value={editPost.description}
              onChange={e => setEditPost({ ...editPost, description: e.target.value })}
            />

            <textarea
              value={editPost.content}
              onChange={e => setEditPost({ ...editPost, content: e.target.value })}
            />

            <input
              type="text"
              value={editPost.image}
              onChange={e => setEditPost({ ...editPost, image: e.target.value })}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={confirmEdit} style={{ color: "green" }}>Guardar</button>
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
    minWidth: "300px",
    textAlign: "center"
  }
};
