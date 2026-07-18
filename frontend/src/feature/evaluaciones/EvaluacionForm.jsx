import { useState } from "react";

const EvaluacionForm = ({ evaluacion, onCrear, enviando }) => {
  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState("");

  // Ya existe evaluación -> solo se muestra (la API no soporta editarla)
  if (evaluacion) {
    return (
      <div>
        <div className="mb-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <i
              key={n}
              className={`bi ${n <= evaluacion.calificacion ? "bi-star-fill text-warning" : "bi-star text-secondary"} me-1`}
            ></i>
          ))}
        </div>
        {evaluacion.comentario && <p className="mb-0">{evaluacion.comentario}</p>}
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCrear({ calificacion: Number(calificacion), comentario });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label">Calificación (1 a 5)</label>
        <select
          className="form-select"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="form-label">Comentario</label>
        <textarea
          className="form-control"
          rows="3"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-success" disabled={enviando}>
        Enviar evaluación
      </button>
    </form>
  );
};

export default EvaluacionForm;