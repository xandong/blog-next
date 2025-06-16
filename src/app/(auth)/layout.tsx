"use server"

import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const { user } = await getSession()

  if (!user) {
    return redirect("/")
  }

  return children
}
