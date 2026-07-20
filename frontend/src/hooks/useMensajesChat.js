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

  const socketRef = useRef(null);

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

      if (payload.tipo === "error") {
        setError(payload.mensaje);
      }
    };

    socket.onerror = () => {
      setError("Se perdió la conexión en tiempo real del chat.");
    };

    socket.onclose = () => setConectado(false);

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [idSolicitud, cargarHistorial]);

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
    recargar: cargarHistorial,
    enviarMensaje
  };
};
