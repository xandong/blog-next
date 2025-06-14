import { User } from "@/types/generated"

export interface SessionData {
  apiKey?: string
  isLoggedIn: boolean
  user?: User
}
