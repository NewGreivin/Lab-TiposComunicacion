import { useEffect, useState } from "react";

import { useSolicitudes } from "../hooks/useSolicitudes";
import SolicitudCard from "../components/SolicitudCard";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";

import { useSolicitudesStream } from "../hooks/useSolicitudesStream";

const SolicitudesPage = () => {
  const { solicitudes, recargar, cargando, error } = useSolicitudes();
  const ultimoEvento = useSolicitudesStream();

  const [notificacion, setNotificacion] = useState(null);


  useEffect(() => {
    if (!ultimoEvento) return;

    recargar();

    setNotificacion(`Solicitud #${ultimoEvento.id} cambió a "${ultimoEvento.estado}"`);
    const timer = setTimeout(() => setNotificacion(null), 4000);
    return () => clearTimeout(timer);
  }, [ultimoEvento, recargar]);

  if (cargando) return <LoadingSpinner texto="Cargando solicitudes..." />;

  return (
    <div className="container">
      <h2 className="mb-4">Solicitudes de soporte</h2>

      {notificacion && (
        <div className="alert alert-info">
          {notificacion}
        </div>
      )}

      <AlertMessage mensaje={error} />

      {!error && solicitudes.length === 0 && (
        <p className="text-muted">No hay solicitudes registradas todavía.</p>
      )}

      <div className="row">
        {solicitudes.map((s) => (
          <div className="col-md-6 col-lg-4" key={s.id}>
            <SolicitudCard solicitud={s} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolicitudesPage;