
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import UserPostCard from "../components/UserPostCard";

interface Post {
  id: number;
  description: string;
  userId: number;
}

function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cerrar sesión y regresar al inicio.
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Cargar las publicaciones del usuario.
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;

      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/posts?userId=${user.id}`
        );

        if (!response.ok) {
          throw new Error("No se pudieron cargar tus publicaciones.");
        }

        const data = await response.json();
        setUserPosts(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al conectar con el servidor."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  if (!user) return null;

  if (loading) {
    return (
      <Container className="estadoContainer">
        <div className="text-center bg-light p-5 rounded-5 border">
          <Spinner animation="border" />
          <h6 className="mt-2">Cargando tu perfil...</h6>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="estadoContainer">
        <div className="text-center bg-light p-4 rounded-2 border border-danger">
          <h4 className="text-center fw-bold text-danger">
            {error}
          </h4>

          <Button
            className="postButton mt-3"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      {/* Información del usuario */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={10} lg={8}>
          <div className="bg-white p-4 rounded-4 shadow-sm border d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="postUserLogo text-white d-flex align-items-center justify-content-center fs-4 fw-bold">
                {user.nickName.charAt(0).toUpperCase()}
              </div>

              <div>
                <h4 className="mb-0 fw-bold">
                  {user.nickName}
                </h4>

                <small className="text-muted">
                  Miembro de UnaHur Anti-Social Net
                </small>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="d-flex flex-wrap gap-2">
              <Button
                className="postButton"
                onClick={() => navigate("/")}
              >
                Volver al inicio
              </Button>

              <Button
                variant="outline-danger"
                className="fw-bold px-4"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Publicaciones del usuario */}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <h3 className="fw-bold mb-3">
            Mis publicaciones
          </h3>

          {userPosts.length === 0 ? (
            <div className="text-center bg-light p-5 rounded-4 border">
              <h5 className="mb-3">
                Todavía no realizaste ninguna publicación.
              </h5>

              <Button
                className="postButton"
                onClick={() => navigate("/crear-post")}
              >
                Crear publicación
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {userPosts.map((post) => (
                <UserPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;
