
import { Button, Col, Container, Row, Spinner, Form } from "react-bootstrap";
import PostCard from "../components/PostCard";
import { obtenerPosts } from "../services/posts";
import { useEffect, useState } from "react";
import type { Post, Tag } from "../types/index";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsVisibles, setPostsVisibles] = useState(5);
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data: Post[] = await obtenerPosts();
        setPosts(data);
      } catch {
        setError("Hubo un error al cargar los posts.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Obtener las etiquetas de las publicaciones sin repetirlas.
  const etiquetas: Tag[] = Array.from(
    new Map(
      posts
        .flatMap((post) => post.Tags ?? [])
        .map((tag) => [tag.id, tag])
    ).values()
  ).sort((a, b) => a.name.localeCompare(b.name));

  // Filtrar las publicaciones por la etiqueta elegida.
  const postsFiltrados = etiquetaSeleccionada
    ? posts.filter((post) =>
        post.Tags?.some(
          (tag) => tag.id === Number(etiquetaSeleccionada)
        )
      )
    : posts;

  // Al cambiar el filtro, volver a mostrar los primeros 5 posts.
  const cambiarEtiqueta = (valor: string) => {
    setEtiquetaSeleccionada(valor);
    setPostsVisibles(5);
  };

  if (loading) {
    return (
      <Container className="estadoContainer">
        <div className="text-center bg-light p-5 rounded-5 border">
          <Spinner animation="border" />
          <h6>Cargando publicaciones...</h6>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="estadoContainer">
        <div className="text-center bg-light p-4 rounded-2 border border-danger">
          <h4 className="text-center fw-bold">{error}</h4>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Filtro de publicaciones por etiquetas */}
      <Row className="justify-content-center mb-4">
        <Col xs={10} md={8} className="px-0">
          <div className="filtroEtiquetas">
            <Form.Label htmlFor="filtro-etiquetas">
              Filtrar publicaciones por etiqueta
            </Form.Label>

            <Form.Select
              id="filtro-etiquetas"
              value={etiquetaSeleccionada}
              onChange={(e) => cambiarEtiqueta(e.target.value)}
            >
              <option value="">Todas las publicaciones</option>

              {etiquetas.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  #{tag.name.replace(/^#/, "")}
                </option>
              ))}
            </Form.Select>
          </div>
        </Col>
      </Row>

      {/* Publicaciones filtradas */}
      <Row className="d-flex justify-content-center">
        {postsFiltrados.length === 0 ? (
          <Col xs={10} md={8} className="px-0">
            <div className="sinResultados">
              No hay publicaciones con esta etiqueta.
            </div>
          </Col>
        ) : (
          postsFiltrados.slice(0, postsVisibles).map((p) => (
            <Col xs={10} md={8} key={p.id} className="px-0">
              <PostCard post={p} />
            </Col>
          ))
        )}
      </Row>

      {/* Mantener el botón para cargar más publicaciones */}
      {postsFiltrados.length > postsVisibles && (
        <div className="d-flex justify-content-center pt-2 pb-4">
          <Button
            variant="outline-dark"
            size="lg"
            className="fw-bold"
            onClick={() => setPostsVisibles((prev) => prev + 5)}
          >
            Cargar más posts
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Home;
