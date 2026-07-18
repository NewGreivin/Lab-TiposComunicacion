import api from "./api";

const RESOURCE = "/mensajes";

const mensajesService = {
  // GET /api/v0/mensajes/:idSolicitud
  obtenerPorSolicitud: async (idSolicitud) => {
    const { data } = await api.get(`${RESOURCE}/${idSolicitud}`);
    return data.data;
  },

  // POST /api/v0/mensajes/:idSolicitud
  crear: async (idSolicitud, { emisor, mensaje }) => {
    const { data } = await api.post(`${RESOURCE}/${idSolicitud}`, {
      emisor,
      mensaje,
    });
    return data;
  },
};

export default mensajesService;