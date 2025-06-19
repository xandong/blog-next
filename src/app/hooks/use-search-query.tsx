"use client"
import { useEffect, useState, useCallback } from "react"
import { usePathname } from "next/navigation"

export function useQueryParam(
  initialValue = "",
  paramKey = "search"
  // eslint-disable-next-line no-unused-vars
): [string, (v: string) => void] {
  const pathname = usePathname()
  const [value, setValue] = useState(initialValue)

  const updateUrl = useCallback(
    (newValue: string) => {
      if (!window) return

      const params = new URLSearchParams(window.location.search)

      if (newValue) {
        params.set(paramKey, newValue)
      } else {
        params.delete(paramKey)
      }

      const qs = params.toString()
      const newHref = `${pathname}${qs ? `?${qs}` : ""}`

      window.history.replaceState(
        { ...window.history.state, url: newHref, as: newHref },
        "",
        newHref
      )
    },
    [paramKey, pathname]
  )

  useEffect(() => {
    updateUrl(value)
  }, [value, updateUrl])

  return [value, setValue]
}
