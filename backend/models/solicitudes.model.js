import pool from "../config/database.js";

class SolicitudesModel {

    // Obtener todas las solicitudes
    static async obtenerTodas() {

        const [rows] = await pool.query(`
            SELECT *
            FROM solicitudes
            ORDER BY fecha_creacion DESC
        `);

        return rows;
    }

    // Obtener una solicitud
    static async obtenerPorId(id) {

        const [rows] = await pool.query(`
            SELECT *
            FROM solicitudes
            WHERE id = ?
        `,[id]);

        return rows[0];
    }

    // Crear solicitud
    static async crear(datos){

        const {
            nombre_cliente,
            correo,
            asunto,
            descripcion
        } = datos;

        const [resultado] = await pool.query(`
            INSERT INTO solicitudes
            (
                nombre_cliente,
                correo,
                asunto,
                descripcion
            )
            VALUES(?,?,?,?)
        `,
        [
            nombre_cliente,
            correo,
            asunto,
            descripcion
        ]);

        return this.obtenerPorId(resultado.insertId);

    }

    // Actualizar solicitud

    static async actualizar(id,datos){

        const {
            nombre_cliente,
            correo,
            asunto,
            descripcion,
            estado
        } = datos;

        await pool.query(`
            UPDATE solicitudes
            SET

                nombre_cliente=?,
                correo=?,
                asunto=?,
                descripcion=?,
                estado=?

            WHERE id=?
        `,
        [
            nombre_cliente,
            correo,
            asunto,
            descripcion,
            estado,
            id
        ]);

        return this.obtenerPorId(id);

    }

    // Cambiar únicamente estado

    static async actualizarEstado(id,estado){

        await pool.query(`
            UPDATE solicitudes
            SET estado=?
            WHERE id=?
        `,
        [
            estado,
            id
        ]);

        return this.obtenerPorId(id);

    }

    // Eliminar

    static async eliminar(id){

        const [resultado] = await pool.query(`
            DELETE
            FROM solicitudes
            WHERE id=?
        `,[id]);

        return resultado.affectedRows;

    }

}

export default SolicitudesModel;