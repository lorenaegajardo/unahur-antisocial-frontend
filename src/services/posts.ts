import { API_URL } from "./api";
import type { Post, PostImage } from "../types/index"

export const obtenerPosts = async (): Promise<Post[]> => {
  const respuesta = await fetch(`${API_URL}/posts`)
  if (!respuesta.ok) {
    throw new Error("Error al obtener los posts.")
  }
  const data: Post[] = await respuesta.json()
  return [...data].reverse()
}

export const obtenerPostPorId = async (id: number): Promise<Post | null> => {
  const respuesta = await fetch(`${API_URL}/posts/${id}`)
  if (!respuesta.ok) {
    if (respuesta.status === 404) return null
    throw new Error(`Error al obtener el post ${id}.`)
  }
  const data = await respuesta.json()
  return data

}

export const obtenerPostImages = async (id: number): Promise<PostImage[]> => {
  try {
    const respuesta = await fetch(`${API_URL}/postimages/post/${id}`)
    if (!respuesta.ok) {
      throw new Error(`Error al obtener las imagenes asociadas al post ${id}.`)
    }
    const data = await respuesta.json()
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}