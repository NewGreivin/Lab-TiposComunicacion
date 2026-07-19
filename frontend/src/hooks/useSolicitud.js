import { useCallback, useEffect, useRef, useState } from "react";
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
    if (!id) return;

    let active = true;
    const controller = new AbortController();
    let estadoConocido = null;

    async function iniciarLongPolling() {
      while (active) {
        try {
          const data = await solicitudesService.esperarCambioEstado(
            id,
            estadoConocido,
            controller.signal
          );

          if (!active) break;

          if (data.data) {
            setSolicitud(data.data);
            estadoConocido = data.data.estado;
          }

        } catch (err) {
          if (err.name === "AbortError" || !active) break;

          console.log("Error long polling:", err);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    }

    cargar().then((data) => {
      estadoConocido = data?.estado ?? null;
      iniciarLongPolling();
    });

    return () => {
      active = false;
      controller.abort();
    };

  }, [id, cargar]);

  const actualizarEstado = async (estado) => {
    const respuesta = await solicitudesService.actualizarEstado(id, estado);
    setSolicitud(respuesta.data);
    return respuesta;
  };

  return { solicitud, cargando, error, recargar: cargar, actualizarEstado };
};