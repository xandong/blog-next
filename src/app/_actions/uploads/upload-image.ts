"use server"

export const uploadImageAction = async ({ file }: { file: File }) => {
  try {
    const res = await fetch(
      `/api/s3/upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${file.type}`
    )

    const { url, key } = await res.json()

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type
      },
      body: file
    })

    const fileUrl = `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_REGION}.amazonaws.com/${key}`
    return { fileUrl }
  } catch (err) {
    console.error("Erro no upload:", err)
    throw err
  }
}
