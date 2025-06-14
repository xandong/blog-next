"use client"

import { logoutAction } from "@/app/_actions/session"
import { LogOutIcon } from "lucide-react"
import { useCallback } from "react"

export const LogoutButton = () => {
  const onClick = useCallback(async () => {
    await logoutAction()
  }, [])

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-neutral-500"
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </button>
  )
}
