"use server"

// lib/session.ts
import { cookies } from "next/headers"
import { getIronSession, IronSession } from "iron-session"
import { SessionData } from "./types"
import { sessionOptions } from "./utils"

export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = false
  }

  return session
}
