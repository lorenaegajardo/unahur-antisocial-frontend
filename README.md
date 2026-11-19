# UnaHur Anti-Social Net

## Descripción del proyecto

UnaHur Anti-Social Net es una aplicación web desarrollada como Trabajo Práctico 2 de la materia Construcción de Interfaces de Usuario (CIU), de la Universidad Nacional de Hurlingham (UNAHUR).

El proyecto consiste en una red social donde los usuarios pueden registrarse, iniciar sesión, visualizar publicaciones, consultar sus detalles, comentar y crear sus propias publicaciones.

El frontend fue desarrollado con React, TypeScript y Vite, utilizando React Bootstrap para los componentes visuales.

La aplicación consume una API REST proporcionada por la cátedra, desarrollada con Node.js y Express, que utiliza una base de datos SQLite.

## Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- React Router DOM
- React Bootstrap
- Bootstrap
- CSS

### Backend

- Node.js
- Express
- SQLite
- API REST proporcionada por la cátedra

### Herramientas

- Visual Studio Code
- Git
- GitHub
- npm

## Funcionalidades

### Usuarios y autenticación

- Registro de usuarios.
- Inicio de sesión.
- Validación de credenciales.
- Persistencia de la sesión mediante localStorage.
- Cierre de sesión.
- Protección de rutas que requieren autenticación.

### Publicaciones

- Visualización de publicaciones en la página principal.
- Consulta del detalle de una publicación.
- Creación de publicaciones para usuarios autenticados.
- Asociación de etiquetas a las publicaciones.
- Incorporación de múltiples imágenes mediante URLs.
- Posibilidad de agregar o quitar campos de imágenes antes de publicar.
- Visualización de varias imágenes mediante un carrusel.
- Visualización de las publicaciones del usuario en su perfil.
- Miniatura de la primera imagen de cada publicación en el perfil.

### Comentarios

- Visualización de comentarios de las publicaciones.
- Creación de comentarios desde el detalle de una publicación.
- Actualización de la lista de comentarios.
- Visualización de la cantidad de comentarios en el detalle de una publicación.
- Contador de comentarios en las publicaciones del perfil.

### Navegación y diseño

- Barra de navegación adaptable a distintos tamaños de pantalla.
- Accesos a inicio, perfil, creación de publicaciones, registro e inicio de sesión.
- Botones para regresar a la página principal.
- Botón para cancelar la creación de una publicación.
- Página de error para rutas inexistentes.
- Diseño responsive.
- Modo claro y oscuro.
- Persistencia de la preferencia de tema mediante localStorage.

## Funcionalidades adicionales (bonus)

### Filtrado por etiquetas

Se implementó un filtro que permite visualizar publicaciones según sus etiquetas.

Al seleccionar una etiqueta, se actualizan las publicaciones mostradas.

### Paginación

Se implementó paginación en la página principal.

- Se muestran hasta cinco publicaciones por página.
- Se puede navegar mediante los botones Anterior y Siguiente.
- Se puede seleccionar directamente un número de página.
- Al cambiar el filtro por etiquetas, se vuelve automáticamente a la primera página.

## Rutas de la aplicación

| Ruta | Descripción | Acceso |
|---|---|---|
| `/` | Página principal y publicaciones | Público |
| `/login` | Inicio de sesión | Público |
| `/registro` | Registro de usuarios | Público |
| `/post/:id` | Detalle de una publicación y comentarios | Público |
| `/perfil` | Perfil del usuario | Requiere sesión |
| `/crear-post` | Creación de publicaciones | Requiere sesión |
| Cualquier otra ruta | Página no encontrada | Público |

Las rutas protegidas utilizan el componente `ProtectedRoute`.

## Instalación y ejecución

### Requisitos previos

Para ejecutar el proyecto localmente es necesario tener instalados:

- Node.js
- npm
- Git (para clonar los repositorios)

### 1. Descargar el frontend

Clonar el repositorio:

```bash
git clone https://github.com/lorenaegajardo/unahur-antisocial-frontend.git
```

Ingresar a la carpeta:

```bash
cd unahur-antisocial-frontend
```

Instalar las dependencias:

```bash
npm install
```

### 2. Ejecutar el backend

La aplicación utiliza la API proporcionada por la cátedra.

Repositorio:

https://github.com/lucasfigarola/backend-api

Clonar el repositorio:

```bash
git clone https://github.com/lucasfigarola/backend-api.git
```

Ingresar a su carpeta:

```bash
cd backend-api
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
npm start
```

En el entorno de desarrollo utilizado, la API funciona en:

`http://localhost:3001`

El backend debe permanecer ejecutándose mientras se utiliza el frontend.

### 3. Ejecutar el frontend

Abrir otra terminal dentro de la carpeta `unahur-antisocial-frontend` y ejecutar:

```bash
npm run dev
```

Vite mostrará una dirección local, normalmente:

`http://localhost:5173/`

Abrir esa dirección en el navegador.

Es necesario mantener funcionando ambos servidores.

## Inicio de sesión

Para iniciar sesión se utiliza el nombre de usuario y la contraseña.

En el entorno de pruebas se utilizó la contraseña:

`123456`

