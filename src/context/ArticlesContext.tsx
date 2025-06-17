/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react"

import { Article } from "@/types/custom"

interface ArticlesContextType {
  articles: Article[]
  setArticles: (articles: Article[]) => void
  currentArticle: Article | null
  setCurrentArticle: (article: Article) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string) => void
  updateArticle: (article: Article) => void
}

export const ArticlesContext = createContext<ArticlesContextType>({
  articles: [],
  setArticles: (articles: Article[]) => {},
  currentArticle: null,
  setCurrentArticle: (article: Article) => {},
  loading: false,
  setLoading: (loading: boolean) => {},
  error: null,
  setError: (error: any) => {},
  updateArticle: (article: Article) => {}
})

export const ArticlesProvider = ({ children }: any) => {
  const [articles, setArticles] = useState<Article[]>([])
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateArticle = (article: Article) => {
    setArticles((prevArticles: Article[]) => {
      const index = prevArticles.findIndex((a) => a.id === article.id)
      if (index !== -1) {
        const updatedArticles = [...prevArticles]
        updatedArticles[index] = article
        return updatedArticles
      }
      return prevArticles
    })
  }

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        setArticles,
        loading,
        setLoading,
        error,
        setError,
        updateArticle,
        currentArticle,
        setCurrentArticle
      }}
    >
      {children}
    </ArticlesContext.Provider>
  )
}
