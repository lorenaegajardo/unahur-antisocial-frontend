# Registro de pruebas – Autenticación y sesión

Proyecto: UnaHur Anti-Social Net – Interfaz de Usuario  
Módulo: Login, contexto de autenticación, sesión, navegación y rutas protegidas  
Fecha de ejecución: 04/11/2026  
Responsable del módulo: Lorena

## Entorno de pruebas

- Frontend: React + TypeScript + Vite, `http://localhost:5173`.
- Backend: API Node/Express, `http://localhost:3001`.
- Usuario de prueba existente: `luna`.
- Contraseña fija de prueba: `123456`.
- Las verificaciones se realizaron manualmente desde el navegador.

## Casos ejecutados

| ID | Caso | Pasos o datos de prueba | Resultado esperado | Resultado observado | Estado |
| --- | --- | --- | --- | --- | --- |
| P01 | Contraseña incorrecta | Usuario `luna`, contraseña `1234567` | Mostrar error y permanecer en login | Se mostró «Contraseña incorrecta.»; no se inició sesión | Aprobada |
| P02 | Usuario inexistente | Usuario `usuarioInexistente`, contraseña `123456` | Mostrar error y permanecer en login | Se mostró el error de usuario inexistente y no se inició sesión | Aprobada |
| P03 | Campos vacíos | Enviar login sin usuario ni contraseña | Solicitar completar campos | Se mostró «Completá todos los campos» | Aprobada |
| P04 | Backend desconectado | Detener la API e intentar ingresar con `luna` / `123456` | Mostrar error de conexión y no iniciar sesión | Se mostró «No se pudo conectar con el servidor.» | Aprobada |
| P05 | Persistencia de sesión | Ingresar con `luna` / `123456` y actualizar con F5 | Mantener la sesión iniciada | La sesión se mantuvo después de actualizar | Aprobada |
| P06 | Cierre de sesión | Cerrar sesión y actualizar con F5 | Ocultar usuario y mantener la sesión cerrada | Desapareció «Hola, luna», volvieron los enlaces públicos y la sesión permaneció cerrada | Aprobada |
| P07 | Rutas protegidas | Sin sesión, abrir `/perfil` y `/crear-post` | Redirigir a `/login` | Ambas rutas redirigieron a `/login` | Aprobada |

## Resumen

- Casos manuales ejecutados: **7**.
- Casos aprobados: **7**.
- Casos fallidos: **0**.
- Alcance: módulo individual de autenticación y navegación.

## Integración pendiente

- Revisar y fusionar el Pull Request del módulo a `main` con el equipo.
- Comprobar el uso de `useAuth()` desde las páginas desarrolladas por los demás integrantes.
- Realizar pruebas integrales cuando estén disponibles feed, registro, comentarios, perfil y creación de publicaciones.
- Ejecutar nuevamente `npm run build` sobre la versión integrada y registrar su resultado.

> Este documento registra pruebas manuales informadas durante la sesión. No sustituye pruebas automatizadas ni acredita funcionalidades de los otros módulos.
