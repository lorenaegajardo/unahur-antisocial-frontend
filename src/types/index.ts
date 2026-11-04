// Datos de un usuario.
export interface User {
  id: number;
  nickName: string;
  email: string;
}

// Datos principales de una publicación.
export interface Post {
  id: number;
  description: string;
  userId: number;
}

// Etiquetas disponibles para las publicaciones.
export interface Tag {
  id: number;
  name: string;
}

// Comentarios asociados a una publicación.
export interface Comment {
  id: number;
  content: string;
  postId: number;
  userId: number;
}

// Imágenes asociadas a una publicación.
export interface PostImage {
  id: number;
  url: string;
  postId: number;
}