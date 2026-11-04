import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import DetallePost from "./pages/DetallePost";
import Perfil from "./pages/Perfil";
import CrearPost from "./pages/CrearPost";

function App() {
  return (
    <>
      {/* Barra de navegación compartida por todas las páginas. */}
      <Navbar />

      <Routes>
        {/* Rutas públicas: no requieren iniciar sesión. */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/post/:id" element={<DetallePost />} />

        {/* Rutas protegidas: mañana agregaremos la validación de sesión. */}
        <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/crear-post" element={<CrearPost />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;