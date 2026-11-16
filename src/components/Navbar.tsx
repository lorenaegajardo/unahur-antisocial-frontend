import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <BsNavbar bg="white" expand="lg" className="shadow-sm py-3 mb-4 border-bottom">
      <Container>
        {/* Nombre de la App */}
        <BsNavbar.Brand as={Link} to="/" className="fw-bold fs-5 text-dark">
          UnaHur <span className="text-primary">Anti-Social Net</span>
        </BsNavbar.Brand>

        {/* Botón hamburguesa para celulares */}
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenido colapsable */}
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-3">
            <Nav.Link as={Link} to="/" className="fw-semibold text-dark">
              Inicio
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/perfil" className="fw-semibold text-dark">
                  Mi perfil
                </Nav.Link>
                <Nav.Link as={Link} to="/crear-post" className="fw-semibold text-dark">
                  Crear publicación
                </Nav.Link>

                {/* Sección de usuario y cierre de sesión */}
                <div className="d-flex align-items-center justify-content-between justify-content-lg-start gap-3 mt-3 mt-lg-0 pt-3 pt-lg-0 border-top border-lg-top-0 ms-lg-2">
                  <div className="d-flex align-items-center gap-2">
                    <div 
                      className="postUserLogo text-white d-flex align-items-center justify-content-center fw-bold"
                      style={{ width: "2rem", height: "2rem", fontSize: "0.85rem" }}
                    >
                      {user.nickName.charAt(0).toUpperCase()}
                    </div>
                    <span className="fw-bold text-dark">
                      {user.nickName}
                    </span>
                  </div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="fw-bold px-3"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </>
            ) : (
              <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0 pt-3 pt-lg-0 border-top border-lg-top-0 ms-lg-2">
                <Button
                  as={Link as any}
                  to="/login"
                  variant="outline-dark"
                  size="sm"
                  className="fw-bold px-3"
                >
                  Iniciar sesión
                </Button>
                <Button
                  as={Link as any}
                  to="/registro"
                  size="sm"
                  className="postButton fw-bold px-3"
                >
                  Registrarse
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