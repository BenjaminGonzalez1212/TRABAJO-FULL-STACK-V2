import { useParams } from "react-router-dom";
import "../blogs/DetalleBlogs.css";
import { useEffect, useState } from "react";

export default function DetalleBlogs() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const API_URL = `/api/blogs/${id}`;

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(err => console.error("ERROR:", err));
  }, [id]);

  if (!blog) {
    return (
      <div className="detail-container">
        <h2>Cargando...</h2>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-card">
        <h1>{blog.name}</h1>

        <p className="detail-date">
          {new Date(blog.date).toLocaleDateString()}
        </p>

        <p className="detail-description">{blog.description}</p>
        <p className="detail-content">{blog.content}</p>

        {blog.image && <img src={blog.image} className="detail-image" alt="" />}

        <a href="/TRABAJO-FULL-STACK-V2/blogs">
          <button className="btn-volver">volver</button>
        </a>
      </div>
    </div>
  );
}
