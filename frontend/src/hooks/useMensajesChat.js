import { useCallback, useEffect, useRef, useState } from "react";
import mensajesService from "../services/mensajes.service";
import { WS_MENSAJES_URL } from "../constans/api.constans";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useMensajesChat = (idSolicitud) => {
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [conectado, setConectado] = useState(false);
  const [usuarioEscribiendo, setUsuarioEscribiendo] = useState(null);

  const socketRef = useRef(null);
  const typingTimerRef = useRef(null);
  const emisorLocalRef = useRef(null);

  const cargarHistorial = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await mensajesService.obtenerPorSolicitud(idSolicitud);
      setMensajes(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setCargando(false);
    }
  }, [idSolicitud]);

  useEffect(() => {
    if (!idSolicitud) return;

    cargarHistorial();

    const socket = new WebSocket(`${WS_MENSAJES_URL}?idSolicitud=${idSolicitud}`);
    socketRef.current = socket;

    socket.onopen = () => setConectado(true);

    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      if (payload.tipo === "nuevo-mensaje") {
        setMensajes((prev) => [...prev, payload.data]);
      }

      if (
        payload.tipo === "escribiendo" &&
        payload.emisor !== emisorLocalRef.current
      ) {
        setUsuarioEscribiendo(payload.escribiendo ? payload.emisor : null);
      }

      if (payload.tipo === "error") {
        setError(payload.mensaje);
      }
    };

    socket.onerror = () => {
      setError("Se perdió la conexión en tiempo real del chat.");
    };

    socket.onclose = () => setConectado(false);

    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }

      socket.close();
      socketRef.current = null;
      setUsuarioEscribiendo(null);
    };
  }, [idSolicitud, cargarHistorial]);

  const informarEscribiendo = ({ emisor, escribiendo }) => {
    emisorLocalRef.current = emisor;

    const socket = socketRef.current;

    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        tipo: "escribiendo",
        emisor,
        escribiendo
      }));
    }

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    if (escribiendo) {
      typingTimerRef.current = setTimeout(() => {
        const socketActivo = socketRef.current;

        if (socketActivo?.readyState === WebSocket.OPEN) {
          socketActivo.send(JSON.stringify({
            tipo: "escribiendo",
            emisor,
            escribiendo: false
          }));
        }
      }, 900);
    }
  };

  const enviarMensaje = ({ emisor, mensaje }) => {
    return new Promise((resolve, reject) => {
      const socket = socketRef.current;

      if (!socket || socket.readyState !== WebSocket.OPEN) {
        const err = new Error("No hay conexión con el chat en este momento.");
        setError(err.message);
        reject(err);
        return;
      }

      setEnviando(true);
      
      socket.send(JSON.stringify({ emisor, mensaje }));
      setEnviando(false);
      resolve();
    });
  };

  return {
    mensajes,
    cargando,
    error,
    enviando,
    conectado,
    usuarioEscribiendo,
    recargar: cargarHistorial,
    enviarMensaje,
    informarEscribiendo
  };
};
