import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const useSolicitudesStream = () => {
  const [ultimoEvento, setUltimoEvento] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/api/v0/solicitudes/eventos`);

    eventSource.addEventListener("cambio-estado", (event) => {
      const datos = JSON.parse(event.data);
      setUltimoEvento(datos);
    });

    eventSource.onerror = (err) => {
      console.log("Error en el stream SSE:", err);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return ultimoEvento;
};