La autenticación implementada en el frontend utiliza los usuarios disponibles en la API y conserva la sesión en localStorage.

Este mecanismo corresponde al alcance académico del trabajo práctico y no constituye un sistema de autenticación seguro para producción.

## Comunicación con la API

El frontend realiza solicitudes HTTP al backend para consultar y modificar los datos de la aplicación.

Entre los recursos utilizados se encuentran:

- `/users`: usuarios.
- `/posts`: publicaciones.
- `/tags`: etiquetas.
- `/postimages`: imágenes asociadas a publicaciones.
- `/postimages/post/:id`: imágenes de una publicación.
- `/comments/post/:id`: comentarios de una publicación.

Para crear una publicación, el frontend envía la descripción, el identificador del usuario y las etiquetas seleccionadas.

Cuando se agregan imágenes, cada URL se asocia a la publicación mediante una solicitud a `/postimages`.

Para mostrar el contador de comentarios en el perfil, se consultan los comentarios de cada publicación y se obtiene su cantidad.

Para el funcionamiento local, la API debe estar disponible en el puerto configurado en el frontend.

## Organización del proyecto

El código fuente se encuentra principalmente en la carpeta `src`.

### `src/components`

Contiene componentes reutilizables de la interfaz, como:

- `Navbar`: barra de navegación.
- `ProtectedRoute`: protección de rutas.
- `PostCard`: tarjeta de publicación.
- `UserPostCard`: publicación del perfil con imagen y contador de comentarios.
- `CommentForm`: formulario para agregar comentarios.
- `CommentList`: listado de comentarios.

### `src/pages`

Contiene las páginas principales de la aplicación:

- `Home`: listado de publicaciones, filtros y paginación.
- `Login`: inicio de sesión.
- `Registro`: registro de usuarios.
- `DetallePost`: detalle de una publicación, imágenes y comentarios.
- `Perfil`: información del usuario y sus publicaciones.
- `CrearPost`: formulario de creación de publicaciones con etiquetas y múltiples imágenes.

### `src/context`

Contiene el contexto de autenticación (`AuthContext`), que permite compartir la información de la sesión entre los componentes.

### `src/services`

Contiene la configuración utilizada para comunicarse con la API.

### `src/App.tsx`

Define las rutas principales de la aplicación e integra la navegación.

### `src/index.css`

Contiene estilos generales, variables visuales y configuraciones de los temas claro y oscuro.

## Validaciones y pruebas

Durante el desarrollo se realizaron pruebas manuales para verificar:

- Registro e inicio de sesión.
- Persistencia de la sesión.
- Cierre de sesión.
- Acceso a rutas protegidas.
- Visualización y detalle de publicaciones.
- Creación de publicaciones.
- Carga de múltiples imágenes mediante URLs.
- Visualización y navegación entre imágenes.
- Visualización y creación de comentarios.
- Contador de comentarios en el detalle de publicaciones.
- Contador de comentarios en las publicaciones del perfil.
- Filtrado por etiquetas.
- Paginación.
- Navegación entre pantallas.
- Cambio entre modo claro y oscuro.
- Adaptación visual a distintos tamaños de pantalla.

### Prueba de múltiples imágenes

Se creó una publicación con dos URLs de imágenes.

Se verificó que ambas se guardaran correctamente y que fuera posible visualizarlas y navegar entre ellas mediante el carrusel.

### Prueba del contador de comentarios

Se agregaron dos comentarios a una publicación de prueba.

Se verificó que:

- Los dos comentarios aparecieran en el detalle.
- El contador del detalle mostrara 2.
- El contador de la publicación en el perfil también mostrara 2.

### Compilación

Se verificó la compilación del frontend mediante:

```bash
npm run build
```

La compilación finalizó correctamente, sin errores de TypeScript ni de Vite.

## Estado de la publicación

El proyecto funciona correctamente en el entorno de desarrollo local utilizado para las pruebas.

La publicación pública del frontend y el alojamiento del backend y su base de datos se encuentran pendientes de definición según las indicaciones de la cátedra.

El código fuente está disponible en GitHub y puede ejecutarse localmente siguiendo las instrucciones de este documento.

## Trabajo en equipo

El proyecto fue desarrollado de manera grupal, distribuyendo las tareas entre sus integrantes.

- **Lorena:** configuración inicial del frontend, rutas, autenticación, navegación, integración, filtros, paginación, mejoras de experiencia de usuario y documentación.
- **Elías:** página principal, tarjetas de publicaciones, detalle de publicaciones, imágenes y etiquetas.
- **Gaby:** registro de usuarios, comentarios, carga de múltiples imágenes y contador de comentarios en las publicaciones del perfil.
- **Cristian:** perfil de usuario, creación de publicaciones, imágenes, etiquetas y estilos de navegación.

El código se integró mediante Git y GitHub.

## Repositorios

**Frontend:**

https://github.com/lorenaegajardo/unahur-antisocial-frontend

**Backend proporcionado por la cátedra:**

https://github.com/lucasfigarola/backend-api

---

Trabajo Práctico 2 — Construcción de Interfaces de Usuario (CIU)

Universidad Nacional de Hurlingham (UNAHUR)