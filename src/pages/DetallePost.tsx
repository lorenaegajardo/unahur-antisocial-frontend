import { Button, Container, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { obtenerPostPorId } from "../services/posts";
import { useEffect, useState } from "react";
import type { Post } from "../types";
import PostCard from "../components/PostCard";

function DetallePost() {
  const { id } = useParams()
  const postId = Number(id)
  const [post, setPost] = useState<Post | null>()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await obtenerPostPorId(postId)
        setPost(data)
      } catch (error) {
        setError("Hubo un error al cargar el post.")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <Container className="estadoContainer">
        <div className="text-center bg-light p-5 rounded-5 border">
          <Spinner animation="border" />
          <h6>Cargando publicación...</h6>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="estadoContainer">
        <div className="text-center bg-light p-4 rounded-2 border border-danger">
          <h4 className="text-center fw-bold">{error}</h4>
        </div>
      </Container>
    )
  }

  if (!post) {
    return (
      <Container className="estadoContainer">
        <div className="text-center bg-light p-4 rounded-5 shadow-sm border">
          <h2 className="fw-bold">Publicación no encontrada</h2>
          <h6>La publicación no existe o fue eliminada</h6>
          <Button as={Link as any} to={`/`} size="lg" className="postButton mt-3">
            Volver al inicio
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Button as={Link as any} to={`/`} className="postButton mt-3">
        Volver al inicio
      </Button>
      <PostCard post={post} isExpanded={true} />
    </Container>
  );
}

export default DetallePost;