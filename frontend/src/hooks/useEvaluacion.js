import { useCallback, useEffect, useState } from "react";
import evaluacionesService from "../services/evaluaciones.service";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useEvaluacion = (idSolicitud) => {
  const [evaluacion, setEvaluacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await evaluacionesService.obtenerPorSolicitud(idSolicitud);
      setEvaluacion(data ?? null);
    } catch (err) {
      // Si aún no existe evaluación, el backend responde 404: no es un error fatal.
      setEvaluacion(null);
      setError(getErrorMessage(err));
    } finally {
      setCargando(false);
    }
  }, [idSolicitud]);

  useEffect(() => {
    if (idSolicitud) cargar();
  }, [idSolicitud, cargar]);

  const crearEvaluacion = async ({ calificacion, comentario }) => {
    const respuesta = await evaluacionesService.crear(idSolicitud, { calificacion, comentario });
    setEvaluacion(respuesta.data);
    return respuesta;
  };

  return { evaluacion, cargando, error, recargar: cargar, crearEvaluacion };
};