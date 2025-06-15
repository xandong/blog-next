// components/ArticleListInfinite.tsx
"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { ArticleIndex } from "@/types/generated"
import { getArticlesListAction } from "@/app/_actions/articles/getArticlesList"

import { ArticleList } from "../articles-list"

interface Props {
  initialArticles: ArticleIndex[]
}

export default function ArticleListInfinite({ initialArticles }: Props) {
  const [articles, setArticles] = useState<ArticleIndex[]>(initialArticles)
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { ref, inView } = useInView()

  useEffect(() => {
    if (loading) return

    if (inView && hasMore) {
      getArticlesListAction({ page: page })
        .then((newArticles: ArticleIndex[]) => {
          if (newArticles.length === 0) setHasMore(false)
          else {
            setArticles((prev) => [...prev, ...newArticles])
            setPage((p) => p + 1)
          }
        })
        .finally(() => setLoading(false))
    }
  }, [inView, hasMore, loading, page])

  return (
    <ul className="grid gap-6">
      <ArticleList articles={articles} />
      {hasMore && (
        <li ref={ref} className="flex justify-center py-4">
          <div className="w-11 h-11 border-t-2 border-b-2 border-l-2 border-primary rounded-full animate-spin"></div>
        </li>
      )}
    </ul>
  )
}
