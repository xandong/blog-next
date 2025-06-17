"use client"

import { useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "@phosphor-icons/react"

import { Button } from "../_ui/button"

interface BackButtonProps {
  href?: string
  label?: string
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  const router = useRouter()

  const isClient = typeof window !== "undefined"

  const handleClick = useCallback(() => {
    if (isClient) {
      router.back()

      return
    }

    window.location.href = "/"
  }, [isClient, router])

  const content = (
    <>
      <ArrowLeftIcon size={24} />
      <span className="font-semibold text-lg">{label || "Voltar"}</span>
    </>
  )

  return (
    <div className="my-2">
      {href ? (
        <Link href={href} prefetch>
          <Button variant={"link"} className="flex items-center gap-0 text-lg">
            {content}
          </Button>
        </Link>
      ) : (
        <Button
          variant={"link"}
          className="flex items-center gap-0 text-lg"
          onClick={handleClick}
        >
          {content}
        </Button>
      )}
    </div>
  )
}
