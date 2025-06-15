import { getSession } from "@/lib/session"
import { getMyArticlesListAction } from "@/app/_actions/users/getMyArticlesList"

import ArticleListInfinite from "@/components/articles/articles-pagination-infinite"
import { CreateMinimalArticle } from "@/components/articles/create-minimal-article"
import { AppLayout } from "@/components/layout/app-layout"

export default async function Page() {
  const { user } = await getSession()
  const { data: articles } = await getMyArticlesListAction({})

  return (
    <AppLayout>
      <div className="w-full flex flex-col">
        {user && (
          <div className="w-full flex justify-center mb-10">
            <div className="w-full max-w-3xl">
              <CreateMinimalArticle />
            </div>
          </div>
        )}

        {!articles || articles.length === 0 ? (
          <div className="w-full flex justify-center">
            <p className="text-xl font-bold">Nenhum artigo publicado ainda</p>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <ArticleListInfinite
              initialArticles={articles}
              request={getMyArticlesListAction}
            />
          </div>
        )}
      </div>
    </AppLayout>
  )
}
