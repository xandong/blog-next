"use server"

import { articlesApi } from "@/lib/api"
import { Article } from "@/types/custom"

interface GetArticleByPathActionProps {
  username: string
  slug: string
}

export const getArticleByPathAction = async ({
  slug,
  username
}: GetArticleByPathActionProps) => {
  try {
    if (!slug || !username) {
      return { error: "Artigo não encontrado." }
    }

    const response = await articlesApi.getArticleByPath(username, slug)

    return { article: response.data as unknown as Article }
  } catch (error) {
    console.error("Error fetching article:", error)
    return { error: "Erro ao buscar o artigo." }
  }
}
