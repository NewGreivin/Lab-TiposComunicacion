import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SolicitudesPage from "./pages/SolicitudesPage";
import NuevaSolicitudPage from "./pages/NuevaSolicitudPage";
import SolicitudDetallePage from "./pages/SolicitudDetallePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SolicitudesPage />} />
        <Route path="/solicitudes/nueva" element={<NuevaSolicitudPage />} />
        <Route path="/solicitudes/:id" element={<SolicitudDetallePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;