import { conectarCliente, emitirEvento } from "../common/sseManager.js";
import { registrarEspera, removerCliente, notificarCambio } from "../common/longPolling.js";
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

            notificarCambio(req.params.id, solicitud); //Etapa 4

            emitirEvento("cambio-estado", {            //Etapa 5
                id: solicitud.id,
                estado: solicitud.estado,
                asunto: solicitud.asunto
            });

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

    static async esperarCambioEstado(req, res) {
    const { id } = req.params;
    const estadoConocido = req.query.estadoConocido ?? null;

    try {
        //Revisa si ya cambio de la ultima vez. 
        const solicitud = await solicitudesService.obtenerPorId(id);

        if (solicitud.estado !== estadoConocido) {
            return res.json({
                ok: true,
                timeout: false,
                data: solicitud
            });
        }

        //Si no ha cambiado se queda en espera. 
        const client = registrarEspera(id, estadoConocido, res);

        const timeoutId = setTimeout(() => {
            removerCliente(client.id);
            if (!res.headersSent) {
                res.json({
                    ok: true,
                    timeout: true,
                    data: null
                });
            }
        }, 25000);

        req.on("close", () => {
            clearTimeout(timeoutId);
            removerCliente(client.id);
        });

        } catch (error) {
            return res.status(404).json({ ok: false, mensaje: error.message });
        }
    }

    static async streamEventos(req, res) {
        conectarCliente(req, res);
    }
}

export default SolicitudesController;