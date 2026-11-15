// Página de registro de usuarios.
// Gaby implementará el formulario, las validaciones
// y la conexión con la API para crear usuarios.

import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

function Registro() {
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    // 1. Validación local: Verificar que el campo no esté vacío
    if (!nickName.trim()) {
      setError("El nombre de usuario es obligatorio.");
      return;
    }

    setLoading(true);

    try {
      // 2. Envío de datos a la API mediante POST /users (según consigna)
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickName: nickName.trim() }),
      });

      const data = await response.json();

      // 3. Manejo de respuesta del servidor
      if (!response.ok) {
        // Si el backend devuelve un error (ej. el usuario ya existe)
        throw new Error(data.error || "No se pudo crear el usuario.");
      }

      setSuccess("¡Usuario registrado con éxito! Redirigiendo al login...");
      
      // Limpiamos el input
      setNickName("");

      // Redirigimos al login después de 2 segundos para que vea el mensaje de éxito
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

        {/* Mensaje de error visual */}
        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

        {/* Mensaje de éxito visual */}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </main>
  );
}

export default Registro;
/*
### Explicación Paso a Paso de cómo funciona


1. **Los Estados (`useState`):**
   * `nickName`: Guarda lo que vas escribiendo en el input de texto.
   * `error`: Almacena un texto por si algo falla (por ejemplo, si dejaste el campo vacío o si el servidor rechaza el usuario).
   * `success`: Muestra un mensaje verde de felicitaciones cuando el registro sale bien.
   * `loading`: Un interruptor (`true`/`false`) que sirve para deshabilitar el botón mientras se procesa la petición para evitar que el usuario haga doble clic.

2. **La función `handleSubmit` (Al enviar el formulario):**
   * `event.preventDefault()`: Evita que la página se recargue por defecto cuando se envía un formulario en HTML, permitiéndonos manejarlo con JavaScript/React.
   * **Validación Local:** Primero chequeamos con `if (!nickName.trim())` si mandaste el campo vacío o con puros espacios. Si es así, cortamos la ejecución (`return`) y mostramos el error en pantalla.

3. **La Petición a la API (`fetch` con método `POST`):**
   * Usamos `fetch` apuntando a `${API_URL}/users` pero especificando que el método es `"POST"` (porque estamos *creando* un recurso nuevo, a diferencia del login que solo hacía un `GET` para leer la lista).
   * En los `headers` le avisamos al servidor que le mandamos un JSON (`"Content-Type": "application/json"`).
   * En el `body` convertimos nuestro texto a formato JSON con `JSON.stringify({ nickName: nickName.trim() })` (tal como pide la API del TP).

4. **El manejo de errores del Servidor:**
   * La consigna pedía explícitamente: *"Si el servidor devuelve un error (por ejemplo, 'No se pudo crear el usuario'), el frontend deberá mostrar el mensaje correspondiente al usuario"*[cite: 1, 2]. 
   * Para lograr esto, evaluamos `if (!response.ok)`. Si el backend rechaza el nombre (porque ya existía en la base de datos), atrapamos ese mensaje y lo mostramos en el bloque `catch`.

5. **La Redirección:**
   * Si todo sale bien (`response.ok`), guardamos el mensaje de éxito y usamos `setTimeout` junto con `navigate("/login")` para mandar al usuario a la pantalla de inicio de sesión automáticamente después de 2 segundos.

*/