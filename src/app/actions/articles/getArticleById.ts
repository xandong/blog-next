"use server"

import { articlesApi } from "@/lib/api"
import { getSession } from "@/lib/session"
import { Article } from "@/types/custom"

export const getArticleByIdAction = async ({
  id
}: {
  id: number
}): Promise<Article> => {
  const { apiKey } = await getSession()

  try {
    const response = await articlesApi.getArticleById(id, {
      headers: {
        "api-key": apiKey || ""
      }
    })

    return response.data as unknown as Article
  } catch (error) {
    console.error("Error fetching article:", error)
    throw error
  }
}
