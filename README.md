# UnaHur Anti-Social Net

## Descripción del proyecto

UnaHur Anti-Social Net es una aplicación web desarrollada como Trabajo Práctico 2 de la materia Construcción de Interfaces de Usuario (CIU).

El proyecto consiste en una red social donde los usuarios pueden registrarse, iniciar sesión, visualizar publicaciones, consultar sus detalles, comentar y administrar sus propias publicaciones.

El frontend fue desarrollado con React, TypeScript y Vite, utilizando React Bootstrap para los componentes visuales.

La aplicación consume una API REST proporcionada por la cátedra, desarrollada con Node.js y Express.

## Tecnologías utilizadas

**Frontend**
- React
- TypeScript
- Vite
- React Router DOM
- React Bootstrap
- Bootstrap
- CSS

**Backend**
- Node.js
- Express
- API REST proporcionada por la cátedra

**Herramientas**
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
- Asociación de imágenes y etiquetas a las publicaciones.
- Visualización de las publicaciones del usuario en su perfil.

### Comentarios

- Visualización de comentarios de las publicaciones.
- Creación de comentarios desde el detalle de una publicación.

### Navegación y diseño

- Barra de navegación adaptable a distintos tamaños de pantalla.
- Accesos a inicio, perfil, creación de publicaciones, registro e inicio de sesión.
- Botones para regresar a la página principal.
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

Los comentarios se consultan y gestionan mediante los servicios correspondientes de la API.

Para el funcionamiento local, la API debe estar disponible en el puerto configurado en el frontend.

## Organización del proyecto

El código fuente se encuentra principalmente en la carpeta `src`.

### `src/components`

Contiene componentes reutilizables de la interfaz, como:

- Barra de navegación.
- Protección de rutas.
- Tarjetas de publicaciones.
- Componentes de comentarios.

### `src/pages`

Contiene las páginas principales de la aplicación:

- `Home`: listado de publicaciones, filtros y paginación.
- `Login`: inicio de sesión.
- `Registro`: registro de usuarios.
- `DetallePost`: detalle de una publicación y comentarios.
- `Perfil`: información del usuario y sus publicaciones.
- `CrearPost`: formulario de creación de publicaciones.

### `src/context`

Contiene el contexto de autenticación (`AuthContext`), que permite compartir la información de la sesión entre los componentes.

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
- Visualización y creación de comentarios.
- Filtrado por etiquetas.
- Paginación.
- Navegación entre pantallas.
- Cambio entre modo claro y oscuro.
- Adaptación visual a distintos tamaños de pantalla.

También se verificó la compilación del frontend mediante:

```bash
npm run build
```

## Estado de la publicación

El proyecto funciona en un entorno de desarrollo local.

La publicación pública del frontend y el alojamiento del backend y su base de datos se encuentran pendientes de definición según las indicaciones de la cátedra.

## Trabajo en equipo

El proyecto fue desarrollado de manera grupal, distribuyendo las tareas entre sus integrantes.

- **Lorena:** configuración inicial del frontend, rutas, autenticación, navegación, integración, filtros, paginación, mejoras de experiencia de usuario y documentación.
- **Elías:** página principal, tarjetas de publicaciones, detalle de publicaciones, imágenes y etiquetas.
- **Gaby:** registro de usuarios y comentarios.
- **Cristian:** perfil de usuario, creación de publicaciones, imágenes, etiquetas y estilos de navegación.

El código se integró mediante Git y GitHub.

