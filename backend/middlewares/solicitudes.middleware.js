const ESTADOS_VALIDOS = ["Pendiente", "Asignada", "En proceso", "Finalizada", "Cancelada"];
const EMAIL_REGEX     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida que el ID del parámetro sea un número entero positivo.
 */
export const validarId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El ID debe ser un número entero positivo.'
        });
    }

    next();
};

/**
 * Valida los campos requeridos para CREAR una solicitud.
 */
export const validarCrear = (req, res, next) => {
    const { nombre_cliente, correo, asunto, descripcion } = req.body;

    if (!nombre_cliente || nombre_cliente.trim() === '') {
        return res.status(400).json({ ok: false, mensaje: 'El nombre del cliente es obligatorio.' });
    }

    if (!correo || correo.trim() === '') {
        return res.status(400).json({ ok: false, mensaje: 'El correo es obligatorio.' });
    }

    if (!EMAIL_REGEX.test(correo)) {
        return res.status(400).json({ ok: false, mensaje: 'El correo no tiene un formato válido.' });
    }

    if (!asunto || asunto.trim() === '') {
        return res.status(400).json({ ok: false, mensaje: 'El asunto es obligatorio.' });
    }

    if (!descripcion || descripcion.trim() === '') {
        return res.status(400).json({ ok: false, mensaje: 'La descripción es obligatoria.' });
    }

    next();
};

/**
 * Valida los campos requeridos para ACTUALIZAR una solicitud completa.
 */
export const validarActualizar = (req, res, next) => {
    const { nombre_cliente, correo, asunto, descripcion } = req.body;

    if (!nombre_cliente || nombre_cliente.trim() === '') {
        return res.status(400).json({ ok: false, mensaje: 'El nombre del cliente es obligatorio.' });
    }

    if (!correo || correo.trim() === '') {
        return res.status(400).json({ ok: false, mensaje: 'El correo es obligatorio.' });
    }

    if (!EMAIL_REGEX.test(correo)) {
        return res.status(400).json({ ok: false, mensaje: 'El correo no tiene un formato válido.' });
    }

    if (!asunto || asunto.trim() === '') {
        return res.status(400).json({ ok: false, mensaje: 'El asunto es obligatorio.' });
    }

    if (!descripcion || descripcion.trim() === '') {
        return res.status(400).json({ ok: false, mensaje: 'La descripción es obligatoria.' });
    }

    next();
};

/**
 * Valida que el estado enviado sea uno de los estados válidos.
 */
export const validarEstado = (req, res, next) => {
    const { estado } = req.body;

    if (!estado) {
        return res.status(400).json({ ok: false, mensaje: 'El campo estado es obligatorio.' });
    }

    if (!ESTADOS_VALIDOS.includes(estado)) {
        return res.status(400).json({
            ok: false,
            mensaje: `Estado inválido. Los estados válidos son: ${ESTADOS_VALIDOS.join(', ')}`
        });
    }

    next();
};