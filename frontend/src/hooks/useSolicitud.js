import { useCallback, useEffect, useState } from "react";
import solicitudesService from "../services/solicitudes.service";
import { WS_MENSAJES_URL } from "../constans/api.constans";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useSolicitud = (id) => {
  const [solicitud, setSolicitud] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await solicitudesService.obtenerPorId(id);
      setSolicitud(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setCargando(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    let active = true;
    const socket = new WebSocket(`${WS_MENSAJES_URL}?idSolicitud=${id}`);

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.tipo === "cambio-estado" && payload.data && active) {
          setSolicitud(payload.data);
        }
      } catch (err) {
        console.error("Mensaje WebSocket inválido:", err);
      }
    };

    socket.onerror = () => {
      if (active) {
        console.warn("No se pudo establecer la actualización de estado por WebSocket.");
      }
    };

    cargar();

    return () => {
      active = false;
      socket.close();
    };

  }, [id, cargar]);

  const actualizarEstado = async (estado) => {
    const respuesta = await solicitudesService.actualizarEstado(id, estado);
    setSolicitud(respuesta.data);
    return respuesta;
  };

  return { solicitud, cargando, error, recargar: cargar, actualizarEstado };
};
