"use server"

import { revalidatePath } from "next/cache"

import { getSession } from "@/lib/session"

export async function saveApiKeyAction(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const apiKey = formData.get("apiKey") as string
  const session = await getSession()

  if (!apiKey || typeof apiKey !== "string") {
    return { success: false, message: "Chave API é obrigatória." }
  }

  try {
    const userResponse = await fetch("https://dev.to/api/users/me", {
      headers: { "api-key": apiKey }
    })
    if (!userResponse.ok) {
      return { success: false, message: "Chave API inválida." }
    }
    const user = await userResponse.json()

    session.user = user

    session.apiKey = apiKey
    session.isLoggedIn = true
    await session.save()

    revalidatePath("/", "layout")

    return { success: true, message: "Chave API salva com sucesso!" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Ocorreu um erro no servidor." }
  }
}

export async function logoutAction(): Promise<void> {
  const session = await getSession()

  session.destroy()

  revalidatePath("/", "layout")
}
