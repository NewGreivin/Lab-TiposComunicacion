import dotenv from "dotenv";
import http from "http";

import app from "./app.js";
import { inicializarWebSocket } from "./common/wsManager.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

inicializarWebSocket(server);

server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto http://localhost:${PORT}`);
    console.log(`Websocket chat diponible en ws://localhost:${PORT}/ws/mensajes`);
});