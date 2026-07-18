import solicitudesService from "../services/solicitudes.service.js";
import { 
    crearSolicitudDto, 
    actualizarSolicitudDto, 
    actualizarEstadoDto 
} from "../dtos/solicitudes.dto.js";

class SolicitudesController {
    static async obtenerTodas(req, res) {
        try {
            const solicitudes = await solicitudesService.obtenerTodas();

            return res.status(200).json({
                ok: true,
                data: solicitudes
            });

        } catch (error) {
            return res.status(500).json({
                ok: false,
                mensaje: error.message
            });
        }
    }

    static async obtenerPorId(req, res) {
        try {
            const solicitud = await solicitudesService.obtenerPorId(req.params.id);

            return res.status(200).json({
                ok: true,
                data: solicitud
            });

        } catch (error) {

            return res.status(404).json({
                ok: false,
                mensaje: error.message
            });
        }
    }

    static async crear(req, res) {
        try {
            const solicitud = await solicitudesService.crear(crearSolicitudDto(req.body));

            return res.status(201).json({
                ok: true,
                mensaje: "Solicitud creada correctamente.",
                data: solicitud
            });

        } catch (error) {

            return res.status(400).json({
                ok: false,
                mensaje: error.message
            });
        }
    }

    static async actualizar(req, res) {
        try {
            const solicitud = await solicitudesService.actualizar(
                req.params.id, 
                actualizarSolicitudDto(req.body)
            );

            return res.status(200).json({
                ok: true,
                mensaje: "Solicitud actualizada correctamente.",
                data: solicitud
            });

        } catch (error) {

            return res.status(400).json({
                ok: false,
                mensaje: error.message
            });
        }
    }

    static async actualizarEstado(req, res) {
        try {
            const solicitud = await solicitudesService.actualizarEstado(
                req.params.id,
                actualizarEstadoDto(req.body).estado
            );

            return res.status(200).json({
                ok: true,
                mensaje: "Estado actualizado correctamente.",
                data: solicitud
            });

        } catch (error) {

            return res.status(400).json({
                ok: false,
                mensaje: error.message
            });
        }
    }

    static async eliminar(req, res) {
        try {
            await solicitudesService.eliminar(req.params.id);

            return res.status(200).json({
                ok: true,
                mensaje: "Solicitud eliminada correctamente."
            });

        } catch (error) {

            return res.status(404).json({
                ok: false,
                mensaje: error.message
            });
        }
    }
}

export default SolicitudesController;