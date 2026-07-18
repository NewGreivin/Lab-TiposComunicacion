import api from "./api";

const RESOURCE = "/evaluaciones";

const evaluacionesService = {
  // GET /api/v0/evaluaciones/:idSolicitud
  obtenerPorSolicitud: async (idSolicitud) => {
    const { data } = await api.get(`${RESOURCE}/${idSolicitud}`);
    return data.data;
  },

  // POST /api/v0/evaluaciones/:idSolicitud
  crear: async (idSolicitud, { calificacion, comentario }) => {
    const { data } = await api.post(`${RESOURCE}/${idSolicitud}`, {
      calificacion,
      comentario,
    });
    return data;
  },
};

export default evaluacionesService;