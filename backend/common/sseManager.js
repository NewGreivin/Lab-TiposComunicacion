let clientesSSE = [];

export function conectarCliente(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });
    
    res.write(": conexión establecida\n\n");

    const cliente = {
        id: Date.now() + Math.random(),
        response: res
    };

    clientesSSE.push(cliente);

    req.on("close", () => {
        clientesSSE = clientesSSE.filter(c => c.id !== cliente.id);
    });

    return cliente;
}


export function emitirEvento(evento, datos) {
    const payload = `event: ${evento}\ndata: ${JSON.stringify(datos)}\n\n`;

    clientesSSE.forEach(cliente => {
        cliente.response.write(payload);
    });
}