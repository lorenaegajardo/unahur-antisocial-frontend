import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";

interface Tag {
  id: number;
  name: string;
}

function CrearPost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Cargamos el listado de etiquetas desde la API cuando se monta el componente
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${API_URL}/tags`);
        if (response.ok) {
          const data = await response.json();
          setTags(data);
        }
      } catch {
        console.error("No se pudieron cargar las etiquetas.");
      }
    };

    fetchTags();
  }, []);

  // Manejar la selección/deselección de etiquetas mediante checkboxes
  const handleTagChange = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // Validación: La descripción es obligatoria
    if (!description.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }

    if (!user) {
      setError("Debes iniciar sesión para crear una publicación.");
      return;
    }

    setLoading(true);

    try {
      // 2. Hacemos el POST /posts con la descripción, el userId y las etiquetas (según consigna)
      const postResponse = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          userId: user.id,
          tags: selectedTags,
        }),
      });

      if (!postResponse.ok) {
        throw new Error("No se pudo crear la publicación.");
      }

      const newPost = await postResponse.json();
      const postId = newPost.id; // Obtenemos el ID del post recién creado

      // 3. Si se ingresó una URL de imagen, hacemos el POST /postimages asociado (según consigna)
      if (imageUrl.trim() && postId) {
        const imageResponse = await fetch(`${API_URL}/postimages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: imageUrl.trim(),
            postId: postId,
          }),
        });

        if (!imageResponse.ok) {
          console.error("La publicación se creó, pero hubo un error al asociar la imagen.");
        }
      }

      // 4. Al finalizar, redirigimos al perfil del usuario (según consigna)
      navigate("/perfil");
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Crear Nueva Publicación</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Descripción *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="¿Qué estás pensando?"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="imageUrl">URL de imagen (opcional)</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div>
          <label>Etiquetas</label>
          <div>
            {tags.map((tag) => (
              <label key={tag.id} style={{ marginRight: "15px" }}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                />
                {tag.name}
              </label>
            ))}
          </div>
        </div>

        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </main>
  );
}

export default CrearPost;
