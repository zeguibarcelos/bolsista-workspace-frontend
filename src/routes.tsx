import { Routes, Route } from "react-router-dom";
import Calendario from "./pages/Calendario";
import Inicio from "./pages/Inicio";
import Evento from "./pages/EventoRegister";
import Administrador from "./pages/Administrador";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/calendario" element={<Calendario />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/adm" element={<Administrador />} />
      <Route path="evento/:id" element={<Evento />} />
    </Routes>
  );
};

export default MainRoutes;
