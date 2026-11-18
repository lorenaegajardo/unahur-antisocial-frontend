
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { API_URL } from "../services/api";
import type { Comment } from "../types/index";

interface CommentListProps {
  postId: number;
  actualizacion: number;
}

function CommentList({ postId, actualizacion }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carga los comentarios y actualiza la lista cuando es necesario.
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/comments/post/${postId}`
        );

        if (!response.ok) {
          throw new Error("No se pudieron cargar los comentarios.");
        }

        const data = await response.json();
        setComments(data);
      } catch (err: any) {
        setError(err.message || "Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, actualizacion]);

  return (
    <section className="commentSection">
      <h3 className="commentTitle">
        Comentarios
        {!loading && !error && (
          <span className="commentCount">{comments.length}</span>
        )}
      </h3>

      {loading ? (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" />
          <span>Cargando comentarios...</span>
        </div>
      ) : error ? (
        <p role="alert" className="text-danger mb-0">
          {error}
        </p>
      ) : comments.length === 0 ? (
        <p className="commentEmpty mb-0">
          No hay comentarios todavía. ¡Sé el primero en comentar!
        </p>
      ) : (
        <ul className="commentList">
          {comments.map((comment) => (
            <li key={comment.id} className="commentItem">
              <div className="commentAvatar">
                <span aria-hidden="true">C</span>
              </div>

              <p className="commentText">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CommentList;
