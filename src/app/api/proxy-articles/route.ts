import { NextResponse } from "next/server"

import { getSession } from "@/lib/session"

export async function POST(req: Request) {
  const { apiKey } = await getSession()

  if (!apiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FOREM_BASE_URL}/api/articles`,
      {
        method: "POST",
        headers: {
          accept: "application/vnd.forem.api-v1+json",
          "Content-Type": "application/json",
          "api-key": apiKey
        },
        body: JSON.stringify(body)
      }
    )

    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
