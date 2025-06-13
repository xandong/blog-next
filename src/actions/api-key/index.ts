import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"

export const saveApiKey = async ({ apiKey }: { apiKey: string }) => {
  try {
    const session = await getSession()

    if (!apiKey || typeof apiKey !== "string") {
      return NextResponse.json(
        { message: "apiKey é obrigatória e deve ser uma string." },
        { status: 400 }
      )
    }

    session.apiKey = apiKey
    session.isLoggedIn = true
    await session.save()

    return { message: "Chave API salva com sucesso!" }
  } catch (error) {
    console.error(error)
    return { message: "Ocorreu um erro no servidor.", status: 500 }
  }
}

export const resetApiKey = async () => {
  try {
    const session = await getSession()
    session.apiKey = ""
    session.isLoggedIn = false
    await session.save()
  } catch (error) {
    console.error(error)
  }
}
