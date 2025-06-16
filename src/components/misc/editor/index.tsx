"use client"

import { forwardRef, useEffect } from "react"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import hljs from "highlight.js"
import javascript from "highlight.js/lib/languages/javascript"
import typescript from "highlight.js/lib/languages/typescript"
import python from "highlight.js/lib/languages/python"
import css from "highlight.js/lib/languages/css"
import html from "highlight.js/lib/languages/xml"
import { Loader2 } from "lucide-react"

hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("css", css)
hljs.registerLanguage("html", html)

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill")
    return RQ
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center h-10">
        <Loader2 className="animate-spin text-foreground" />
      </div>
    )
  }
)

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"]
  ],
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value
  }
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "link",
  "image"
]

export type EditorProps = {
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (v: string) => void
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({ value, onChange }, ref) => {
    useEffect(() => {
      return () => {}
    }, [])

    return (
      <div ref={ref} className="bg-background rounded-lg">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Escreva o conteúdo aqui..."
          className="min-h-56 text-gray-800 dark:text-gray-100"
        />
      </div>
    )
  }
)

Editor.displayName = "Editor"

export default Editor
