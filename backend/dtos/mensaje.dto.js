/**
 * DTO para crear un mensaje.
 * Extrae y retorna solo los campos permitidos del body.
 */
export const crearMensajeDto = (body) => {
    const { emisor, mensaje } = body;
    return { emisor, mensaje };
};