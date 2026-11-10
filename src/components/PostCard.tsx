import { useEffect, useState } from "react";
import { obtenerPostImages } from "../services/posts"
import { obtenerComentarios } from "../services/comments"
import { Button, Card } from "react-bootstrap";
import comment from "../assets/message-square.svg"
import type { Post, PostImage, Comment } from "../types/index"
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const fecha: (Date | null) = post.createdAt ? new Date(post.createdAt) : null
  const [comentarios, setComentarios] = useState<Comment[]>([])
  const [imagenes, setImagenes] = useState<PostImage[]>([])
  const [imagenActual, setImagenActual] = useState<number>(0)

  useEffect(() => {
    (async () => {
      const [comments, images] = await Promise.all([obtenerComentarios(post.id), obtenerPostImages(post.id)])
      setComentarios(comments)
      setImagenes(images)
    })()
  }, [])

  return (
    <Card className="my-3 postCard">
      <Card.Body className="d-flex align-items-center pb-0">
        <div className="d-flex align-items-center justify-content-center postUserLogo">
          <h2 className="m-0 fw-bold text-light">{post.User?.nickName[0].toUpperCase()}</h2>
        </div>
        <div className="mx-2">
          <Card.Text className="mb-0 fw-bold">@{post.User?.nickName} </Card.Text>
          <Card.Text>{fecha?.toLocaleDateString("es-AR")}</Card.Text>
        </div>
      </Card.Body>
      <Card.Body className="d-flex flex-wrap align-items-center gap-2 pb-0 pt-2">
        {post.Tags?.map((t) => (
          <Card.Text className="m-0 px-2 postTag fw-bold" key={t.id}>
            #{t.name}
          </Card.Text>
        ))}
      </Card.Body>
      <Card.Body className="py-1">
        <Card.Text>
          {post.description}
        </Card.Text>
      </Card.Body>
      {imagenes?.length > 0 &&
        <Card.Body className="d-flex align-items-center justify-content-center border-top postImageContainer">
          {imagenes.length > 1 &&
            <Button variant="dark" className="postImageButton" disabled={!imagenes[imagenActual - 1]} onClick={() => { setImagenActual(imagenActual - 1) }}>
              {"<"}
            </Button>}
          <Card.Img variant="top" className="postImage" src={imagenes[imagenActual]?.url} alt={`Imagen ${imagenActual}`} />
          {imagenes.length > 1 &&
            <Button variant="dark" className="postImageButton" disabled={!imagenes[imagenActual + 1]} onClick={() => { setImagenActual(imagenActual + 1) }}>
              {">"}
            </Button>}
        </Card.Body>
      }
      <Card.Body className="pt-2 d-flex justify-content-between border-top" >
        <Button as={Link as any} to={`/post/${post.id}`} className="d-flex postButton">
          <img src={comment} style={{ width: "1.5rem" }} alt="Logo comentario" />
          <Card.Text className="mx-1">{comentarios?.length}</Card.Text>
        </Button>
        <Button as={Link as any} to={`/post/${post.id}`} className="postButton">
          Ver Más
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PostCard;