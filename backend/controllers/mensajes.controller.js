import mensajesService from "../services/mensajes.service.js";
import { crearMensajeDto } from "../dtos/mensaje.dto.js";
class MensajesController {

    static async obtenerPorSolicitud(req, res) {
        try {
            const mensajes = await mensajesService.obtenerPorSolicitud(req.params.id);
            
            return res.status(200).json({
                ok: true,
                data: mensajes
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
            const datosMensaje = crearMensajeDto(req.body);
            const mensaje = await mensajesService.crear({
                solicitud_id: req.params.id,
                ...datosMensaje

            });

            return res.status(201).json({
                ok: true,
                mensaje: "Mensaje agregado correctamente.",
                data: mensaje
            });

        } catch (error) {

            return res.status(400).json({
                ok: false,
                mensaje: error.message
            });
        }
    }
}

export default MensajesController;