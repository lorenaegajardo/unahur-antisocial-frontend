import { Link } from "react-router-dom"; //para navegar entre páginas sin recargar toda la aplicación.

// Barra de navegación provisoria.
// Mañana agregaremos los enlaces según el estado de sesión del usuario.

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link> |{" "}
      <Link to="/login">Iniciar sesión</Link> |{" "}
      <Link to="/registro">Registrarse</Link> |{" "}
      <Link to="/perfil">Mi perfil</Link> |{" "}
      <Link to="/crear-post">Crear publicación</Link>
    </nav>
  );
}

export default Navbar;