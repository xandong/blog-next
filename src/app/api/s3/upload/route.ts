import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const fileName = formData.get("fileName") as string
    const fileType = formData.get("fileType") as string

    if (!file || !fileName || !fileType) {
      return NextResponse.json(
        { error: "Arquivo, nome e tipo são obrigatórios." },
        { status: 400 }
      )
    }

    const folder = "cover-image"
    const key = `${folder}/${uuidv4()}-${fileName}`

    const buffer = Buffer.from(await file.arrayBuffer())

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: fileType,
      ACL: "public-read"
    })

    await s3.send(command)

    const publicFileUrl = `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_REGION}.amazonaws.com/${key}`

    return NextResponse.json({ url: publicFileUrl })
  } catch (error) {
    console.error("Erro ao enviar arquivo para o S3:", error)
    return NextResponse.json(
      { error: "Falha ao enviar arquivo para o S3." },
      { status: 500 }
    )
  }
}
