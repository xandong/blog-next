"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { useDebounce } from "use-debounce"

import { Article } from "@/types/custom"
import { Input } from "../_ui/input"

interface SearchComponentProps {
  setArticles: Dispatch<SetStateAction<Article[]>>
  initialArticles: Article[]
  label?: string
}

export const SearchComponent = ({
  label,
  setArticles,
  initialArticles
}: SearchComponentProps) => {
  const [searchValue, setSearchValue] = useState("")
  const [value] = useDebounce(searchValue, 1000)

  useEffect(() => {
    if (!value?.trim()) {
      setArticles(initialArticles)
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
  }, [initialArticles, setArticles, value])

  return (
    <div className="max-w-xl w-full flex flex-row justify-center mb-6">
      <div className="w-full">
        <Input
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
