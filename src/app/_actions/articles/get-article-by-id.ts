"use server"

import { articlesApi } from "@/lib/api"
import { getSession } from "@/lib/session"
import { Article } from "@/types/custom"

export const getArticleByIdAction = async ({
  id
}: {
  id: number
}): Promise<{ article?: Article; error?: string }> => {
  const { apiKey } = await getSession()

  if (typeof id !== "number") {
    return { error: "ID inválido." }
  }

  try {
    const response = await articlesApi.getArticleById(id, {
      headers: {
        "api-key": apiKey || ""
      }
    })

    return { article: response.data as unknown as Article }
  } catch (error) {
    console.error("Error fetching article:", error)
    return { error: "Erro ao buscar o artigo." }
  }
}
