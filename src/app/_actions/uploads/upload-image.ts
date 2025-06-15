"use client"

import { api } from "@/lib/api"
import { getSession } from "@/lib/session"

interface UploadImageActionProps {
  file: File
}

export const uploadImageAction = async ({ file }: UploadImageActionProps) => {
  try {
    const { apiKey } = await getSession()

    if (!apiKey) {
      return { error: "Não autorizado." }
    }

    const formData = new FormData()
    formData.append("image[]", file)

    const response = await api.post("/image_uploads", formData, {
      baseURL: process.env.NEXT_PUBLIC_FOREM_BASE_URL,
      headers: {
        "api-key": apiKey
      }
    })

    console.log({ data: response.data })
    return { data: response.data }
  } catch (error) {
    console.error(error)
  }
}
