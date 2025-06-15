"use client"

import { useCallback, useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Tag } from "@/types/generated"
import { createArticleAction } from "@/app/_actions/articles/createArticle"
import { getTagsListAction } from "@/app/_actions/tags/getTagsList"

import { Button } from "@/components/_ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/_ui/form"
import { Input } from "@/components/_ui/input"
import Editor from "@/components/misc/editor"
import { MultiSelect } from "@/components/misc/multi-select"

const schema = z.object({
  title: z.string(),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string())
})

type FormData = z.infer<typeof schema>

export const CreateArticleForm = () => {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      coverImage: "",
      tags: []
    }
  })

  const { handleSubmit } = form

  const onSubmit = useCallback(
    async (data: FormData) => {
      schema.parse(data)
      setLoading(true)

      try {
        await createArticleAction({
          article: {
            title: data.title,
            main_image: data.coverImage,
            body_markdown: content,
            description: "",
            tags: selectedTags,
            published: true
          }
        })
        setLoading(false)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [content, selectedTags]
  )

  useEffect(() => {
    getTagsListAction().then(({ tags }) => tags && setTags(tags))
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <MultiSelect
        maxSelections={4}
        label="Selecione até 4 tags"
        list={tags.map((tag) => ({
          value: tag.id.toString(),
          label: tag.name
        }))}
        onChange={(e) => setSelectedTags(e)}
      />

      <Form {...form}>
        <form
          className="space-y-4 w-full max-w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          />

          <Editor onChange={setContent} value={content} />

          <Button type="submit" className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : "Publicar"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
