"use client"

import { useEffect, useMemo, useState } from "react"

import { Article } from "@/types/custom"
import { User } from "@/types/generated"
import { getMyArticlesListAction } from "@/app/_actions/users/get-my-articles-list"
import { getLatestArticlesListAction } from "@/app/_actions/articles/get-latest-articles-list"

import ArticlesPaginationInfinite from "../articles/articles-pagination-infinite"
import { SearchComponent } from "../misc/search-component"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../_ui/tabs"
import { useQueryParam } from "@/app/hooks/use-search-query"

interface HomeProps {
  initialArticles: Article[]
  initialLatestArticles: Article[]
  user?: User | null
  initialTab?: "latest" | "trending"
  search?: string
}

export const Home = ({
  initialArticles,
  initialLatestArticles,
  user,
  initialTab = "latest",
  search
}: HomeProps) => {
  const [articles, setArticles] = useState(initialArticles)
  const [filteredArticles, setFilteredArticles] = useState(articles)

  const [latestArticles, setLatestArticles] = useState(initialLatestArticles)
  const [filteredLatestArticles, setFilteredLatestArticles] =
    useState(latestArticles)

  const [showTab, setShowTab] = useState<"latest" | "trending">(initialTab)
  const [, setTabQuery] = useQueryParam(showTab, "tab")

  const isEmpty = useMemo(
    () => !initialArticles || initialArticles.length === 0,
    [initialArticles]
  )

  useEffect(() => {
    setTabQuery(showTab)
  }, [showTab, setTabQuery])

  return (
    <div className="w-full flex flex-col items-center my-6">
      <SearchComponent
        initialSearch={search}
        initialArticles={showTab === "trending" ? articles : latestArticles}
        setArticles={
          showTab === "trending"
            ? setFilteredArticles
            : setFilteredLatestArticles
        }
      />

      {isEmpty ? (
        <div className="w-full flex justify-center">
          <p className="text-xl font-bold">Nenhum artigo encontrado</p>
        </div>
      ) : (
        <>
          <div className="w-4xl max-w-full flex justify-end mb-4">
            <Tabs
              value={showTab}
              onValueChange={(e) => setShowTab(e as "latest" | "trending")}
              className="items-end w-full"
            >
              <TabsList className="mb-2">
                <TabsTrigger value="latest">Novos</TabsTrigger>
                <TabsTrigger value="trending">Tendências</TabsTrigger>
              </TabsList>

              <TabsContent
                value="latest"
                className="w-full flex justify-center"
              >
                <ArticlesPaginationInfinite
                  articles={filteredLatestArticles}
                  setArticles={setLatestArticles}
                  currentUser={user}
                  request={getLatestArticlesListAction}
                />
              </TabsContent>

              <TabsContent
                value="trending"
                className="w-full flex justify-center"
              >
                <ArticlesPaginationInfinite
                  articles={filteredArticles}
                  setArticles={setArticles}
                  currentUser={user}
                  request={getMyArticlesListAction}
                />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  )
}
