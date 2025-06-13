"use client"

import { useParams } from "next/navigation"

export default function Page({ children }: { children: React.ReactNode }) {
  const { id } = useParams()

  return (
    <section>
      <h1>Article</h1>
      <p>Article ID: {id}</p>
      {children}
    </section>
  )
}
