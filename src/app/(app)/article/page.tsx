"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { Loading } from "@/components/misc/loading"

export default function RootLayout() {
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (!id) {
      toast("Artigo não encontrado")

      setTimeout(() => {
        router.replace("/")
      }, 500)
    }
  }, [id, router])

  return <Loading />
}
