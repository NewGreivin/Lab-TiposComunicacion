import api from "./api";

const RESOURCE = "/solicitudes";

const solicitudesService = {
  // GET /api/v0/solicitudes
  obtenerTodas: async () => {
    const { data } = await api.get(RESOURCE);
    // Retorna data.data si existe, de lo contrario la data directa
    return data && data.data ? data.data : data;
  },

  // GET /api/v0/solicitudes/:id
  obtenerPorId: async (id) => {
    if (!id || id === "undefined") {
      throw new Error("ID de solicitud no válido proporcionado.");
    }
    const { data } = await api.get(`${RESOURCE}/${id}`);
    return data && data.data ? data.data : data;
  },

  // POST /api/v0/solicitudes
  crear: async ({ nombre_cliente, correo, asunto, descripcion }) => {
    const { data } = await api.post(RESOURCE, {
      nombre_cliente,
      correo,
      asunto,
      descripcion,
    });
    return data;
  },

  // PUT /api/v0/solicitudes/:id
  actualizar: async (id, { nombre_cliente, correo, asunto, descripcion, estado }) => {
    const { data } = await api.put(`${RESOURCE}/${id}`, {
      nombre_cliente,
      correo,
      asunto,
      descripcion,
      estado,
    });
    return data;
  },

  // PATCH /api/v0/solicitudes/:id/estado
  actualizarEstado: async (id, estado) => {
    const { data } = await api.patch(`${RESOURCE}/${id}/estado`, { estado });
    return data;
  },

  // DELETE /api/v0/solicitudes/:id
  eliminar: async (id) => {
    const { data } = await api.delete(`${RESOURCE}/${id}`);
    return data;
  },
};

export default solicitudesService;