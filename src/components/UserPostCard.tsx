import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { API_URL } from "../services/api";

interface Post {
  id: number;
  description: string;
  userId: number;
}

interface UserPostCardProps {
  post: Post;
}

export default function UserPostCard({ post }: UserPostCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Consultamos las imágenes asociadas a este post específico
    fetch(`${API_URL}/postimages/post/${post.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setImageUrl(data[0].url); // Tomamos la primera imagen como miniatura
        }
      })
      .catch(() => {});
  }, [post.id]);

  return (
    <div className="postCard p-3 p-md-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
      <div className="d-flex align-items-center gap-3 flex-grow-1 min-w-0">
        {/* Miniatura de la imagen */}
        {imageUrl ? (
          <div 
            style={{ width: "70px", height: "70px", flexShrink: 0 }} 
            className="rounded-3 overflow-hidden bg-light border d-flex align-items-center justify-content-center"
          >
            <img 
              src={imageUrl} 
              alt="Miniatura publicación" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
        ) : (
          <div 
            style={{ width: "70px", height: "70px", flexShrink: 0 }} 
            className="rounded-3 overflow-hidden bg-light border d-flex align-items-center justify-content-center text-muted"
          >
            <small className="text-center" style={{ fontSize: "0.65rem" }}>Sin imagen</small>
          </div>
        )}

        {/* Descripción truncada */}
        <div className="flex-grow-1 min-w-0">
          <p className="postCardText mb-0 text-truncate" style={{ WebkitLineClamp: 2 }}>
            {post.description}
          </p>
        </div>
      </div>

      {/* Botón de acción */}
      <div className="text-end text-md-center">
        <Button
          as={Link as any}
          to={`/post/${post.id}`}
          className="postButton text-nowrap"
          size="sm"
        >
          Ver más
        </Button>
      </div>
    </div>
  );
}