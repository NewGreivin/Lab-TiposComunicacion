const EMISORES_VALIDOS = ["Cliente", "Tecnico"];

/**
 * Valida los campos requeridos para CREAR un mensaje.
 */
export const validarCrear = (req, res, next) => {
    const { emisor, mensaje } = req.body;

    if (!emisor) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El campo emisor es obligatorio.'
        });
    }

    if (!EMISORES_VALIDOS.includes(emisor)) {
        return res.status(400).json({
            ok: false,
            mensaje: `El emisor debe ser uno de: ${EMISORES_VALIDOS.join(', ')}`
        });
    }

    if (!mensaje || mensaje.trim() === '') {
        return res.status(400).json({
            ok: false,
            mensaje: 'El mensaje no puede estar vacío.'
        });
    }

    next();
};