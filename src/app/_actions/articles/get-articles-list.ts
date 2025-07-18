"use server"

import { getSession } from "@/lib/session"
import { articlesApi } from "@/lib/api"
import { GetArticlesStateEnum } from "@/types/generated"
import { Article } from "@/types/custom"

interface GetArticlesListActionProps {
  page?: number
  perPage?: number
  tag?: string
  tags?: string
  tagsExclude?: string
  username?: string
  state?: GetArticlesStateEnum
  top?: number
  collectionId?: number
}

export const getArticlesListAction = async ({
  page = 1,
  perPage = 30,
  tag,
  tags,
  tagsExclude,
  username,
  state,
  top,
  collectionId
}: GetArticlesListActionProps): Promise<{
  data?: Article[]
  error?: string
}> => {
  try {
    const session = await getSession()
    const apiKey = session.apiKey

    const response = await articlesApi.getArticles(
      page,
      perPage,
      tag,
      tags,
      tagsExclude,
      username,
      state,
      top,
      collectionId,
      {
        headers: {
          "api-key": apiKey || ""
        }
      }
    )

    return { data: response.data as Article[] }
  } catch (error) {
    console.error(error)
    return { error: "Erro ao buscar artigos" }
  }
}
