import { Router } from "express";

import solicitudesController from "../controllers/solicitudes.controller.js";
import { 
    validarId, 
    validarCrear, 
    validarActualizar, 
    validarEstado 
} from "../middlewares/solicitudes.middleware.js";

const router = Router();


router.get(   "/",            solicitudesController.obtenerTodas);
router.get(   "/:id",         validarId, solicitudesController.obtenerPorId);
router.post(  "/",            validarCrear, solicitudesController.crear);
router.put(   "/:id",         validarId, validarActualizar, solicitudesController.actualizar);
router.patch( "/:id/estado",  validarId, validarEstado, solicitudesController.actualizarEstado);
router.delete("/:id",         validarId, solicitudesController.eliminar);

router.get("/:id/esperar-cambio", validarId, solicitudesController.esperarCambioEstado);

export default router;