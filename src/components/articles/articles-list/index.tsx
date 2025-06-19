import { User } from "@/types/generated"

import { ArticleItemPreview } from "../article-preview"
import { Article } from "@/types/custom"

interface ArticleListProps {
  articles: Article[]
  currentUser?: User | null
  // eslint-disable-next-line no-unused-vars
  onUpdateArticle: (article: Article) => void
}

export const ArticleList = (params: ArticleListProps) => {
  return (
    <ul className="w-full grid grid-cols-1 gap-6">
      {params.articles.map((article) => (
        <ArticleItemPreview
          key={`${article.id}${article.slug}`}
          article={article}
          currentUser={params.currentUser}
          onUpdateArticle={params.onUpdateArticle}
        />
      ))}
    </ul>
  )
}
