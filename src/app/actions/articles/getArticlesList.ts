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
}: GetArticlesListActionProps): Promise<ArticleIndex[]> => {
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

  return response.data as ArticleIndex[]
}
