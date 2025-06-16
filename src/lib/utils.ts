import { clsx, type ClassValue } from "clsx"
import { SessionOptions } from "iron-session"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SECRET_COOKIE_PASSWORD || "default_password_for_development",
  cookieName: "share4us_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  }
}
