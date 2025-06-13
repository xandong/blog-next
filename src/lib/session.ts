// lib/session.ts
import { SessionOptions } from "iron-session"
import { cookies } from "next/headers"
import { getIronSession, IronSession } from "iron-session"

import { User } from "@/types/generated"

export interface SessionData {
  apiKey?: string
  isLoggedIn: boolean
  user?: User
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SECRET_COOKIE_PASSWORD || "default_password_for_development",
  cookieName: "share4us_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  }
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = false
  }

  return session
}
