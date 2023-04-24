import { Routes, Route } from "react-router-dom";
import Calendario from "./pages/Calendario";
import AreaDeTrabalho from "./pages/AreaDeTrabalho";
import Evento from "./pages/EventoRegister";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/calendario" element={<Calendario />} />
      <Route path="/inicio" element={<AreaDeTrabalho />} />
      <Route path="evento/:id" element={<Evento />} />
    </Routes>
  );
};

export default MainRoutes;
