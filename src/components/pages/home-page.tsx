"use client"

import { useMemo, useState } from "react"

import { Article } from "@/types/custom"
import { User } from "@/types/generated"
import { SearchComponent } from "../misc/search-component"
import ArticlesPaginationInfinite from "../articles/articles-pagination-infinite"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../_ui/tabs"
import { getMyArticlesListAction } from "@/app/_actions/users/get-my-articles-list"
import { getLatestArticlesListAction } from "@/app/_actions/articles/get-latest-articles-list"

interface HomeProps {
  initialArticles: Article[]
  initialLatestArticles: Article[]
  user?: User | null
}

export const Home = ({
  initialArticles,
  initialLatestArticles,
  user
}: HomeProps) => {
  const [articles, setArticles] = useState(initialArticles)
  const [filteredArticles, setFilteredArticles] = useState(articles)

  const [latestArticles, setLatestArticles] = useState(initialLatestArticles)
  const [filteredLatestArticles, setFilteredLatestArticles] =
    useState(latestArticles)

  const [showTab, setShowTab] = useState<"latest" | "trending">("latest")

  const isEmpty = useMemo(
    () => !initialArticles || initialArticles.length === 0,
    [initialArticles]
  )

  return (
    <div className="w-full flex flex-col items-center my-6">
      <SearchComponent
        setArticles={
          showTab === "latest" ? setLatestArticles : setFilteredArticles
        }
        initialArticles={showTab === "latest" ? latestArticles : articles}
      />

      {isEmpty ? (
        <div className="w-full flex justify-center">
          <p className="text-xl font-bold">Nenhum artigo encontrado</p>
        </div>
      ) : (
        <>
          <div className="w-4xl max-w-full flex justify-end mb-4">
            <Tabs defaultValue={showTab} className="items-end">
              <TabsList className="mb-2">
                <TabsTrigger
                  value="latest"
                  onChange={(e) =>
                    setShowTab(e.currentTarget.value as "latest" | "trending")
                  }
                >
                  Novos
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  onChange={(e) =>
                    setShowTab(e.currentTarget.value as "latest" | "trending")
                  }
                >
                  Tendências
                </TabsTrigger>
              </TabsList>

              <TabsContent value="latest">
                <ArticlesPaginationInfinite
                  articles={filteredLatestArticles}
                  setArticles={setFilteredLatestArticles}
                  currentUser={user}
                  request={getLatestArticlesListAction}
                />
              </TabsContent>

              <TabsContent value="trending">
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
