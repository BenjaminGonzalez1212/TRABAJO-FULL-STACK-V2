import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css'

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Pastelería Gamer</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Precios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contacto</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Más</a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Nosotros</a>
                  <a className="dropdown-item" href="#">Ubicación</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Ayuda</a>
                </div>
              </li>
            </ul>

            <form className="d-flex">
              <input className="form-control me-sm-2" type="search" placeholder="Buscar" />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </nav>

      <h1 className="text-center mt-4">Bienvenido a Pastelería Gamer</h1>

      <nav
        className="navbar navbar-expand-lg bg-primary fixed-top" data-bs-theme="dark">
      </nav>
    </>
  )
}

export default App
