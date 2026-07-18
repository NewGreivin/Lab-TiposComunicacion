import { useState } from "react";
import { ESTADOS } from "../../constans/solicitudes.constans";
import { getErrorMessage } from "../../utils/getErrorMessage";

const CambiarEstado = ({ estadoActual, onCambiar }) => {
  const [estado, setEstado] = useState(estadoActual);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = async (e) => {
    const nuevoEstado = e.target.value;
    setEstado(nuevoEstado);
    setGuardando(true);
    setError(null);
    try {
      await onCambiar(nuevoEstado);
    } catch (err) {
      setError(getErrorMessage(err));
      setEstado(estadoActual);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div>
      <label className="form-label fw-semibold">Estado de la solicitud</label>
      <select className="form-select" value={estado} onChange={handleChange} disabled={guardando}>
        {ESTADOS.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default CambiarEstado;