import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";

interface Tag {
  id: number;
  name: string;
}

function CrearPost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Cargamos el listado de etiquetas desde la API cuando se monta el componente
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${API_URL}/tags`);
        if (response.ok) {
          const data = await response.json();
          setTags(data);
        }
      } catch {
        console.error("No se pudieron cargar las etiquetas.");
      }
    };

    fetchTags();
  }, []);

  // Manejar la selección/deselección de etiquetas
  const handleTagToggle = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // Validación: La descripción es obligatoria
    if (!description.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }

    if (!user) {
      setError("Debes iniciar sesión para crear una publicación.");
      return;
    }

    setLoading(true);

    try {
      // 2. Hacemos el POST /posts
      const postResponse = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          userId: user.id,
          tagIds: selectedTags,
        }),
      });

      if (!postResponse.ok) {
        throw new Error("No se pudo crear la publicación.");
      }

      const newPost = await postResponse.json();
      const postId = newPost.id;

      // 3. Si se ingresó una URL de imagen, hacemos el POST /postimages asociado
      if (imageUrl.trim() && postId) {
        const imageResponse = await fetch(`${API_URL}/postimages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: imageUrl.trim(),
            postId: postId,
          }),
        });

        if (!imageResponse.ok) {
          console.error("La publicación se creó, pero hubo un error al asociar la imagen.");
        }
      }

      // 4. Redirigimos al perfil
      navigate("/perfil");
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <div className="createPostCard p-4 p-md-5">
            <h2 className="createPostTitle text-center">
              Crear nueva publicación
            </h2>

            <Form onSubmit={handleSubmit}>
              {/* Campo Descripción */}
              <Form.Group className="mb-3" controlId="description">
                <Form.Label className="fw-bold">
                  Descripción <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="¿Qué estás pensando?"
                  className="rounded-3 p-3"
                  style={{ resize: "vertical" }}
                />
              </Form.Group>

              {/* Campo URL de Imagen */}
              <Form.Group className="mb-4" controlId="imageUrl">
                <Form.Label className="fw-bold">URL de imagen <span className="text-muted fw-normal">(opcional)</span></Form.Label>
                <Form.Control
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="rounded-3 p-2"
                />
              </Form.Group>

              {/* Selección de Etiquetas */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold d-block">Etiquetas</Form.Label>
                {tags.length === 0 ? (
                  <small className="text-muted">Cargando etiquetas...</small>
                ) : (
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => {
                      const isSelected = selectedTags.includes(tag.id);
                      return (
                        <div
                          key={tag.id}
                          onClick={() => handleTagToggle(tag.id)}
                          className={`createPostTag user-select-none ${
                            isSelected ? "selected" : ""
                          }`}
                          style={{ fontSize: "0.9rem" }}
                        >
                          #{tag.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Form.Group>

              {/* Mensaje de error */}
              {error && (
                <Alert variant="danger" className="py-2 text-center fw-bold">
                  {error}
                </Alert>
              )}

              {/* Botón de envío */}
              <div className="d-grid mt-4">
                <Button
                  type="submit"
                  className="postButton py-2 fs-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Publicando...
                    </>
                  ) : (
                    "Publicar"
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CrearPost;