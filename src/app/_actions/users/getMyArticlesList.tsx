"use server"

import { usersApi } from "@/lib/api"
import { getSession } from "@/lib/session"
import { ArticleMe } from "@/types/generated"

export const getMyArticlesListAction = async ({
  page = 1,
  perPage = 30
}: {
  page?: number
  perPage?: number
}): Promise<{
  data?: ArticleMe[]
  error?: string
}> => {
  try {
    const { apiKey } = await getSession()

    const response = await usersApi.getUserArticles(page, perPage, {
      headers: {
        "api-key": apiKey,
        accept: "application/vnd.forem.api-v1+json"
      }
    })

    return { data: response.data }
  } catch (error) {
    console.error(error)
    return { error: "Erro ao buscar artigos" }
  }
}
