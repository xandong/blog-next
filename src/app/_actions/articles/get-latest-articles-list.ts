"use server"

import { getSession } from "@/lib/session"
import { articlesApi } from "@/lib/api"
import { Article } from "@/types/custom"

interface GetLatestArticlesListActionProps {
  page?: number
  perPage?: number
}

export const getLatestArticlesListAction = async ({
  page = 1,
  perPage = 30
}: GetLatestArticlesListActionProps): Promise<{
  data?: Article[]
  error?: string
}> => {
  try {
    const session = await getSession()
    const apiKey = session.apiKey

    const response = await articlesApi.getLatestArticles(page, perPage, {
      headers: {
        "api-key": apiKey || ""
      }
    })

    return { data: response.data as Article[] }
  } catch (error) {
    console.error(error)
    return { error: "Erro ao buscar artigos" }
  }
}
