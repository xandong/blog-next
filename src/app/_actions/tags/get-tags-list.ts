"use client"

import { tagsApi } from "@/lib/api"
import { Tag } from "@/types/generated"

export const getTagsListAction = async (): Promise<{
  tags?: Tag[]
  error?: string
}> => {
  try {
    const response = await tagsApi.getTags(1, 100)
    return { tags: response.data }
  } catch (error) {
    console.error(error)
    return { error: "Erro ao buscar tags" }
  }
}
