// components/ArticlesPaginationInfinite.tsx
"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { getArticlesListAction } from "@/app/_actions/articles/get-articles-list"

import { ArticleList } from "../articles-list"
import { Article } from "@/types/custom"
import { User } from "@/types/generated"
import { Loader2 } from "lucide-react"

interface Props {
  currentUser?: User | null
  initialArticles: Article[]
  // eslint-disable-next-line no-unused-vars
  request?: (params: { page: number }) => Promise<{ data?: Article[] }>
}
export default function ArticlesPaginationInfinite({
  currentUser,
  initialArticles,
  request
}: Props) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { ref, inView } = useInView()
  const getArticlesRequest = request || getArticlesListAction
  useEffect(() => {
    if (loading) return

    if (inView && hasMore) {
      getArticlesRequest({ page: page })
        .then(({ data: newArticles }) => {
          if (!newArticles || newArticles.length === 0) setHasMore(false)
          else {
            setArticles((prev) => [...prev, ...newArticles])
            setPage((p) => p + 1)
          }
        })
        .finally(() => setLoading(false))
    }
  }, [inView, hasMore, loading, page, request, getArticlesRequest])

  const onUpdateArticle = (article: Article) => {
    setArticles((prev) => {
      const index = prev.findIndex((a) => a.id === article.id)
      if (index !== -1) {
        const newArticles = [...prev]
        newArticles[index] = article
        return newArticles
      }
      return prev
    })
  }

  return (
    <ul className="grid gap-6">
      <ArticleList
        articles={articles}
        currentUser={currentUser}
        onUpdateArticle={onUpdateArticle}
      />
      {hasMore && (
        <li ref={ref} className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </li>
      )}
    </ul>
  )
}
