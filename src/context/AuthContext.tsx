
import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types";

// Datos y funciones que estarán disponibles en toda la aplicación.
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Creamos el contexto. Al principio no tiene un valor asignado.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Este componente comparte el usuario y las funciones de sesión.
export function AuthProvider({ children }: AuthProviderProps) {
  // Recuperamos la sesión guardada cuando se inicia la aplicación.
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("usuarioAntisocial");

    if (savedUser) {
      try {
        return JSON.parse(savedUser) as User;
      } catch {
        localStorage.removeItem("usuarioAntisocial");
      }
    }

    return null;
  });

  // Guarda el usuario en el estado y en localStorage.
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("usuarioAntisocial", JSON.stringify(userData));
  };

  // Elimina la sesión al cerrar sesión.
  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuarioAntisocial");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para acceder a la sesión desde cualquier componente.
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
}


//useState mantiene el usuario conectado.
//localStorage permite conservar la sesión aunque se actualice la página.
//login() guarda el usuario.
//logout() elimina la sesión.
//useAuth() permite que tus compañeros accedan al usuario desde sus componentes.