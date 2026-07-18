import evaluacionesService from "../services/evaluaciones.service.js";
import { crearEvaluacionDto } from "../dtos/evalucion.dto.js";

class EvaluacionesController {

    static async obtenerPorSolicitud(req, res) {
        try {
            const evaluacion = await evaluacionesService.obtenerPorSolicitud(req.params.id);
            
            return res.status(200).json({
                ok: true,
                data: evaluacion
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
            const datosEvaluacion = crearEvaluacionDto(req.body);
            const evaluacion = await evaluacionesService.crear({
                solicitud_id: req.params.id,
                ...datosEvaluacion
            });

            return res.status(201).json({
                ok: true,
                mensaje: "Evaluación registrada correctamente.",
                data: evaluacion
            });

        } catch (error) {
            return res.status(400).json({
                ok: false,
                mensaje: error.message
            });
        }
    }
}

export default EvaluacionesController;