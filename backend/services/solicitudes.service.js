import solicitudesModel from "../models/solicitudes.model.js";

class SolicitudesService {

    static async obtenerTodas() {
        return await solicitudesModel.obtenerTodas();
    }

    static async obtenerPorId(id) {

        const solicitud = await solicitudesModel.obtenerPorId(id);

        if (!solicitud) {
            throw new Error("Solicitud no encontrada");
        }

        return solicitud;
    }

    static async crear(datos) {

        if (!datos.nombre_cliente)
            throw new Error("El nombre del cliente es obligatorio.");

        if (!datos.correo)
            throw new Error("El correo es obligatorio.");

        if (!datos.asunto)
            throw new Error("El asunto es obligatorio.");

        if (!datos.descripcion)
            throw new Error("La descripción es obligatoria.");

        return await solicitudesModel.crear(datos);

    }

    static async actualizar(id, datos) {

        const existe = await solicitudesModel.obtenerPorId(id);

        if (!existe) {
            throw new Error("Solicitud no encontrada");
        }

        return await solicitudesModel.actualizar(id, datos);

    }

    static async actualizarEstado(id, estado) {

        const estadosValidos = [
            "Pendiente",
            "Asignada",
            "En proceso",
            "Finalizada",
            "Cancelada"
        ];

        if (!estadosValidos.includes(estado)) {
            throw new Error("Estado inválido.");
        }

        return await solicitudesModel.actualizarEstado(id, estado);

    }

    static async eliminar(id) {

        const eliminado = await solicitudesModel.eliminar(id);

        if (eliminado === 0) {
            throw new Error("Solicitud no encontrada");
        }

        return true;

    }

}

export default SolicitudesService;