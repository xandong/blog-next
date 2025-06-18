// Licensed under the ISC License (see LICENSE file for details)
import React from "react"

const config = {
  height: 600,
  themeId: "dark",
  defaultTab: "result",
  editable: false,
  preview: false,
  title: "Exemplo de CodePen Incorporado"
}

interface CodepenEmbedProps {
  url: string
  penId?: string
  height?: number
  themeId?: string
  defaultTab?: string
  editable?: boolean
  preview?: boolean
  title?: string
  username?: string
}

const CodepenEmbed: React.FC<CodepenEmbedProps> = ({
  url,
  penId,
  height = config.height,
  themeId = config.themeId,
  defaultTab = config.defaultTab,
  editable = config.editable,
  preview = config.preview,
  title = config.title,
  username
}) => {
  const src = `${username && penId ? `https://codepen.io/${username}/embed/${penId}` : url.replace("/pen/", "/embed/")}?height=${height}&theme-id=${themeId}&default-tab=${defaultTab}&editable=${editable}&preview=${preview}&title=${encodeURIComponent(
    title
  )}&preview=true&editable=false`

  return (
    <iframe
      height={height}
      style={{ width: "100%" }}
      // scrolling="no"
      title={title}
      src={src}
      // frameBorder="no"
      allowFullScreen
    ></iframe>
  )
}

export default CodepenEmbed
