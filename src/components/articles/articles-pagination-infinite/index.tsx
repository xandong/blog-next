// components/ArticlesPaginationInfinite.tsx
"use client"

import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react"
import { useInView } from "react-intersection-observer"

import { getArticlesListAction } from "@/app/_actions/articles/get-articles-list"

import { ArticleList } from "../articles-list"
import { Article } from "@/types/custom"
import { User } from "@/types/generated"
import { Loader2 } from "lucide-react"

const MAX_PAGES = 100
interface Props {
  currentUser?: User | null
  articles: Article[]
  // eslint-disable-next-line no-unused-vars
  setArticles: Dispatch<SetStateAction<Article[]>>
  // eslint-disable-next-line no-unused-vars
  request?: (params: { page: number }) => Promise<{ data?: Article[] }>
}
export default function ArticlesPaginationInfinite({
  currentUser,
  articles,
  request,
  setArticles
}: Props) {
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const fetchTimestamps = useRef<number[]>([])

  const { ref, inView } = useInView()
  const getArticlesRequest = request || getArticlesListAction

  useEffect(() => {
    if (loading) return

    const now = Date.now()
    fetchTimestamps.current = fetchTimestamps.current.filter(
      (ts) => now - ts < 1_000
    )

    if (fetchTimestamps.current.length >= 5) {
      setHasMore(false)
      const timeout = setTimeout(() => {
        setHasMore(true)
        fetchTimestamps.current = []
      }, 15_000)

      return () => clearTimeout(timeout)
    }

    if (page >= MAX_PAGES || !inView || !hasMore) return

    setLoading(true)
    fetchTimestamps.current.push(now)

    getArticlesRequest({ page: page })
      .then(({ data: newArticles }) => {
        if (!newArticles || newArticles.length === 0) setHasMore(false)
        else {
          setArticles((prev) => {
            const newArticlesSet = new Set(prev.map((a) => a.id))
            const newArticlesFiltered = newArticles.filter(
              (a) => !newArticlesSet.has(a.id)
            )
            return [...prev, ...newArticlesFiltered]
          })
          setPage((p) => p + 1)
        }
      })
      .finally(() => setLoading(false))
  }, [inView, hasMore, loading, page, request, getArticlesRequest, setArticles])

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
