import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useSolicitud } from "../hooks/useSolicitud";
import { useMensajesChat } from "../hooks/useMensajesChat";
import { useEvaluacion } from "../hooks/useEvaluacion";

import EstadoBadge from "../components/EstadoBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";

import CambiarEstado from "../feature/solicitudes/CambiarEstado";
import ListaMensajes from "../feature/mensajes/ListaMensajes";
import EnviarMensajeForm from "../feature/mensajes/EnviarMensajeForm";
import EvaluacionForm from "../feature/evaluaciones/EvaluacionForm";

import solicitudesService from "../services/solicitudes.service";
import { formatDate } from "../utils/formatDate";
import { getErrorMessage } from "../utils/getErrorMessage";

const SolicitudDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { solicitud, cargando, error, actualizarEstado } = useSolicitud(id);
  const {
    mensajes,
    cargando: cargandoMensajes,
    enviando: enviandoMensaje,
    conectado: chatConectado,
    enviarMensaje
  } = useMensajesChat(id);
  const { evaluacion, crearEvaluacion } = useEvaluacion(id);

  const [errorAccion, setErrorAccion] = useState(null);

  const handleEliminar = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar esta solicitud?")) return;
    try {
      await solicitudesService.eliminar(id);
      navigate("/");
    } catch (err) {
      setErrorAccion(getErrorMessage(err));
    }
  };

  if (cargando) return <LoadingSpinner texto="Cargando solicitud..." />;

  if (error) {
    return (
      <div className="container">
        <AlertMessage mensaje={error} />
        <Link to="/" className="btn btn-secondary">Volver</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="mb-1">{solicitud.asunto}</h2>
          <p className="text-muted mb-0">
            {solicitud.nombre_cliente} · {solicitud.correo}
          </p>
          <p className="text-muted small">Creada: {formatDate(solicitud.fecha_creacion)}</p>
        </div>
        <EstadoBadge estado={solicitud.estado} />
      </div>

      <AlertMessage mensaje={errorAccion} onClose={() => setErrorAccion(null)} />

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Descripción</h5>
          <p className="card-text">{solicitud.descripcion}</p>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <CambiarEstado estadoActual={solicitud.estado} onCambiar={actualizarEstado} />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Chat de la solicitud</h5>
            <span className={`badge ${chatConectado ? "bg-success" : "bg-secondary"}`}>
              {chatConectado ? "En línea" : "Conectando..."}
            </span>
          </div>
          {cargandoMensajes ? (
            <LoadingSpinner texto="Cargando mensajes..." />
          ) : (
            <ListaMensajes mensajes={mensajes} />
          )}
          <EnviarMensajeForm onEnviar={enviarMensaje} enviando={enviandoMensaje} />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title mb-3">Evaluación</h5>
          <EvaluacionForm evaluacion={evaluacion} onCrear={crearEvaluacion} />
        </div>
      </div>

      <div className="d-flex gap-2 mb-4">
        <Link to="/" className="btn btn-secondary">Volver al listado</Link>
        <button className="btn btn-outline-danger" onClick={handleEliminar}>
          Eliminar solicitud
        </button>
      </div>
    </div>
  );
};

export default SolicitudDetallePage;