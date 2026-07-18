import mensajesModel from "../models/mensajes.model.js";
import solicitudesModel from "../models/solicitudes.model.js";

class MensajesService {

    static async obtenerPorSolicitud(idSolicitud) {

        const solicitud = await solicitudesModel.obtenerPorId(idSolicitud);

        if (!solicitud) {
            throw new Error("Solicitud no encontrada");
        }

        return await mensajesModel.obtenerPorSolicitud(idSolicitud);

    }

    static async crear(datos) {

        const solicitud = await solicitudesModel.obtenerPorId(datos.solicitud_id);

        if (!solicitud) {
            throw new Error("Solicitud no encontrada");
        }

        if (!datos.emisor)
            throw new Error("Debe indicar el emisor.");

        if (!datos.mensaje)
            throw new Error("Debe escribir un mensaje.");

        return await mensajesModel.crear(datos);

    }

}

export default MensajesService;