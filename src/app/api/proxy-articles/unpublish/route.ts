import { getSession } from "@/lib/session"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { apiKey } = await getSession()

  if (!apiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { id } = body.id

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FOREM_BASE_URL}/api/articles/${id}/unpublish`,
      {
        method: "PUT",
        headers: {
          accept: "application/vnd.forem.api-v1+json",
          "api-key": apiKey
        }
      }
    )

    const data = await res.json()
    console.log({ data })

    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
