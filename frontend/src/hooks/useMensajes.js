import { useCallback, useEffect, useState } from "react";
import mensajesService from "../services/mensajes.service";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useMensajes = (idSolicitud) => {
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const cargar = useCallback(async () => {
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
    if (idSolicitud) cargar();
  }, [idSolicitud, cargar]);

  const enviarMensaje = async ({ emisor, mensaje }) => {
    setEnviando(true);
    try {
      const respuesta = await mensajesService.crear(idSolicitud, { emisor, mensaje });
      setMensajes((prev) => [...prev, respuesta.data]);
      return respuesta;
    } finally {
      setEnviando(false);
    }
  };

  return { mensajes, cargando, error, enviando, recargar: cargar, enviarMensaje };
};