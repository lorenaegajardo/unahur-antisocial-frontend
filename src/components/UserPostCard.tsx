
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
  const [commentCount, setCommentCount] = useState<number>(0);

  // Busca la primera imagen de la publicación.
  useEffect(() => {
    setImageUrl(null);

    fetch(`${API_URL}/postimages/post/${post.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo cargar la imagen.");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setImageUrl(data[0].url);
        }
      })
      .catch(() => {});
  }, [post.id]);

  // Busca la cantidad de comentarios de la publicación.
  useEffect(() => {
    setCommentCount(0);

    fetch(`${API_URL}/comments/post/${post.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudieron cargar los comentarios.");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCommentCount(data.length);
        }
      })
      .catch(() => {});
  }, [post.id]);

  return (
    <article className="postCard userPostCard p-3 p-md-4">
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        {/* Miniatura de la publicación */}
        <div className="userPostImage">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Miniatura de la publicación"
            />
          ) : (
            <span>Sin imagen</span>
          )}
        </div>

        {/* Descripción y contador de comentarios */}
        <div className="userPostContent">
          <p className="userPostDescription mb-1">
            {post.description}
          </p>

          <small className="text-muted">
            Comentarios: <span className="commentCount">{commentCount}</span>
          </small>
        </div>
      </div>

      {/* Enlace al detalle */}
      <Button
        as={Link as any}
        to={`/post/${post.id}`}
        className="postButton userPostButton text-nowrap"
        size="sm"
      >
        Ver más
      </Button>
    </article>
  );
}