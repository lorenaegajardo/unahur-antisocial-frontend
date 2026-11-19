
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";
import type { User } from "../types";

function Login() {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Valida los datos y comprueba que el usuario exista.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!nickName.trim() || !password) {
      setError("Completá todos los campos.");
      return;
    }

    if (password !== "123456") {
      setError("Contraseña incorrecta.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users`);

      if (!response.ok) {
        throw new Error("No se pudieron consultar los usuarios.");
      }

      const users: User[] = await response.json();

      const foundUser = users.find(
        (user) => user.nickName === nickName.trim()
      );

      if (!foundUser) {
        setError("El usuario no existe.");
        return;
      }

      // Guarda la sesión y vuelve al inicio.
      login(foundUser);
      navigate("/");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="authPage">
      <Container className="d-flex justify-content-center">
        <Card className="authCard w-100">
          <Card.Body className="p-4 p-md-5">

            <div className="text-center mb-4">
              <div className="authLogo mx-auto mb-3">
                U
              </div>

              <h1 className="authTitle">
                Iniciar sesión
              </h1>

              <p className="authSubtitle">
                Bienvenido a UnaHur Anti-Social Net
              </p>
            </div>

            <Form onSubmit={handleSubmit} noValidate>
              {/* Nombre de usuario */}
              <Form.Group className="mb-3" controlId="nickName">
                <Form.Label className="authLabel">
                  Nombre de usuario
                </Form.Label>

                <Form.Control
                  type="text"
                  value={nickName}
                  onChange={(event) => setNickName(event.target.value)}
                  placeholder="Ingresá tu usuario"
                  autoComplete="username"
                />
              </Form.Group>

              {/* Contraseña */}
              <Form.Group className="mb-4" controlId="password">
                <Form.Label className="authLabel">
                  Contraseña
                </Form.Label>

                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Ingresá tu contraseña"
                  autoComplete="current-password"
                />
              </Form.Group>

              {/* Mensaje de error */}
              {error && (
                <Alert variant="danger" role="alert">
                  {error}
                </Alert>
              )}

              {/* Botón para iniciar sesión */}
              <Button
                type="submit"
                className="postButton authSubmit w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Ingresando...
                  </>
                ) : (
                  "Ingresar"
                )}
              </Button>
            </Form>

            {/* Enlace para registrarse */}
            <div className="authFooter text-center mt-4">
              ¿Todavía no tenés una cuenta?{" "}
              <Link to="/registro" className="authLink">
                Registrate
              </Link>
            </div>

            {/* Regresar al inicio */}
            <div className="text-center mt-3">
              <Link to="/" className="authLink">
                Volver al inicio
              </Link>
            </div>

          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}

export default Login;
