import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import PostCard from "../components/PostCard";
import { obtenerPosts } from "../services/posts"
import { useEffect, useState } from "react";
import type { Post } from "../types/index"

function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [postsVisibles, setPostsVisibles] = useState(5)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data: Post[] = await obtenerPosts()
        setPosts(data)
      } catch (error) {
        setError("Hubo un error al cargar los posts.")
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
          <h6>Cargando publicaciones...</h6>
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

  return (
    <Container className="mt-4">
      <Row className="d-flex justify-content-center">
        {posts.slice(0, postsVisibles).map((p) => (
          <Col xs={10} md={8} key={p.id} className="px-0">
            <PostCard post={p} />
          </Col>
        ))}
      </Row>

      {(posts.length > postsVisibles) &&
        <div className="d-flex justify-content-center pt-2 pb-4">
          <Button variant="outline-dark" size="lg" className="fw-bold" onClick={() => setPostsVisibles(prev => prev + 5)}>
            Cargar más posts
          </Button>
        </div>
      }
    </Container>
  );
}

export default Home;