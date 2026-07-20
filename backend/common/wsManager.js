import WebSocket, {WebSocketServer} from "ws";
import mensajesService from "../services/mensajes.service.js";

const salas = new Map();

function unirseASala(idSolicitud, socket) {
    if (!salas.has(idSolicitud)) {
        salas.set(idSolicitud, new Set());
    }

    salas.get(idSolicitud).add(socket);
}

function salirDeSala(idSolicitud, socket) {
    const sala = salas.get(idSolicitud);

    if (!sala) return;

    sala.delete(socket);

    if (sala.size === 0) {
        salas.delete(idSolicitud);
    }
}

function emitirASala(idSolicitud, payload) {
    const sala = salas.get(idSolicitud);

    if (!sala) return;

    const data = JSON.stringify(payload);

    sala.forEach((cliente) => {
        if (cliente.readyState === WebSocket.OPEN) {
            cliente.send(data);
        }
    });
}

export function inicializarWebSocket(server) {
    const wss = new WebSocketServer({ server, path: "/ws/mensajes" });

    wss.on("connection", (socket, req) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const idSolicitud = Number(url.searchParams.get("idSolicitud"));

        if (!idSolicitud) {
            socket.close(1008, "Falta el parametro idSolicitud.");
            return;
        }

        unirseASala(idSolicitud, socket);

        socket.send(JSON.stringify({
            tipo: "conexion",
            mensaje: `Conectado al chat de la solicitud ${idSolicitud}.`
        }));

        socket.on("message", async (raw) => {
            try {
                const { emisor, mensaje } = JSON.parse(raw);

                if (!emisor || !["Cliente", "Tecnico"].includes(emisor)) {
                    socket.send(JSON.stringify({
                        tipo: "error",
                        mensaje: "El emisor debe ser Cliente o Tecnico."
                    }));
                    return;
                }

                if (!mensaje || !mensaje.trim()) {
                    socket.send(JSON.stringify({
                        tipo: "error",
                        mensaje: "El mensaje no puede estar vacio."
                    }));
                    return;
                }

                // Se reutiliza la misma capa de servicio que usa el
                // endpoint REST POST /api/v0/mensajes/:id
                const mensajeGuardado = await mensajesService.crear({
                    solicitud_id: idSolicitud,
                    emisor,
                    mensaje
                });

                emitirASala(idSolicitud, {
                    tipo: "nuevo-mensaje",
                    data: mensajeGuardado
                });

            } catch (error) {
                socket.send(JSON.stringify({
                    tipo: "error",
                    mensaje: error.message
                }));
            }
        });

        socket.on("close", () => {
            salirDeSala(idSolicitud, socket);
        });
    });

    return wss;
}
