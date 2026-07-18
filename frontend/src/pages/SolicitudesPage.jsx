import { useSolicitudes } from "../hooks/useSolicitudes";
import SolicitudCard from "../components/SolicitudCard";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";

const SolicitudesPage = () => {
  const { solicitudes, cargando, error } = useSolicitudes();

  if (cargando) return <LoadingSpinner texto="Cargando solicitudes..." />;

  return (
    <div className="container">
      <h2 className="mb-4">Solicitudes de soporte</h2>

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