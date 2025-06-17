"use client"

import { logoutAction } from "@/app/_actions/session"
import { Loader2, LogOutIcon } from "lucide-react"
import { useCallback, useState } from "react"

export const LogoutButton = () => {
  const [loading, setLoading] = useState(false)

  const onClick = useCallback(async () => {
    setLoading(true)
    await logoutAction()
    setLoading(false)
  }, [])

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-neutral-500"
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <LogOutIcon className="h-4 w-4" />
          Logout
        </>
      )}
    </button>
  )
}
