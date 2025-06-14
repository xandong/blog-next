"use client"

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
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  title: z.string()
})

type FormData = z.infer<typeof schema>

export const CreateArticleForm = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: ""
    }
  })

  const { handleSubmit } = form

  const onSubmit = async (data: FormData) => {
    schema.parse(data)
    setLoading(true)
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <Form {...form}>
        <h2>Criar Artigo</h2>

        <form
          className="space-y-4 w-full max-w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            shouldUnregister
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
