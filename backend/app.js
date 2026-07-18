import express from "express";
import cors from "cors";

import solicitudesRouter    from './routes/solicitudes.routes.js';
import mensajesRouter       from './routes/mensajes.routes.js';
import evaluacionesRouter   from './routes/evaluaciones.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v0/solicitudes', solicitudesRouter);
app.use('/api/v0/mensajes', mensajesRouter);
app.use('/api/v0/evaluaciones', evaluacionesRouter);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API SmartNotifySolutions funcionando correctamente."
    });
});

export default app;