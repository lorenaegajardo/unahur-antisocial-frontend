import { useEffect, useState } from "react";
import { obtenerPostImages } from "../services/posts"
import { Button, Card } from "react-bootstrap";
import type { PostImage } from "../types/index"

interface postCardImageProp {
  postId: number
}

function PostCardImage({ postId }: postCardImageProp) {
  const [imagenes, setImagenes] = useState<PostImage[]>([])
  const [imagenActual, setImagenActual] = useState<number>(0)

  useEffect(() => {
    (async () => {
      const images = await obtenerPostImages(postId)
      setImagenes(images)
    })()
  }, [])

  return (
    imagenes?.length > 0 &&
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
  )
}

export default PostCardImage