"use client"

import { useMemo, useState } from "react"

import { Article } from "@/types/custom"
import { User } from "@/types/generated"
import { getMyArticlesListAction } from "@/app/_actions/users/get-my-articles-list"

import ArticlesPaginationInfinite from "@/components/articles/articles-pagination-infinite"
import { AuthorCard } from "@/components/users/author-card"
import { SearchComponent } from "@/components/misc/search-component"

interface MePageProps {
  user?: User | null
  initialArticles: Article[]
}

export const MePage = ({ initialArticles, user }: MePageProps) => {
  const [articles, setArticles] = useState(initialArticles)
  const [filteredArticles, setFilteredArticles] = useState(articles)

  const isEmpty = useMemo(
    () => !initialArticles || initialArticles.length === 0,
    [initialArticles]
  )

  return (
    <div className="w-full flex flex-col items-center">
      <SearchComponent
        label="Buscar artigos..."
        setArticles={setFilteredArticles}
        initialArticles={articles}
      />

      <div className="w-full mx-auto pb-8 gap-8 flex lg:flex-row flex-col items-start lg:justify-center">
        {user?.username && (
          <div className="lg:sticky lg:top-20 w-full lg:max-w-72">
            <AuthorCard username={user.username} />
          </div>
        )}

        {isEmpty ? (
          <div className="w-full flex justify-center">
            <p className="text-xl font-bold">Nenhum artigo publicado ainda</p>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <ArticlesPaginationInfinite
              currentUser={user}
              articles={filteredArticles}
              setArticles={setArticles}
              request={getMyArticlesListAction}
            />
          </div>
        )}
      </div>
    </div>
  )
}
