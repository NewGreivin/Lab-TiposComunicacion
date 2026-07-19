//Lista los clientes esperando cambios. 
let waitingClients = [];

export function registrarEspera(idSolicitud, estadoConocido, res) {
    const client = {
        id: Date.now() + Math.random(),
        idSolicitud: Number(idSolicitud),
        estadoConocido,
        response: res
    };

    waitingClients.push(client);
    return client;
}

export function removerCliente(clientId) {
    waitingClients = waitingClients.filter(c => c.id !== clientId);
}

export function notificarCambio(idSolicitud, solicitudActualizada) {
    const idNum = Number(idSolicitud);

    const interesados = waitingClients.filter(c => c.idSolicitud === idNum);

    // saco a los interesados de la lista general
    waitingClients = waitingClients.filter(c => c.idSolicitud !== idNum);

    for (const client of interesados) {
        if (!client.response.headersSent) {
            client.response.json({
                ok: true,
                timeout: false,
                data: solicitudActualizada
            });
        }
    }
}