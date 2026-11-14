// Formulario para agregar comentarios.
// Gaby implementará el campo de texto, las validaciones
// y el envío del comentario a la API.

import { useState, type FormEvent } from "react";
import { API_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface CommentFormProps {
  postId: number;
  onCommentAdded: () => void; // Función que avisa al componente padre que se creó un comentario para actualizar la lista
}

function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth(); // Necesitamos saber quién está logueado para mandar su ID

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // 1. Validación: Campo obligatorio
    if (!text.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }

    // Seguridad extra: Verificar que esté logueado (aunque la ruta sea protegida)
    if (!user) {
      setError("Debes iniciar sesión para comentar.");
      return;
    }

    setLoading(true);

    try {
      // 2. Envío mediante POST /comments (según consigna)
      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.trim(),
          postId: postId,
          userId: user.id, // ID del usuario actual sacado del contexto
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo publicar el comentario.");
      }

      // Limpiamos el campo de texto
      setText("");

      // 3. Ejecutamos la función que avisa al padre para que recargue la lista de comentarios
      onCommentAdded();
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h3>Agregar comentario</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Escribí tu comentario..."
            rows={3}
          />
        </div>

        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Comentar"}
        </button>
      </form>
    </section>
  );
}

export default CommentForm;
/*

### Explicación de `CommentForm.tsx`:
* **Componente Controlado (`useState`)**: El valor del `textarea` está atado al estado `text`. Cada vez que escribís una letra, `onChange` actualiza el estado (esto lo pedía explícitamente la consigna del TP)[cite: 2].
* **Uso de `useAuth()`**: Como para crear un comentario la API necesita saber el `userId`, usamos el contexto global que ya armaron en el grupo para obtener los datos del usuario conectado.
* **`onCommentAdded`**: Es una función "callback" que se le pasa desde afuera. Sirve para que, una vez que el servidor acepta el nuevo comentario, le avise a la pantalla de detalle que recargue la lista y así el comentario aparezca al instante sin tener que apretar F5.

---

### ¿Cómo se integran estos dos en el Detalle del Post? (Opcional por si lo necesitan)
Para que veas cómo se usan, en la página de detalle (`DetallePost.tsx`) simplemente los llamarías pasándoles el `postId`:


// Ejemplo conceptual de cómo se usaria en DetallePost:
<CommentList postId={idDelPost} />
<CommentForm postId={idDelPost} onCommentAdded={() => { /* recargar comentarios */ 
