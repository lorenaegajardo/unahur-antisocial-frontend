// Página de inicio de sesión.
// Yo aca implementaré el formulario y la validación del usuario.


import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";
import type { User } from "../types";

// Formulario de login simulado.
// Verifica que el usuario exista en la API y utiliza la contraseña fija de la consigna.

function Login() {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!nickName.trim() || !password) {
      setError("Completá todos los campos.");
      return;
    }

    if (password !== "123456") {
      setError("Contraseña incorrecta.");
      return;
    }

    setLoading(true);

    try {
      // Consultamos los usuarios registrados en el backend.
      const response = await fetch(`${API_URL}/users`);

      if (!response.ok) {
        throw new Error("No se pudieron consultar los usuarios.");
      }

      const users: User[] = await response.json();

      const foundUser = users.find(
        (user) => user.nickName === nickName.trim()
      );

      if (!foundUser) {
        setError("El usuario no existe.");
        return;
      }

      // Guardamos la sesión mediante el contexto global.
      login(foundUser);
      navigate("/");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickName">Nombre de usuario</label>
          <input
            id="nickName"
            type="text"
            value={nickName}
            onChange={(event) => setNickName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </main>
  );
}

export default Login;
