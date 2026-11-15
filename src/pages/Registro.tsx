import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

function Registro() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Cambiamos a 'event: any' para que VSC no muestre nada tachado
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    // 1. Validación local: Verificar que ambos campos estén completos
    if (!nickName.trim() || !email.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      // 2. Envío de nickName y email a la API mediante POST /users
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickName: nickName.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();

      // 3. Manejo de respuesta del servidor
      if (!response.ok) {
        throw new Error(data.error || data.message || "No se pudo crear el usuario.");
      }

      setSuccess("¡Usuario registrado con éxito! Redirigiendo al login...");
      setNickName("");
      setEmail("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Registro de usuario</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickName">Nombre de usuario (NickName)</label>
          <input
            id="nickName"
            type="text"
            value={nickName}
            onChange={(event) => setNickName(event.target.value)}
            placeholder="Ingresá tu nick"
          />
        </div>

        <div>
          <label htmlFor="email">Correo electrónico (Email)</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ejemplo@correo.com"
          />
        </div>

        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </main>
  );
}

export default Registro;
