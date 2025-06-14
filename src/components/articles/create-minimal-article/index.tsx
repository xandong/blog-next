"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/_ui/input"
import { Button } from "@/components/_ui/button"
import Link from "next/link"
import { Textarea } from "@/components/_ui/textarea"

const MAX_CONTENT_LENGTH = 256

export const CreateMinimalArticle = () => {
  const [activeView, setActiveView] = useState<boolean>(false)
  const [shortContent, setShortContent] = useState<string>("")
  const [contentLength, setContentLength] = useState<number>(0)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (shortContent === "") {
          setActiveView(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [shortContent])

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setShortContent(value)
    setContentLength(value.length)
  }

  return (
    <div
      ref={wrapperRef}
      className={`${activeView ? "p-3" : ""} bg-card/60 rounded-md gap-2 flex flex-col items-end border border-border/60`}
      onFocus={() => setActiveView(true)}
    >
      {activeView ? (
        <Textarea
          value={shortContent}
          onChange={handleChangeContent}
          placeholder={"Escreva um artigo curto..."}
        />
      ) : (
        <Input placeholder={"Escreva um artigo curto..."} />
      )}

      {activeView && (
        <>
          <span className="text-sm text-muted-foreground ml-2">
            {contentLength}/{MAX_CONTENT_LENGTH}
          </span>

          <div className="w-full flex justify-between gap-2 items-end">
            <span className="text-sm text-muted-foreground ml-2">
              Crie um artigo completo.
              <Link href="/articles/create" className="text-primary">
                <Button variant={"link"} className="pl-1">
                  Abrir editor
                </Button>
              </Link>
            </span>

            <Button>Publicar</Button>
          </div>
        </>
      )}
    </div>
  )
}
