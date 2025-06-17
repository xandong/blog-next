import { getArticlesListAction } from "@/app/_actions/articles/get-articles-list"

import { AppLayout } from "@/components/layout/app-layout"
import { Home } from "@/components/layout/pages/home-page"

import { getSession } from "@/lib/session"

export default async function HomeContainer() {
  const { user } = await getSession()
  const { data: articles } = await getArticlesListAction({})

  return (
    <AppLayout>
      <Home initialArticles={articles || []} user={user} />
    </AppLayout>
  )
}
