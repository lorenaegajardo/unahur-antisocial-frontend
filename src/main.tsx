import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css";

// BrowserRouter permite navegar entre las páginas.
// AuthProvider comparte la sesión del usuario en toda la aplicación. para que todas las páginas y componentes puedan acceder a la sesión del usuario.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);