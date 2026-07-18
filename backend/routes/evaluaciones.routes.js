import {Router} from "express";

import evaluacionesController from "../controllers/evaluaciones.controller.js";
import {validarCrear} from "../middlewares/evaluaciones.middleware.js";
import {validarId} from "../middlewares/solicitudes.middleware.js";

const router = Router();

router.get( "/:id", validarId, evaluacionesController.obtenerPorSolicitud);
router.post("/:id", validarId, validarCrear, evaluacionesController.crear);

export default router;