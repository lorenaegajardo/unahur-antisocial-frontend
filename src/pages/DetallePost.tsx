
import { Button, Container, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { obtenerPostPorId } from "../services/posts";
import { useEffect, useState } from "react";
import type { Post } from "../types";
import PostCard from "../components/PostCard";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

function DetallePost() {
  const { id } = useParams();
  const postId = Number(id);

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [actualizacion, setActualizacion] = useState(0);

  // Cargar la publicación seleccionada.
  useEffect(() => {
    let activo = true;

    const cargarPost = async () => {
      setLoading(true);
      setError("");
      setPost(null);

      if (!id || !Number.isInteger(postId) || postId <= 0) {
        setLoading(false);
        return;
      }

      try {
        const data = await obtenerPostPorId(postId);

        if (activo) {
          setPost(data);
        }
      } catch {
        if (activo) {
          setError("No pudimos cargar la publicación. Intentá nuevamente.");
        }
      } finally {
        if (activo) {
          setLoading(false);
        }
      }
    };

    cargarPost();

    return () => {
      activo = false;
    };
  }, [id, postId]);

  // Botón para regresar al inicio.
  const botonVolver = (
    <Button as={Link as any} to="/" className="postButton mt-3">
      Volver al inicio
    </Button>
  );

  if (loading) {
    return (
      <Container className="estadoContainer">
        <div className="text-center bg-light p-5 rounded-5 border">
          <Spinner animation="border" />
          <h6>Cargando publicación...</h6>
          {botonVolver}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="estadoContainer">
        <div className="text-center bg-light p-4 rounded-2 border border-danger">
          <h4 className="fw-bold">{error}</h4>
          {botonVolver}
        </div>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="estadoContainer">
        <div className="text-center bg-light p-4 rounded-5 shadow-sm border">
          <h2 className="fw-bold">Publicación no encontrada</h2>
          <h6>La publicación no existe o fue eliminada.</h6>
          {botonVolver}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {botonVolver}

      {/* Publicación completa */}
      <PostCard post={post} isExpanded={true} />

      {/* Formulario para agregar comentarios */}
      <CommentForm
        postId={postId}
        onCommentAdded={() => {
          setActualizacion((anterior) => anterior + 1);
        }}
      />

      {/* Listado de comentarios actualizado */}
      <CommentList
        postId={postId}
        actualizacion={actualizacion}
      />
    </Container>
  );
}

export default DetallePost;
