import { getArticlesListAction } from "@/app/_actions/articles/get-articles-list"
import { getLatestArticlesListAction } from "@/app/_actions/articles/get-latest-articles-list"

import { AppLayout } from "@/components/layout/app-layout"
import { Home } from "@/components/pages/home-page"

import { getSession } from "@/lib/session"

export default async function HomeContainer() {
  const { user } = await getSession()
  const { data: articles } = await getArticlesListAction({})
  const { data: latestArticles } = await getLatestArticlesListAction({})

  return (
    <AppLayout>
      <Home
        initialArticles={articles || []}
        initialLatestArticles={latestArticles || []}
        user={user}
      />
    </AppLayout>
  )
}
