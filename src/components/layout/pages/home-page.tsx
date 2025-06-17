"use client"

import { useMemo, useState } from "react"

import { Article } from "@/types/custom"
import { User } from "@/types/generated"

import { SearchComponent } from "../../misc/search-component"
import ArticlesPaginationInfinite from "../../articles/articles-pagination-infinite"

interface HomeProps {
  initialArticles: Article[]
  user?: User | null
}

export const Home = ({ initialArticles, user }: HomeProps) => {
  const [articles, setArticles] = useState(initialArticles)
  const [filteredArticles, setFilteredArticles] = useState(articles)

  const isEmpty = useMemo(
    () => !initialArticles || initialArticles.length === 0,
    [initialArticles]
  )

  return (
    <div className="w-full flex flex-col items-center my-6">
      <SearchComponent
        setArticles={setFilteredArticles}
        initialArticles={articles}
      />

      {isEmpty ? (
        <div className="w-full flex justify-center">
          <p className="text-xl font-bold">Nenhum artigo encontrado</p>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <ArticlesPaginationInfinite
            articles={filteredArticles}
            setArticles={setArticles}
            currentUser={user}
          />
        </div>
      )}
    </div>
  )
}
