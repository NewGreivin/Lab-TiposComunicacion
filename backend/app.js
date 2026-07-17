import express from "express";
import cors from "cors";

//import colaboradoresRouter from './routes/colaborador.routes.js';

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

//app.use('/api/v0/colaboradores', colaboradoresRouter);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API SmartNotifySolutions funcionando correctamente."
    });
});

export default app;