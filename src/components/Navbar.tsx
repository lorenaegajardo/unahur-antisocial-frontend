import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// La barra muestra diferentes opciones según el estado de sesión.
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Inicio</Link> |{" "}

      {user ? (
        <>
          <span>Hola, {user.nickName}</span> |{" "}
          <Link to="/perfil">Mi perfil</Link> |{" "}
          <Link to="/crear-post">Crear publicación</Link> |{" "}
          <button type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar sesión</Link> |{" "}
          <Link to="/registro">Registrarse</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

//Si hay un usuario conectado, mostramos su nickName, el perfil, la creación de publicaciones y el botón para cerrar sesión.
//Si no hay sesión, mostramos los enlaces de login y registro.
//Al cerrar sesión, llamamos a logout() para limpiar el contexto y localStorage.