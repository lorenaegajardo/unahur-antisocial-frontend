
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Button,
} from "react-bootstrap";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Recupera el tema guardado.
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Aplica el tema y guarda la preferencia.
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  // Cierra la sesión y vuelve al inicio.
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <BsNavbar expand="lg" className="appNavbar py-3 mb-4">
      <Container>
        <BsNavbar.Brand
          as={Link}
          to="/"
          className="appBrand fw-bold fs-5"
        >
          UnaHur <span>Anti-Social Net</span>
        </BsNavbar.Brand>

        {/* Menú para pantallas pequeñas */}
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-3">
            <Nav.Link as={Link} to="/" className="appNavLink fw-semibold">
              Inicio
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/perfil"
                  className="appNavLink fw-semibold"
                >
                  Mi perfil
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/crear-post"
                  className="appNavLink fw-semibold"
                >
                  Crear publicación
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="appNavLink fw-semibold"
                >
                  Iniciar sesión
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/registro"
                  className="appNavLink fw-semibold"
                >
                  Registrarse
                </Nav.Link>
              </>
            )}

            {/* Cambia entre modo claro y oscuro */}
            <Button
              variant="outline-secondary"
              size="sm"
              className="themeButton"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={
                darkMode ? "Activar modo claro" : "Activar modo oscuro"
              }
            >
              {darkMode ? "☀ Claro" : "☾ Oscuro"}
            </Button>

            {user && (
              <div className="appUserSection d-flex align-items-center gap-3 flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  <div className="appUserAvatar">
                    {user.nickName.charAt(0).toUpperCase()}
                  </div>

                  <span className="appUserName fw-semibold">
                    {user.nickName}
                  </span>
                </div>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </div>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
