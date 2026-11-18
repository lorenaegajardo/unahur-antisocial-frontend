
import { useState, type FormEvent } from "react";
import { API_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Button, Form, Spinner } from "react-bootstrap";

interface CommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}

function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  // Valida y envía el comentario a la API.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!text.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }

    if (!user) {
      setError("Debes iniciar sesión para comentar.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: text.trim(),
          postId: postId,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo publicar el comentario.");
      }

      // Limpia el formulario y actualiza los comentarios.
      setText("");
      onCommentAdded();
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="commentSection mb-4">
      <h3 className="commentTitle">Agregar comentario</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={4}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Escribí tu comentario..."
            className="commentTextarea"
            aria-label="Escribí tu comentario"
          />
        </Form.Group>

        {error && (
          <p role="alert" className="text-danger small mb-3">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="postButton commentSubmit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                animation="border"
                size="sm"
                className="me-2"
              />
              Enviando...
            </>
          ) : (
            "Publicar comentario"
          )}
        </Button>
      </Form>
    </section>
  );
}

export default CommentForm;
