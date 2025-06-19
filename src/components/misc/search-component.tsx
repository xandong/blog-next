"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { useDebounce } from "use-debounce"

import { useQueryParam } from "@/app/hooks/use-search-query"
import { Article } from "@/types/custom"
import { Input } from "../_ui/input"

interface SearchComponentProps {
  setArticles: Dispatch<SetStateAction<Article[]>>
  initialArticles: Article[]
  label?: string
  initialSearch?: string
}

export const SearchComponent = ({
  label,
  setArticles,
  initialArticles,
  initialSearch = ""
}: SearchComponentProps) => {
  useEffect(() => {
    setSearchValue(initialSearch || "")
  }, [initialSearch])

  const [, setSearch] = useQueryParam(initialSearch, "search")

  const [searchValue, setSearchValue] = useState(initialSearch)
  const [value] = useDebounce(searchValue, 1000)

  useEffect(() => {
    if (!value?.trim()) {
      setArticles(initialArticles)
      setSearch("")
      return
    }

    const words = value.trim().toUpperCase().split(/\s+/).filter(Boolean)

    const filtered = initialArticles.filter((article) => {
      const title = article.title.toUpperCase()
      const description = article.description.toUpperCase()
      const tags = article.tag_list.map((tag) => tag.toUpperCase())

      return words.every((word) => {
        return (
          title.includes(word) ||
          description.includes(word) ||
          tags.some((tag) => tag.includes(word))
        )
      })
    })

    setArticles(filtered)
    setSearch(value)
  }, [initialArticles, setArticles, setSearch, value])

  return (
    <div className="max-w-xl w-full flex flex-row justify-center mb-6">
      <div className="w-full">
        <Input
          className="bg-primary-foreground/20"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={
            label ? label : "Pesquise pelos assuntos que mais lhe interessam"
          }
          endIcon={
            searchValue !== "" ? (
              <button
                onClick={() => setSearchValue("")}
                className="flex items-center justify-center"
              >
                <XIcon size={20} color="gray" />
              </button>
            ) : (
              <SearchIcon size={20} color="gray" />
            )
          }
        />
      </div>
    </div>
  )
}
