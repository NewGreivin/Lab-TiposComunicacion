import { useCallback, useEffect, useState } from "react";
import solicitudesService from "../services/solicitudes.service";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await solicitudesService.obtenerTodas();
      setSolicitudes(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { solicitudes, cargando, error, recargar: cargar };
};