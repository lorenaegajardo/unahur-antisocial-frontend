import { API_URL } from "./api";
import type { Post, PostImage } from "../types/index"

export const obtenerPosts = async (): Promise<Post[]> => {
  try {
    const respuesta = await fetch(`${API_URL}/posts`)
    if (!respuesta.ok) {
      throw new Error("Error al obtener los posts.")
    }
    const data: Post[] = await respuesta.json()
    return [...data].reverse()
  } catch (error) {
    console.log(error)
    return []
  }
}

export const obtenerPostPorId = async (id: number): Promise<Post | null> => {
  try {
    const respuesta = await fetch(`${API_URL}/post/${id}`)
    if (!respuesta.ok) {
      throw new Error(`Error al obtener el post ${id}.`)
    }
    const data = await respuesta.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
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