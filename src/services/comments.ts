import { API_URL } from "./api";
import type { Comment } from "../types/index"

export const obtenerComentarios = async (id: number): Promise<Comment[]> => {
  try {
    const respuesta = await fetch(`${API_URL}/comments/post/${id}`)
    if (!respuesta.ok) {
      throw new Error("Error al obtener los comentarios.")
    }
    const data = await respuesta.json()
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}