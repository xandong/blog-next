"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Tag } from "@/types/generated"
import { getTagsListAction } from "@/app/_actions/tags/get-tags-list"

import { Button } from "@/components/_ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/_ui/form"
import { Input } from "@/components/_ui/input"
import Editor from "@/components/misc/editor"
import { MultiSelect } from "@/components/misc/multi-select"
import { useRouter } from "next/navigation"
import { Article } from "@/types/custom"
import { updateArticleAction } from "@/app/_actions/articles/update-article"

const schema = z.object({
  title: z.string(),
  content: z.string(),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string())
})

type FormData = z.infer<typeof schema>

export const UpsertArticleForm = ({ article }: { article?: Article }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [tagsList, setTagsList] = useState<Tag[]>([])

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: article?.title || "",
      coverImage: article?.cover_image || "",
      tags: article?.tag_list || [],
      content: article?.body_markdown || ""
    }
  })
  const { handleSubmit, setValue } = form

  const handleUploadImage = useCallback(
    async (file: File) => {
      try {
        setUploadingImage(true)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("fileName", file.name)
        formData.append("fileType", file.type)

        const response = await fetch(`/api/s3/upload`, {
          method: "POST",
          body: formData
        })

        if (!response.ok) throw new Error("Falha ao obter URL de upload")
        const { url } = await response.json()

        console.debug({ url })

        setValue("coverImage", url)
        toast.success("Imagem enviada com sucesso!")
      } catch (err) {
        toast.error("Erro ao enviar imagem.")
        console.error(err)
      } finally {
        setUploadingImage(false)
      }
    },
    [setValue]
  )

  const onSubmit = useCallback(
    async (data: FormData) => {
      schema.parse(data)
      setLoading(true)

      const body = {
        article: {
          title: data.title,
          main_image: data.coverImage,
          body_markdown: data.content,
          tags: data.tags,
          description: "",
          published: true
        }
      }

      try {
        let response = undefined
        if (article) {
          const { success } = await updateArticleAction({
            id: article.id.toString(),
            data: body
          })

          if (success) {
            toast.success("Artigo atualizado com sucesso!")
            router.prefetch(`/articles/${article.id}`)
            router.push(`/articles/${article.id}`)
          }
        } else {
          response = await fetch("/api/proxy-articles", {
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
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [router, article]
  )

  useEffect(() => {
    getTagsListAction().then(({ tags }) => tags && setTagsList(tags))
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 mt-4">
      {form.watch("coverImage") && (
        <Image
          loading="lazy"
          src={form.watch("coverImage") || ""}
          alt="Preview da imagem"
          className="rounded-md object-cover"
          width={480}
          height={300}
        />
      )}

      <Form {...form}>
        <form
          className="space-y-4 w-full max-w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormItem>
            <FormLabel htmlFor="cover-image">
              Imagem destacada do artigo
            </FormLabel>
            <FormControl>
              <Input
                id="cover-image"
                className="bg-background border border-border rounded-sm box-border pt-1.5"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  handleUploadImage(file)
                }}
              />
            </FormControl>
          </FormItem>

          {/* <FormField
            shouldUnregister
            name="coverImage"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="URL pública da imagem de capa (opcional)"
                    className="text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultiSelect
                    {...field}
                    maxSelections={4}
                    label="Selecione até 4 tags"
                    list={tagsList.map((tag) => ({
                      value: tag.name,
                      label: tag.name,
                      bgColor: tag.bg_color_hex,
                      color: tag.text_color_hex
                    }))}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    style={{ fontSize: "1.5rem" }}
                    placeholder="Insira o título..."
                    className="border-0 shadow-none font-bold placeholder:font-bold placeholder:text-2xl ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {loading || uploadingImage ? (
              <Loader2 className="animate-spin" data-testid="spinner" />
            ) : (
              "Publicar"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
