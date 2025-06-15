"use server"

import axios from "axios"

import { ArticleUpdate } from "@/types/generated"

import { getSession } from "@/lib/session"

interface unpublishArticleActionProps {
  id: string
  data: Partial<ArticleUpdate>
}

export const updateArticleAction = async ({
  id,
  data
}: unpublishArticleActionProps): Promise<{
  success?: boolean
  error?: string
}> => {
  const { apiKey } = await getSession()

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_FOREM_BASE_URL}/api/articles/${id}`,
      {
        article: data.article
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/vnd.forem.api-v1+json",
          "api-key": apiKey
        }
      }
    )

    if (response.status !== 200) {
      return { error: "Erro ao arquivar artigo" }
    }
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Erro ao publicar artigo" }
  }
}
