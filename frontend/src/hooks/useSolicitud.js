import { useCallback, useEffect, useState } from "react";
import solicitudesService from "../services/solicitudes.service";
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
    if (id) cargar();
  }, [id, cargar]);

  const actualizarEstado = async (estado) => {
    const respuesta = await solicitudesService.actualizarEstado(id, estado);
    setSolicitud(respuesta.data);
    return respuesta;
  };

  return { solicitud, cargando, error, recargar: cargar, actualizarEstado };
};