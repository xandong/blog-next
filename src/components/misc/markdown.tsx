// src/components/misc/markdown.tsx
import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { visit } from "unist-util-visit"
import Image from "next/image"
import Link from "next/link"
import CodepenEmbed from "./codepen-embde"
import type { Plugin } from "unified"
import type { Paragraph, Link as LinkMdast, Literal } from "mdast"

interface CodepenHtml extends Literal {
  type: "html"
  value: string
}

const remarkCodepenPlugin: Plugin = () => {
  return (tree) => {
    visit(tree, "paragraph", (node: Paragraph) => {
      const { children } = node

      if (children.length !== 3) return

      const [first, linkNode, last] = children

      if (first.type !== "text" || last.type !== "text") return
      if (linkNode.type !== "link") return

      const openMatch = first.value.match(/^\{%\s*codepen\s*$/)
      const closeMatch = last.value.match(/^\s*%\}$/)

      if (!openMatch || !closeMatch) return

      const url = (linkNode as LinkMdast).url

      const htmlNode: CodepenHtml = {
        type: "html",
        value: `<div data-codepen-embed data-url="${url}"></div>`
      }

      Object.assign(node, htmlNode)
      // @ts-expect-error — children não existe em nós html
      delete node.children
    })
  }
}
interface MarkdownProps {
  markdownContent: string
}

export function Markdown({ markdownContent }: MarkdownProps) {
  if (!markdownContent) {
    return null
  }

  return (
    <div className="prose dark:prose-invert max-w-none px-4 py-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkCodepenPlugin]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          div: ({ ...props }: any) => {
            if (props["data-codepen-embed"] !== undefined) {
              const url = props["data-url"]
              return <CodepenEmbed url={url} />
            }

            return <div {...props} />
          },
          code: ({ className, children, ...props }) => {
            const hasLang = /language-(\w+)/.exec(className || "")
            if (hasLang) {
              return (
                <pre className="relative rounded-lg p-4 bg-gray-800 text-white font-mono text-sm overflow-x-auto">
                  <code className={`language-${hasLang[1]}`} {...props}>
                    {children}
                  </code>
                  <span className="absolute top-2 right-4 text-xs text-gray-400">
                    {hasLang[1].toUpperCase()}
                  </span>
                </pre>
              )
            }

            return (
              <code
                className="bg-gray-200 dark:bg-gray-700 text-purple-700 dark:text-purple-300 rounded px-1 py-0.5"
                {...props}
              >
                {children}
              </code>
            )
          },

          a: ({ ...props }) => (
            <Link
              target="_blank"
              href={props.href || ""}
              {...props}
              className="text-blue-600 hover:underline dark:text-blue-400"
            />
          ),
          img: ({ alt = "", src }) => (
            <Image
              src={src || ""}
              alt={alt}
              width={800}
              height={400}
              className="rounded-lg shadow-md max-w-full h-auto"
            />
          ),
          table: ({ ...props }) => (
            <table
              {...props}
              className="w-full text-left border-collapse rounded-lg overflow-hidden"
            />
          ),
          th: ({ ...props }) => (
            <th
              {...props}
              className="p-3 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 border-b-2 border-blue-200 dark:border-blue-700 font-semibold"
            />
          ),
          td: ({ ...props }) => (
            <td
              {...props}
              className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-blue-500 pl-4 py-1 italic text-gray-600 dark:text-gray-400"
            />
          )
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  )
}
