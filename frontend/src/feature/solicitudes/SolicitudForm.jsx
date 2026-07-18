import { useState } from "react";
import { ESTADOS } from "../../constans/solicitudes.constans";

const valoresIniciales = {
  nombre_cliente: "",
  correo: "",
  asunto: "",
  descripcion: "",
  estado: "Pendiente",
};

// modoEdicion=true muestra el campo "estado" (usado en PUT /solicitudes/:id)
const SolicitudForm = ({ valoresPorDefecto, modoEdicion = false, onSubmit, enviando }) => {
  const [form, setForm] = useState({ ...valoresIniciales, ...valoresPorDefecto });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre del cliente</label>
        <input
          type="text"
          className="form-control"
          name="nombre_cliente"
          value={form.nombre_cliente}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input
          type="email"
          className="form-control"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Asunto</label>
        <input
          type="text"
          className="form-control"
          name="asunto"
          value={form.asunto}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          rows="4"
          value={form.descripcion}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {modoEdicion && (
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            name="estado"
            value={form.estado}
            onChange={handleChange}
          >
            {ESTADOS.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={enviando}>
        {enviando ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default SolicitudForm;