"use client"

import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import { saveApiKeyAction } from "@/app/actions/session"
import { Button } from "../_ui/button"
import { Input } from "../_ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../_ui/popover"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../_ui/form"
import { Loader2 } from "lucide-react"

type SignInSchema = z.infer<typeof signInSchema>

const signInSchema = z.object({
  apiKey: z
    .string({ message: "A API key é obrigatória" })
    .min(8, "Insira uma API key válida")
})

export const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      apiKey: ""
    }
  })
  const { handleSubmit } = form

  const onSubmit = useCallback(async (data: SignInSchema) => {
    const parsed = signInSchema.parse(data)
    setLoading(true)

    const formData = new FormData()
    formData.set("apiKey", parsed.apiKey)
    await saveApiKeyAction(formData).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"outline"}>Entrar</Button>
      </PopoverTrigger>

      <PopoverContent className="mr-3.5">
        <div className="flex flex-col items-center justify-center gap-4">
          <Form {...form}>
            <form
              className="space-y-4 w-[320px] max-w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                name="apiKey"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key</FormLabel>
                    <FormDescription>
                      Não compartilhamos seus dados
                    </FormDescription>
                    <FormControl>
                      <Input {...field} type="password" autoComplete="off" />
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
      </PopoverContent>
    </Popover>
  )
}
