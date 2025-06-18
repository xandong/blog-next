"use server"

import { commentsApi } from "@/lib/api"
import { Comment } from "@/types/generated"

export const getCommentsByArticleAction = async ({
  articleId
}: {
  articleId?: number
}): Promise<{ data?: Comment[]; error?: string }> => {
  try {
    if (!articleId) return { error: "Artigo não encontrado" }

    const response = await commentsApi.getCommentsByArticleId(articleId)

    return { data: response.data }
  } catch (error) {
    console.error(error)
    return { error: "Erro ao buscar comentários" }
  }
}
