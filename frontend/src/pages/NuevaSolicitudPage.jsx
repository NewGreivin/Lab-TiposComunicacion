import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SolicitudForm from "../feature/solicitudes/SolicitudForm";
import AlertMessage from "../components/AlertMessage";
import solicitudesService from "../services/solicitudes.service";
import { getErrorMessage } from "../utils/getErrorMessage";

const NuevaSolicitudPage = () => {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    setEnviando(true);
    setError(null);
    try {
      // 1. Nos aseguramos de enviar solo los campos limpios que espera el DTO
      const payload = {
        nombre_cliente: form.nombre_cliente,
        correo: form.correo,
        asunto: form.asunto,
        descripcion: form.descripcion,
      };

      const respuesta = await solicitudesService.crear(payload);
      
      // 2. Extraemos el ID de forma segura sin importar cómo responda el backend
      const idSolicitud = respuesta?.data?.id || respuesta?.id;

      if (idSolicitud) {
        navigate(`/solicitudes/${idSolicitud}`);
      } else {
        // Si por alguna razón no viene el ID, volvemos a la lista principal
        navigate("/");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Nueva solicitud</h2>
      <AlertMessage mensaje={error} onClose={() => setError(null)} />
      <SolicitudForm onSubmit={handleSubmit} enviando={enviando} />
    </div>
  );
};

export default NuevaSolicitudPage;