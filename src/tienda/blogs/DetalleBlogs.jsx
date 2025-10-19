import { useParams } from "react-router-dom";
import { blog_in } from "../data/Blogs_in";
import "../blogs/DetalleBlogs.css";

export default function DetalleBlogs() {
  const { id } = useParams();
  const blog = blog_in.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="detail-container">
        <h2>Blog no encontrado</h2>
        <a href="/TRABAJO-FULL-STACK-V2/blogs">
            <button className="btn-volver">volver</button>
        </a>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-card">
        <h1>{blog.name}</h1>
        <p className="detail-date">{blog.date}</p>
        <p className="detail-description">{blog.description}</p>
        <p className="detail-contet">{blog.contet}</p>
        <a href="/TRABAJO-FULL-STACK-V2/blogs">
            <button className="btn-volver">volver</button>
        </a>
      </div>
    </div>
  );
}
