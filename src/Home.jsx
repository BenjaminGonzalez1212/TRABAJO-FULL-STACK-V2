import "bootswatch/dist/journal/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

export default function Home() {
  return (
    <>
      <main
        className="text-center text-white d-flex align-items-center justify-content-center bg-dark"
        style={{
          backgroundImage: "url('https://cdn.shopify.com/s/files/1/0163/5948/9636/files/1Y6A4999_2048x2048.jpg?v=1575910896')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "80vh",
        }}
      >
        <div className="bg-dark bg-opacity-50 p-5 rounded shadow-lg">
          <h1 className="display-3 fw-bold text-white">¡Pastelería Gamery!</h1>

          <p className="lead mb-4">
            Sube de nivel con nuestros pasteles inspirados en tus videojuegos favoritos!
          </p>

          <a href="/TRABAJO-FULL-STACK-V2/carrito" className="btn btn-primary btn-lg">
            Explorar productos
          </a>
        </div>
      </main>

      <section className="container py-5">
        <h2 className="text-center text-primary fw-bold mb-4">Productos destacados</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img src="/TRABAJO-FULL-STACK-V2/img/pastel-mario.jpg" className="card-img-top" alt="Pastel Mario" />
              <div className="card-body">
                <h5 className="card-title">Pastel Mario</h5>
                <p className="card-text">
                  Torta de frambuesa manjar con diseño de overol hecho en fondant.
                </p>
                <a href="/TRABAJO-FULL-STACK-V2/carrito">
                  <button className="btn btn-primary">Ver más</button>
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img src="/TRABAJO-FULL-STACK-V2/img/pastel-zelda.jpg" className="card-img-top" alt="Pastel Zelda" />
              <div className="card-body">
                <h5 className="card-title">Pastel Zelda</h5>
                <p className="card-text">
                  Torta tres leches inspirada en The Legend of Zelda.
                </p>
                <a href="/TRABAJO-FULL-STACK-V2/carrito">
                  <button className="btn btn-primary">Ver más</button>
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img src="/TRABAJO-FULL-STACK-V2/img/pastel-minecraft.jpg" className="card-img-top" alt="Pastel Minecraft" />
              <div className="card-body">
                <h5 className="card-title">Pastel Minecraft</h5>
                <p className="card-text">
                  Torta de frambuesa al estilo Minecraft, hecha en fondant.
                </p>
                <a href="/TRABAJO-FULL-STACK-V2/carrito">
                  <button className="btn btn-primary">Ver más</button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
