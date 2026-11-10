import { Col, Container, Row } from "react-bootstrap";
import PostCard from "../components/PostCard";
import { obtenerPosts } from "../services/posts"
import { useEffect, useState } from "react";
import type { Post } from "../types/index"

function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    (async () => {
      const data: Post[] = await obtenerPosts()
      setPosts(data)
    })()
  }, [])

  return (
    <Container className="mt-4">
      <Row className="d-flex justify-content-center">
        {posts.map((p) => (
          <Col xs={10} md={8} key={p.id} className="px-0">
            <PostCard post={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;