import { useCallback, useEffect, useState } from "react";
import solicitudesService from "../services/solicitudes.service";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    try {

      const data = await solicitudesService.obtenerTodas();

      setSolicitudes(data);

      setCargando(false);
    
    } catch (err) {
      setError(getErrorMessage(err));
      setCargando(false);
    } 
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { 
    solicitudes, 
    cargando, 
    error, 
    recargar: cargar 
  };
};