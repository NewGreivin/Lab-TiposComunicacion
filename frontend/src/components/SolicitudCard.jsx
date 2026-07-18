import { Link } from "react-router-dom";
import EstadoBadge from "./EstadoBadge";
import { formatDate } from "../utils/formatDate";

const SolicitudCard = ({ solicitud }) => {
  const { id, nombre_cliente, correo, asunto, estado, fecha_creacion } = solicitud;

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title mb-1">{asunto}</h5>
          <EstadoBadge estado={estado} />
        </div>
        <h6 className="card-subtitle mb-2 text-muted">
          {nombre_cliente} · {correo}
        </h6>
        <p className="card-text text-secondary small mb-2">
          Creada: {formatDate(fecha_creacion)}
        </p>
        <Link to={`/solicitudes/${id}`} className="btn btn-sm btn-primary">
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default SolicitudCard;