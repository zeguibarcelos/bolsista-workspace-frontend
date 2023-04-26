import { Routes, Route } from "react-router-dom";
import Calendario from "./pages/Calendario";
import AreaDeTrabalho from "./pages/AreaDeTrabalho";
import Evento from "./pages/EventoRegister";
import Administrador from "./pages/Administrador";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/calendario" element={<Calendario />} />
      <Route path="/inicio" element={<AreaDeTrabalho />} />
      <Route path="/adm" element={<Administrador />} />
      <Route path="evento/:id" element={<Evento />} />
    </Routes>
  );
};

export default MainRoutes;
