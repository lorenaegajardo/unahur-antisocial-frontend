
# UnaHur Anti-Social Net - Frontend

Trabajo práctico de Construcción de Interfaces de Usuario (CIU).

Interfaz desarrollada con React y TypeScript que consume la API REST proporcionada por la cátedra.

## Tecnologías

- React
- TypeScript
- Vite
- React Router
- Fetch API

## Instalación

Clonar el repositorio y ejecutar:

```bash
npm install
npm run dev
```

El frontend se ejecuta normalmente en:

http://localhost:5173

## Backend

Repositorio de la cátedra:

https://github.com/lucasfigarola/backend-api

El backend debe ejecutarse por separado, siguiendo las instrucciones de su repositorio.

Dirección utilizada por el frontend:

http://localhost:3001

La configuración se encuentra en `src/services/api.ts`.

## Organización del proyecto

- `src/pages/`: páginas principales.
- `src/components/`: componentes reutilizables.
- `src/context/`: contexto global del usuario.
- `src/services/`: configuración y consultas a la API.
- `src/types/`: interfaces compartidas de TypeScript.
- `src/App.tsx`: definición de las rutas.
- `src/main.tsx`: punto de entrada y configuración de React Router.

## Distribución de tareas

**Lorena**
- Inicialización y estructura general.
- Login y manejo de sesión.
- Contexto de autenticación.
- Barra de navegación y rutas protegidas.

**Elías**
- Home y feed de publicaciones.
- Tarjetas y detalle de publicaciones.
- Imágenes y etiquetas.

**Gaby**
- Registro de usuarios y validaciones.
- Listado y creación de comentarios.

**Cristian**
- Perfil del usuario.
- Publicaciones propias.
- Creación de publicaciones con imágenes y etiquetas.

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/login` | Inicio de sesión |
| `/registro` | Registro |
| `/post/:id` | Detalle de publicación |
| `/perfil` | Perfil (protegida) |
| `/crear-post` | Nueva publicación (protegida) |

## Trabajo en equipo

Cada integrante desarrollará su módulo en una rama independiente.

Antes de integrar cambios, deberá comprobar que su módulo funcione y que el proyecto compile correctamente.

La integración, las pruebas finales y las correcciones compartidas serán responsabilidad de todo el equipo.

## Estado inicial

La estructura y las rutas están preparadas.

Las páginas y los componentes contienen implementaciones provisorias que cada integrante reemplazará durante el desarrollo.

Las rutas protegidas todavía no validan la sesión.
