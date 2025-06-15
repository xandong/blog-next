"use server"

import { getSession } from "@/lib/session"
import { articlesApi } from "@/lib/api"
import { ArticleIndex, GetArticlesStateEnum } from "@/types/generated"

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
  collectionId = undefined,
  page = 1,
  perPage = 20,
  tag = undefined,
  tags = undefined,
  tagsExclude = undefined,
  username = undefined,
  state = undefined,
  top = undefined
}: GetArticlesListActionProps): Promise<{
  data?: ArticleIndex[]
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

    return { data: response.data as ArticleIndex[] }
  } catch (error) {
    console.error(error)
    return { error: "Erro ao buscar artigos" }
  }
}
