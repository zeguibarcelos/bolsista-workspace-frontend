import logo from "./logo.svg";
import "./App.css";
import MainRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu";
import { AppThemeProvider } from "./context/themeContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppThemeProvider>
          <Menu>
            <MainRoutes />
          </Menu>
        </AppThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
