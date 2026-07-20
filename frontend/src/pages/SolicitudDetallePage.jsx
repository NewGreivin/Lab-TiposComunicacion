import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();

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
  const [mensajeAccion, setMensajeAccion] = useState(null);

  // Referencia a la tarjeta de evaluacion, para poder hacer scroll hasta ahi
  const evaluacionRef = useRef(null);

  // Evita que la accion se vuelva a ejecutar por re-renders.
  const accionProcesadaRef = useRef(false);

  useEffect(() => {
    const accion = searchParams.get("accion");
    if (!accion || accionProcesadaRef.current) return;

    if (cargando) return;

    accionProcesadaRef.current = true;

    searchParams.delete("accion");
    setSearchParams(searchParams, { replace: true });

    const ejecutarAccion = async () => {
      // El cliente confirma que recibio la notificacion de su solicitud.
      // Ademas de informarlo, esto marca la solicitud como Asignada.
      if (accion === "recibido") {
        if (solicitud?.estado === "Pendiente") {
          try {
            await actualizarEstado("Asignada");
            window.alert("Gracias por confirmar. Hemos registrado que recibiste tu solicitud.");
          } catch (err) {
            setErrorAccion(getErrorMessage(err));
            window.alert(getErrorMessage(err));
          }
        } else {
          window.alert("Esta solicitud ya fue confirmada anteriormente.");
        }
      }

      // El cliente confirma que su problema ya fue resuelto
      if (accion === "confirmar") {
        const deseaConfirmar = window.confirm("¿Confirmas que tu problema fue resuelto?");
        if (deseaConfirmar) {
          try {
            await actualizarEstado("Finalizada");
            setMensajeAccion("Gracias por confirmar. La solicitud fue marcada como finalizada.");
          } catch (err) {
            setErrorAccion(getErrorMessage(err));
          }
        }
      }

      if (accion === "cancelar") {
        const deseaCancelar = window.confirm("¿Deseas cancelar esta solicitud?");
        if (deseaCancelar) {
          try {
            await actualizarEstado("Cancelada");
            setMensajeAccion("La solicitud fue cancelada correctamente.");
          } catch (err) {
            setErrorAccion(getErrorMessage(err));
          }
        }
      }

      if (accion === "formulario") {
        evaluacionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    ejecutarAccion();
  }, [cargando]);

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