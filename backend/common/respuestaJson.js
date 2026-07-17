

/**
 * Respuesta exitosa estandarizada.
 * @param {object} res      - Objeto response de Express.
 * @param {string} mensaje  - Mensaje descriptivo del resultado.
 * @param {*}      datos    - Payload a enviar en el campo data.
 * @param {number} codigo   - Codigo HTTP (default 200).
 */
export const exito = (res, mensaje, datos, codigo = 200) => {
    return res.status(codigo).json({
        success: true,
        message: mensaje,
        data:    datos
    });
};

/**
 * Respuesta de error estandarizada.
 * @param {object} res      - Objeto response de Express.
 * @param {string} mensaje  - Mensaje descriptivo del error.
 * @param {*}      err      - Error capturado o string descriptivo.
 * @param {number} codigo   - Codigo HTTP (default 500).
 */
export const error = (res, mensaje, err, codigo = 500) => {
    return res.status(codigo).json({
        success: false,
        message: mensaje,
        error:   err?.message ?? err
    });
};
