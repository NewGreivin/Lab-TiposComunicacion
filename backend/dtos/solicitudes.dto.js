/**
 * DTO para crear una solicitud.
 * Extrae y retorna solo los campos permitidos del body.
 */
export const crearSolicitudDto = (body) => {
    const { nombre_cliente, correo, asunto, descripcion } = body;
    return { nombre_cliente, correo, asunto, descripcion };
};

/**
 * DTO para actualizar una solicitud completa.
 */
export const actualizarSolicitudDto = (body) => {
    const { nombre_cliente, correo, asunto, descripcion, estado } = body;
    return { nombre_cliente, correo, asunto, descripcion, estado };
};

/**
 * DTO para actualizar únicamente el estado.
 */
export const actualizarEstadoDto = (body) => {
    const { estado } = body;
    return { estado };
};