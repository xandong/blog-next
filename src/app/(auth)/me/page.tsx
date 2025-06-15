import { getSession } from "@/lib/session"
import { getMyArticlesListAction } from "@/app/_actions/users/getMyArticlesList"

import ArticleListInfinite from "@/components/articles/articles-pagination-infinite"
import { CreateMinimalArticle } from "@/components/articles/create-minimal-article"
import { AppLayout } from "@/components/layout/app-layout"
import { AuthorCard } from "@/components/users/author-card"
import { BackButton } from "@/components/misc/back-button"

export default async function Page() {
  const { user } = await getSession()
  const { data: articles } = await getMyArticlesListAction({})

  return (
    <AppLayout>
      <div className="w-full">
        <BackButton />
      </div>

      <div className="w-full flex flex-col">
        {user && (
          <div className="w-full flex justify-center mb-10">
            <div className="w-full max-w-3xl">
              <CreateMinimalArticle />
            </div>
          </div>
        )}

        <div className="w-full mx-auto pb-8 gap-8 flex lg:flex-row flex-col items-start lg:justify-center">
          {user?.username && (
            <div className="lg:sticky lg:top-20 w-full lg:max-w-72">
              <AuthorCard username={user.username} />
            </div>
          )}

          {!articles || articles.length === 0 ? (
            <div className="w-full flex justify-center">
              <p className="text-xl font-bold">Nenhum artigo publicado ainda</p>
            </div>
          ) : (
            <div className="w-fit flex justify-center">
              <ArticleListInfinite
                initialArticles={articles}
                request={getMyArticlesListAction}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
