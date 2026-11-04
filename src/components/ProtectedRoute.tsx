// Componente para agrupar las rutas que requieren iniciar sesión.
//Impedir que alguien sin sesión acceda a /perfil o /crear-post.

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protege las rutas que requieren iniciar sesión.
// Si no hay usuario conectado, redirige al login.
function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

//useAuth() consulta si existe un usuario conectado.
//Navigate redirige a /login cuando no hay sesión.
//Outlet permite mostrar la página solicitada cuando el usuario está conectado.
//replace evita dejar la ruta rechazada como una entrada adicional en el historial de navegación.