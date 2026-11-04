import { Outlet } from "react-router-dom";

// Componente para agrupar las rutas que requieren iniciar sesión.
// Mañana agregaremos la validación del usuario y la redirección al login.

function ProtectedRoute() {
  return <Outlet />; //indica dónde React Router debe mostrar la página correspondiente a una ruta hija.
}

export default ProtectedRoute;