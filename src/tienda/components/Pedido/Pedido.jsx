import React, { useState } from "react";
import "./Pedido.css";

export default function Pedido() {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    imagen: "",
    instrucciones: "",
  });

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const validate = () => {
    const e = {};
    if (!form.nombres.trim()) e.nombres = "Los nombres son obligatorios";
    if (!form.apellidos.trim()) e.apellidos = "Los apellidos son obligatorios";
    if (!form.email.trim()) e.email = "El correo es obligatorio";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Correo no válido";
    if (!form.telefono.trim()) e.telefono = "El número de contacto es obligatorio";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((o) => ({ ...o, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    const payload = {
      ...form,
      tipo: "PEDIDO",
      date: new Date().toISOString().split("T")[0],
      total: 0,
      items: []
    };

    setSending(true);
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      setSuccess("Pedido enviado correctamente. Te contactaremos pronto");

      setForm({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
        imagen: "",
        instrucciones: "",
      });

    } catch {
      setErrors((o) => ({
        ...o,
        submit: "Error al enviar el pedido. Intenta nuevamente",
      }));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pedido-container">
      <h2 className="pedido-title">Realizar un Pedido</h2>

      {success && <div className="success-box">{success}</div>}
      {errors.submit && <div className="error-box">{errors.submit}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nombres</label>
          <input
            name="nombres"
            value={form.nombres}
            onChange={handleChange}
            placeholder="Primer y segundo nombre"
          />
          {errors.nombres && <span className="error-text">{errors.nombres}</span>}
        </div>

        <div className="input-group">
          <label>Apellidos</label>
          <input
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
            placeholder="Primer y segundo apellido"
          />
          {errors.apellidos && <span className="error-text">{errors.apellidos}</span>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label>Número de contacto</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+56 9 1234 5678"
          />
          {errors.telefono && <span className="error-text">{errors.telefono}</span>}
        </div>

        <div className="input-group">
          <label>Imagen de referencia (opcional)</label>
          <input
            name="imagen"
            value={form.imagen}
            onChange={handleChange}
            placeholder="URL de imagen opcional"
          />
        </div>

        <div className="input-group">
          <label>Instrucciones / Detalles</label>
          <textarea
            name="instrucciones"
            value={form.instrucciones}
            onChange={handleChange}
            rows={9}
            placeholder={
              "Instrucciones de formato al momento de hacer pedido, por favor:\n" +
              "- Cantidad de personas del pastel\n" +
              "- Tipo de pastel, sabores, capas, ingredientes, etc.\n" +
              "- Indicar si es una receta específica\n" +
              "- Otros detalles relevantes"
            }
          />
        </div>

        <div className="buttons" style={{ justifyContent: "center" }}>
          <button className="btn-primary" type="submit" disabled={sending}>
            {sending ? "Enviando..." : "Enviar pedido"}
          </button>
        </div>
      </form>

      <p className="pedido-legal">
        Al enviar aceptas que te contactemos para coordinar tu pedido.
      </p>
    </div>
  );
}
