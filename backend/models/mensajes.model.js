import pool from "../config/database.js";

class MensajesModel{

    static async obtenerPorSolicitud(idSolicitud){

        const [rows] = await pool.query(`
            SELECT *
            FROM mensajes
            WHERE solicitud_id=?
            ORDER BY fecha ASC
        `,[idSolicitud]);

        return rows;

    }

    static async crear(datos){

        const {
            solicitud_id,
            emisor,
            mensaje
        } = datos;

        const [resultado] = await pool.query(`
            INSERT INTO mensajes
            (
                solicitud_id,
                emisor,
                mensaje
            )
            VALUES(?,?,?)
        `,
        [
            solicitud_id,
            emisor,
            mensaje
        ]);

        const [rows] = await pool.query(`
            SELECT *
            FROM mensajes
            WHERE id=?
        `,[resultado.insertId]);

        return rows[0];

    }

}

export default MensajesModel;