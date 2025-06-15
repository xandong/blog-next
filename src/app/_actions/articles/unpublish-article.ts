"use server"

import { getSession } from "@/lib/session"
import axios from "axios"
import { revalidatePath } from "next/cache"

interface unpublishArticleActionProps {
  id: string
}

export const unpublishArticleAction = async ({
  id
}: unpublishArticleActionProps): Promise<{
  success?: boolean
  error?: string
}> => {
  const { apiKey } = await getSession()

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_FOREM_BASE_URL}/api/articles/${id}`,
      {
        article: {
          published: false
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/vnd.forem.api-v1+json",
          "api-key": apiKey
        }
      }
    )

    if (response.status !== 200) {
      return { error: "Erro ao arquivar artigo" }
    }

    revalidatePath("/me", "page")
    revalidatePath("/draft/[id]", "page")
    revalidatePath("/articles/[id]", "page")
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Erro ao publicar artigo" }
  }
}
