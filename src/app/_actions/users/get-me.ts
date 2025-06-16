"use server"

import { api } from "@/lib/api"
import { getSession } from "@/lib/session"
import { User } from "@/types/generated"

export const getMe = async () => {
  const session = await getSession()
  const { apiKey, isLoggedIn } = session

  const response = await api.get("/users/me", {
    headers: {
      "api-key": isLoggedIn ? apiKey : ""
    }
  })

  const data: User = await response.data

  if (data.id) {
    const session = await getSession()
    session.user = data
  }

  return data
}
