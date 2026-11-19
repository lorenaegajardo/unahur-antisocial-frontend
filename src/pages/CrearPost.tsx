import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
  InputGroup,
} from "react-bootstrap";

interface Tag {
  id: number;
  name: string;
}

function CrearPost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar las etiquetas disponibles desde la API.
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

  // Seleccionar o quitar etiquetas.
  const handleTagToggle = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // Actualizar el valor de un campo de URL específico.
  const handleImageUrlChange = (index: number, value: string) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value;
    setImageUrls(updatedUrls);
  };

  // Agregar un nuevo campo de URL vacío.
  const handleAddImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  // Eliminar un campo de URL específico.
  const handleRemoveImageField = (index: number) => {
    if (imageUrls.length === 1) {
      setImageUrls([""]);
      return;
    }
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  // Crear una publicación.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // La descripción es obligatoria.
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
      // 1. Crear la publicación en la API.
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

      // 2. Filtrar URLs no vacías y asociar cada imagen mediante POST /postimages.
      const validUrls = imageUrls
        .map((url) => url.trim())
        .filter((url) => url !== "");

      if (validUrls.length > 0 && postId) {
        await Promise.all(
          validUrls.map(async (url) => {
            const imageResponse = await fetch(`${API_URL}/postimages`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                url,
                postId,
              }),
            });

            if (!imageResponse.ok) {
              console.error(`Error al asociar la imagen: ${url}`);
            }
          })
        );
      }

      // 3. Ir al perfil después de publicar.
      navigate("/perfil");
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

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <div className="createPostCard p-4 p-md-5">
            <h2 className="createPostTitle text-center">
              Crear nueva publicación
            </h2>

            <Form onSubmit={handleSubmit}>
              {/* Descripción */}
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
                  disabled={loading}
                />
              </Form.Group>

              {/* URLs de imágenes dinámicas */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">
                  URLs de imágenes{" "}
                  <span className="text-muted fw-normal">(opcional)</span>
                </Form.Label>

                <div className="d-flex flex-column gap-2">
                  {imageUrls.map((url, index) => (
                    <InputGroup key={index}>
                      <Form.Control
                        type="url"
                        value={url}
                        onChange={(e) =>
                          handleImageUrlChange(index, e.target.value)
                        }
                        placeholder={`https://ejemplo.com/imagen-${index + 1}.jpg`}
                        className="p-2"
                        disabled={loading}
                        aria-label={`URL de imagen ${index + 1}`}
                      />
                      {imageUrls.length > 1 && (
                        <Button
                          type="button"
                          variant="outline-danger"
                          onClick={() => handleRemoveImageField(index)}
                          disabled={loading}
                          title="Quitar imagen"
                        >
                          ✕
                        </Button>
                      )}
                    </InputGroup>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline-dark"
                  size="sm"
                  className="mt-2 fw-semibold"
                  onClick={handleAddImageField}
                  disabled={loading}
                >
                  + Agregar otra imagen
                </Button>
              </Form.Group>

              {/* Selección de etiquetas */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold d-block">
                  Etiquetas
                </Form.Label>

                {tags.length === 0 ? (
                  <small className="text-muted">
                    Cargando etiquetas...
                  </small>
                ) : (
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => {
                      const isSelected = selectedTags.includes(tag.id);

                      return (
                        <div
                          key={tag.id}
                          onClick={() => {
                            if (!loading) {
                              handleTagToggle(tag.id);
                            }
                          }}
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
                <Alert
                  variant="danger"
                  className="py-2 text-center fw-bold"
                >
                  {error}
                </Alert>
              )}

              {/* Botones para cancelar o publicar */}
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline-secondary"
                  className="py-2 flex-fill"
                  onClick={() => navigate("/")}
                  disabled={loading}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  className="postButton py-2 fs-6 flex-fill"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
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