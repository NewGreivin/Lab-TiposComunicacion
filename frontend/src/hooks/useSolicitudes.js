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

      // Nos permite que se actualice la información obtenida
      setSolicitudes(data);

      // Se quita el loading la primera vez
      setCargando(false);
    
    } catch (err) {
      setError(getErrorMessage(err));
      setCargando(false);
    } 
  }, []);

  useEffect(() => {
    // Primera carga
    cargar();

    // Polling cada 10 segundos
    const intervalo = setInterval(() => {
      cargar();
    }, 10000);

    return () => clearInterval(intervalo);
  }, [cargar]);

  return { 
    solicitudes, 
    cargando, 
    error, 
    recargar: cargar 
  };
};