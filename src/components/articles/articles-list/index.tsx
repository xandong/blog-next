import { ArticleIndex, ArticleMe } from "@/types/generated"

import { ArticleItemPreview } from "./item-preview"

type Article = ArticleIndex & ArticleMe
interface ArticleListProps {
  articles: Article[]
}

export const ArticleList = (params: ArticleListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-6">
      {params.articles.map((article) => (
        <ArticleItemPreview key={article.id} article={article} />
      ))}
    </ul>
  )
}
