// app/article/[id]/page.tsx
import { getArticleByIdAction } from "@/app/actions/articles/getArticleById"
import { AppLayout } from "@/components/layout/app-layout"
import { Markdown } from "@/components/misc/markdown"
import Image from "next/image"

interface PageProps {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const { id } = params
  const article = await getArticleByIdAction({ id: parseInt(id) })

  if (!article) {
    return (
      <AppLayout>
        <div className="py-20 text-center text-gray-500">
          Artigo não encontrado.
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {article.title}
        </h1>

        {article.cover_image && (
          <div className="my-6">
            <Image
              src={article.cover_image}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        )}

        <div className="text-sm text-gray-500 mb-4">
          Publicado por {article.user.name} em{" "}
          {new Date(article.published_at).toLocaleDateString()}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <Markdown markdownContent={article.body_markdown || ""} />
        </div>
      </article>
    </AppLayout>
  )
}
