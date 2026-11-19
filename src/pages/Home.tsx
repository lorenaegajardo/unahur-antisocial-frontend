
import { Button, Col, Container, Row, Spinner, Form } from "react-bootstrap";
import PostCard from "../components/PostCard";
import { obtenerPosts } from "../services/posts";
import { useEffect, useState } from "react";
import type { Post, Tag } from "../types/index";

const POSTS_POR_PAGINA = 5;

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
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

  // Obtener las etiquetas sin repetirlas.
  const etiquetas: Tag[] = Array.from(
    new Map(
      posts
        .flatMap((post) => post.Tags ?? [])
        .map((tag) => [tag.id, tag])
    ).values()
  ).sort((a, b) => a.name.localeCompare(b.name));

  // Filtrar las publicaciones por etiqueta.
  const postsFiltrados = etiquetaSeleccionada
    ? posts.filter((post) =>
        post.Tags?.some(
          (tag) => tag.id === Number(etiquetaSeleccionada)
        )
      )
    : posts;

  // Calcular las páginas y las publicaciones visibles.
  const totalPaginas = Math.ceil(
    postsFiltrados.length / POSTS_POR_PAGINA
  );

  const inicio = (paginaActual - 1) * POSTS_POR_PAGINA;
  const fin = inicio + POSTS_POR_PAGINA;

  const postsPaginados = postsFiltrados.slice(inicio, fin);

  // Cambiar el filtro y regresar a la primera página.
  const cambiarEtiqueta = (valor: string) => {
    setEtiquetaSeleccionada(valor);
    setPaginaActual(1);
  };

  // Cambiar de página.
  const cambiarPagina = (pagina: number) => {
    if (pagina < 1 || pagina > totalPaginas) return;

    setPaginaActual(pagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {/* Publicaciones de la página seleccionada */}
      <Row className="d-flex justify-content-center">
        {postsFiltrados.length === 0 ? (
          <Col xs={10} md={8} className="px-0">
            <div className="sinResultados">
              No hay publicaciones con esta etiqueta.
            </div>
          </Col>
        ) : (
          postsPaginados.map((p) => (
            <Col xs={10} md={8} key={p.id} className="px-0">
              <PostCard post={p} />
            </Col>
          ))
        )}
      </Row>

      {/* Navegación entre páginas */}
      {totalPaginas > 1 && (
        <div className="paginacionPosts">
          <p className="paginacionInfo">
            Página {paginaActual} de {totalPaginas}
          </p>

          <div className="paginacionBotones">
            <Button
              className="paginacionBoton"
              disabled={paginaActual === 1}
              onClick={() => cambiarPagina(paginaActual - 1)}
            >
              Anterior
            </Button>

            {Array.from(
              { length: totalPaginas },
              (_, index) => index + 1
            ).map((pagina) => (
              <Button
                key={pagina}
                className={`paginacionBoton ${
                  paginaActual === pagina ? "activa" : ""
                }`}
                onClick={() => cambiarPagina(pagina)}
                aria-label={`Ir a la página ${pagina}`}
                aria-current={
                  paginaActual === pagina ? "page" : undefined
                }
              >
                {pagina}
              </Button>
            ))}

            <Button
              className="paginacionBoton"
              disabled={paginaActual === totalPaginas}
              onClick={() => cambiarPagina(paginaActual + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Home;
