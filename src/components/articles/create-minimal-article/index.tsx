"use client"

import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import { Input } from "@/components/_ui/input"
import { Button } from "@/components/_ui/button"
import { Textarea } from "@/components/_ui/textarea"
import { Loader2 } from "lucide-react"

const MAX_CONTENT_LENGTH = 256

export const CreateMinimalArticle = () => {
  const router = useRouter()
  const [activeView, setActiveView] = useState<boolean>(false)
  const [shortContent, setShortContent] = useState<string>("")
  const [contentLength, setContentLength] = useState<number>(0)
  const wrapperRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

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

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsSubmitting(true)
      try {
        const body = {
          article: {
            title: shortContent
          }
        }
        const response = await fetch("/api/proxy-articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })

        const text = await response.text()
        const json = JSON.parse(text)

        if (json?.id) {
          toast.success("Artigo criado com sucesso!")

          router.prefetch(`/articles/${json.id}`)
          router.push(`/articles/${json.id}`)
        }
        setShortContent("")
      } catch (error) {
        console.error(error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [router, shortContent]
  )

  return null // disable in dev api

  // eslint-disable-next-line no-unreachable
  return (
    <form
      onSubmit={handleSubmit}
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
              <Link href="/create" className="text-primary">
                <Button variant={"link"} className="pl-1" type="button">
                  Abrir editor
                </Button>
              </Link>
            </span>

            <Button type="submit" className="w-24" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Publicar"}
            </Button>
          </div>
        </>
      )}
    </form>
  )
}
