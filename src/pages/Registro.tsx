
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
import { API_URL } from "../services/api";

function Registro() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Valida los datos y registra al usuario.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!nickName.trim() || !email.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickName: nickName.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "No se pudo crear el usuario."
        );
      }

      // Muestra la confirmación y redirige al login.
      setSuccess("¡Usuario registrado con éxito! Redirigiendo al login...");
      setNickName("");
      setEmail("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "No se pudo conectar con el servidor.");
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
                Crear una cuenta
              </h1>

              <p className="authSubtitle">
                Sumate a UnaHur Anti-Social Net
              </p>
            </div>

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="nickName">
                <Form.Label className="authLabel">
                  Nombre de usuario
                </Form.Label>

                <Form.Control
                  type="text"
                  value={nickName}
                  onChange={(event) => setNickName(event.target.value)}
                  placeholder="Elegí un nombre de usuario"
                  autoComplete="username"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="email">
                <Form.Label className="authLabel">
                  Correo electrónico
                </Form.Label>

                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="ejemplo@correo.com"
                  autoComplete="email"
                />
              </Form.Group>

              {error && (
                <Alert variant="danger" role="alert">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" role="status">
                  {success}
                </Alert>
              )}

              <Button
                type="submit"
                className="postButton authSubmit w-100"
                disabled={loading || Boolean(success)}
              >
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Registrando...
                  </>
                ) : (
                  "Registrarse"
                )}
              </Button>
            </Form>

            <div className="authFooter text-center mt-4">
              ¿Ya tenés una cuenta?{" "}
              <Link to="/login" className="authLink">
                Iniciá sesión
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}

export default Registro;
