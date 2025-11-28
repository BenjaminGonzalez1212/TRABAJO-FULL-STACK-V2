import { useEffect, useState } from "react";
import "./Blogs.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const API_URL = "/api/blogs";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error("ERROR cargando blogs:", err));
  }, []);

  return (
    <main className="container py-5">
      <h1 className="text-center mb-4 text-primary fw-bold">Blog de Pastelería Gamery</h1>
      <div className="blogs-container">

        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">

            {blog.image ? (
              <img src={blog.image} alt={blog.name} />
            ) : (
              <div
                className="bg-light text-center py-5 text-muted"
                style={{ fontSize: "0.9rem", height: "381px" }}
              >
                Sin imagen
              </div>
            )}

            <div className="card-body">
              <h5 className="card-title">{blog.name}</h5>

              <p className="card-text">
                <small className="text-muted">
                  Publicado el {new Date(blog.date).toLocaleDateString()}
                </small>
              </p>

              <p className="card-desc">
                <small className="text-muted">{blog.description}</small>
              </p>

              <a href={`/TRABAJO-FULL-STACK-V2/blogs/${blog.id}`}>
                <button className="btn btn-primary">Ver más</button>
              </a>
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}
