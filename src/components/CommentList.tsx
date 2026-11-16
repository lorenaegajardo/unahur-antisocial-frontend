// Lista de comentarios de una publicación.
// Gaby implementará la consulta a la API
// y mostrará los comentarios correspondientes.

import { useEffect, useState } from "react";
import { API_URL } from "../services/api";
import type { Comment } from "../types/index"

interface CommentListProps {
  postId: number; // Recibe el ID de la publicación para saber qué comentarios buscar
  actualizacion: number;
}

function CommentList({ postId, actualizacion }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect se ejecuta cuando el componente se carga o cuando cambia el postId
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        // Consultamos a la API los comentarios visibles de este post (según consigna)
        const response = await fetch(`${API_URL}/comments/post/${postId}`);

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

  if (loading) return <p>Cargando comentarios...</p>;
  if (error) return <p role="alert" style={{ color: "red" }}>{error}</p>;

  return (
    <section>
      <h3>Comentarios</h3>
      {comments.length === 0 ? (
        <p>No hay comentarios todavía. ¡Sé el primero en comentar!</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CommentList;



