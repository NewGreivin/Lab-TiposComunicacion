/**
 * Valida los campos requeridos para CREAR una evaluación.
 */
export const validarCrear = (req, res, next) => {
    const { calificacion } = req.body;

    if (calificacion === undefined || calificacion === null || calificacion === '') {
        return res.status(400).json({
            ok: false,
            mensaje: 'El campo calificacion es obligatorio.'
        });
    }

    const cal = Number(calificacion);

    if (!Number.isInteger(cal) || cal < 1 || cal > 5) {
        return res.status(400).json({
            ok: false,
            mensaje: 'La calificación debe ser un número entero entre 1 y 5.'
        });
    }

    next();
};