import pool from "../config/database.js";

class EvaluacionesModel{

    static async obtenerPorSolicitud(idSolicitud){

        const [rows] = await pool.query(`
            SELECT *
            FROM evaluaciones
            WHERE solicitud_id=?
        `,[idSolicitud]);

        return rows[0];

    }

    static async crear(datos){

        const {
            solicitud_id,
            calificacion,
            comentario
        } = datos;

        const [resultado] = await pool.query(`
            INSERT INTO evaluaciones
            (
                solicitud_id,
                calificacion,
                comentario
            )
            VALUES(?,?,?)
        `,
        [
            solicitud_id,
            calificacion,
            comentario
        ]);

        const [rows] = await pool.query(`
            SELECT *
            FROM evaluaciones
            WHERE id=?
        `,[resultado.insertId]);

        return rows[0];

    }

}

export default EvaluacionesModel;