import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";

interface Post {
  id: number;
  description: string;
  userId: number;
}

function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Consultamos a la API los posts filtrados por el userId del usuario actual (según consigna)
        const response = await fetch(`${API_URL}/posts?userId=${user.id}`);

        if (!response.ok) {
          throw new Error("No se pudieron cargar tus publicaciones.");
        }

        const data = await response.json();
        setUserPosts(data);
      } catch (err: any) {
        setError(err.message || "Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  if (!user) return null;

  return (
    <main>
      <h1>Mi Perfil</h1>
      <div>
        <p><strong>Nombre de usuario:</strong> {user.nickName}</p>
        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <section>
        <h2>Mis publicaciones</h2>

        {loading && <p>Cargando tus publicaciones...</p>}
        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

        {!loading && userPosts.length === 0 ? (
          <p>Todavía no realizaste ninguna publicación.</p>
        ) : (
          <ul>
            {userPosts.map((post) => (
              <li key={post.id}>
                <p>{post.description}</p>
                {/* Botón Ver más que lleva al detalle del post */}
                <Link to={`/post/${post.id}`}>Ver más</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Perfil;