import { useState } from "react";
import { EMISORES } from "../../constans/solicitudes.constans";

const EnviarMensajeForm = ({ onEnviar, enviando }) => {
  const [emisor, setEmisor] = useState(EMISORES[0]);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    await onEnviar({ emisor, mensaje });
    setMensaje("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <select
        className="form-select"
        style={{ maxWidth: "140px" }}
        value={emisor}
        onChange={(e) => setEmisor(e.target.value)}
      >
        {EMISORES.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="form-control"
        placeholder="Escribe un mensaje..."
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />
      <button type="submit" className="btn btn-primary" disabled={enviando}>
        <i className="bi bi-send"></i>
      </button>
    </form>
  );
};

export default EnviarMensajeForm;