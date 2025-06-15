import { ArticleIndex, ArticleMe, User } from "@/types/generated"

import { ArticleItemPreview } from "../article-preview"

type Article = ArticleIndex & ArticleMe
interface ArticleListProps {
  articles: Article[]
  currentUser?: User | null
}

export const ArticleList = (params: ArticleListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-6">
      {params.articles.map((article) => (
        <ArticleItemPreview
          key={article.id}
          article={article}
          currentUser={params.currentUser}
        />
      ))}
    </ul>
  )
}
