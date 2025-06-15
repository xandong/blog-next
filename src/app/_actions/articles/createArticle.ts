"use client"

import { api } from "@/lib/api"
import { getSession } from "@/lib/session"
import { ArticleCreate, ArticleShow } from "@/types/generated"

export const createArticleAction = async ({
  article
}: ArticleCreate): Promise<{ article?: ArticleShow; error?: string }> => {
  try {
    const { apiKey } = await getSession()

    const response = await api.post(
      "/articles",
      {
        article: article
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/vnd.forem.api-v1+json",
          "api-key": apiKey
        }
      }
    )

    return { article: response.data }
  } catch (error) {
    console.error(error)
    return { error: "Erro ao criar artigo" }
  }
}
