import { getArticlesListAction } from "@/app/_actions/articles/getArticlesList"

import { ArticleList } from "@/components/articles/articles-list"
import { CreateMinimalArticle } from "@/components/articles/create-minimal-article"
import { AppLayout } from "@/components/layout/app-layout"
import { getSession } from "@/lib/session"

export default async function Home() {
  const { user } = await getSession()
  const articles = await getArticlesListAction({})

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

        <div className="w-full flex justify-center">
          <ArticleList articles={articles} />
        </div>
      </div>
    </AppLayout>
  )
}
