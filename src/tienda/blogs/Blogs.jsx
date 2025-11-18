import { useAuth } from "../auth/AuthProvider";
import { blog_in } from "../data/Blogs_in";
import "./Blogs.css";

export default function Blogs() {
  const auth = useAuth();
  let navContent;

  if (auth.isAuthenticated === false) {
    navContent = (
      <>
        <li className="nav-item"><a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/login">Login</a></li>
        <li className="nav-item"><a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/signup">SignUp</a></li>
      </>
    );
  } else {
    navContent = (
      <li className="nav-item">
        <button
          className="nav-link active btn btn-link"
          onClick={(e) => {
            e.preventDefault();
            auth.logout();
          }}
        >
          Logout
        </button>
      </li>
    );
  }

  return (
    <>
      <main className="container py-5">
        <h1 className="text-center mb-4 text-primary fw-bold">Blog de Pastelería Gamery</h1>
        <div className="blogs-container">
          
          {blog_in.map((blog) => (
            <div key={blog.id} className="blog-card">
              {blog.image ?
                (
                  <img src={blog.image} alt={blog.name} />
                ):
                
                (
                  <div
                    className="bg-light text-center py-5 text-muted"
                    style={{ fontSize: "0.9rem", height: "381px" }}
                  >
                    Sin imagen
                  </div>
                )
              }
              <div className="card-body">
                <h5 className="card-title">{blog.name}</h5>

                <p className="card-text">
                  <small className="text-muted">Publicado el {blog.date}</small>
                </p>

                <p className="card-desc">
                  <small className="text-muted">{blog.description}</small>
                </p>

                <a href = {`/TRABAJO-FULL-STACK-V2/blogs/${blog.id}`}>
                  <button className="btn btn-primary">Ver más</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
