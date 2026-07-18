import { Router } from "express";

import mensajesController from "../controllers/mensajes.controller.js";
import { validarCrear }   from "../middlewares/mensajes.middleware.js";
import { validarId }      from "../middlewares/solicitudes.middleware.js";

const router = Router();

router.get( "/:id", validarId, mensajesController.obtenerPorSolicitud);
router.post("/:id", validarId, validarCrear, mensajesController.crear);

export default router;