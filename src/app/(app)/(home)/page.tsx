import { getArticlesListAction } from "@/app/actions/articles/getArticlesList"
import { Input } from "@/components/_ui/input"

import { ArticleList } from "@/components/articles/articles-list"
import { AppLayout } from "@/components/layout/app-layout"

export default async function Home() {
  const articles = await getArticlesListAction({})

  return (
    <AppLayout>
      <div className="flex flex-col">
        <Input placeholder="Search" className="bg-card" />

        <div>Filter</div>

        <div className="flex justify-between">
          <ArticleList articles={articles} />
        </div>
      </div>
    </AppLayout>
  )
}
