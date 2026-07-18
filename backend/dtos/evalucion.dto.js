/**
 * DTO para crear una evaluación.
 * Extrae y retorna solo los campos permitidos del body.
 */
export const crearEvaluacionDto = (body) => {
    const { calificacion, comentario } = body;
    return { calificacion, comentario };
};