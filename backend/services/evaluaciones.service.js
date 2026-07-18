import evaluacionesModel from "../models/evaluaciones.model.js";
import solicitudesModel from "../models/solicitudes.model.js";

class EvaluacionesService {

    static async obtenerPorSolicitud(idSolicitud) {

        const solicitud = await solicitudesModel.obtenerPorId(idSolicitud);

        if (!solicitud) {
            throw new Error("Solicitud no encontrada");
        }
        return await evaluacionesModel.obtenerPorSolicitud(idSolicitud);
    }

    static async crear(datos) {
        const solicitud = await solicitudesModel.obtenerPorId(datos.solicitud_id);
        if (!solicitud) {
            throw new Error("Solicitud no encontrada");
        }

        if (datos.calificacion < 1 || datos.calificacion > 5) {
            throw new Error("La calificación debe estar entre 1 y 5.");
        }
        return await evaluacionesModel.crear(datos);
    }
}

export default EvaluacionesService;