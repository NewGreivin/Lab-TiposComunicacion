import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import QRCode from 'qrcode';

dotenv.config();

// transportador de correo (Mailtrap o Gmail, segun el .env).
// nodemailer usa esto para autenticarse contra el servidor SMTP
// y despues poder llamar a transportador.sendMail(...)
const transportador = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

const urlFrontend = process.env.URL_FRONTEND || 'http://localhost:5173';

// Plantilla del correo, se lee una sola vez
const plantilla = fs.readFileSync(new URL("../templates/solicitud.html", import.meta.url), 'utf-8');

const tituloPorEstado = {
    Pendiente: "Solicitud Creada",
    Asignada: "Solicitud Asignada",
    "En proceso": "Solicitud en Proceso",
    Finalizada: "Solicitud Finalizada",
    Cancelada: "Solicitud Cancelada"
};

function botonRecibido(idSolicitud, esNueva) {
    // el boton de "Confirmar recepcion" solo va en el correo de creacion
    if (!esNueva) return "";

    const enlace = `${urlFrontend}/solicitudes/${idSolicitud}?accion=recibido`;
    return `<a href="${enlace}" class="btn">Confirmar recepcion</a>`;
}

async function generarQR(solicitud) {
    const url = `${urlFrontend}/solicitudes/${solicitud.id}`;
    return await QRCode.toDataURL(url);
}

// Reto 3: genera un archivo de texto plano con el resumen de la solicitud
// para adjuntarlo al correo (no requiere ninguna libreria extra).
function generarAdjuntoResumen(solicitud, titulo) {
    const contenido =
        `SmartNotify Solutions
${titulo}

Solicitud N°: ${solicitud.id}
Cliente: ${solicitud.nombre_cliente}
Correo: ${solicitud.correo}
Asunto: ${solicitud.asunto}
Estado actual: ${solicitud.estado}
Fecha: ${new Date().toLocaleString("es-CR")}
${solicitud.descripcion ? `\nDescripcion:\n${solicitud.descripcion}` : ""}

Este documento fue generado automaticamente por SmartNotify Solutions.`;

    return Buffer.from(contenido, 'utf-8');
}

// rellena la plantilla con los datos de la solicitud
async function generarContenidoCorreo(solicitud, titulo, esNueva = false) {
    const qr = await generarQR(solicitud);

    const datos = {
        titulo,
        id: solicitud.id,
        cliente: solicitud.nombre_cliente,
        correo: solicitud.correo,
        asunto: solicitud.asunto,
        estado: solicitud.estado,
        fecha: new Date().toLocaleString("es-CR"),
        qr,
        enlaceConsultar: `${urlFrontend}/solicitudes/${solicitud.id}`,
        enlaceConfirmar: `${urlFrontend}/solicitudes/${solicitud.id}?accion=confirmar`,
        enlaceCancelar: `${urlFrontend}/solicitudes/${solicitud.id}?accion=cancelar`,
        enlaceFormulario: `${urlFrontend}/solicitudes/${solicitud.id}?accion=formulario`,
        boton_recibido: botonRecibido(solicitud.id, esNueva)
    };

    let cuerpo = plantilla;

    for (const [marcador, valor] of Object.entries(datos)) {
        cuerpo = cuerpo.replaceAll(`{{${marcador}}}`, valor);
    }

    return cuerpo;
}

// arma el correo segun el estado y lo envia
async function enviarCorreoSolicitud(solicitud, esNueva = false) {
    const titulo = tituloPorEstado[solicitud.estado] || "Actualizacion de Solicitud";

    await transportador.sendMail({
        from: process.env.SMTP_FROM,
        to: solicitud.correo,
        subject: `${titulo} - Solicitud #${solicitud.id}`,
        html: await generarContenidoCorreo(solicitud, titulo, esNueva),
        attachments: [
            {
                filename: `solicitud_${solicitud.id}.txt`,
                content: generarAdjuntoResumen(solicitud, titulo)
            }
        ]
    });
}

export default { enviarCorreoSolicitud };