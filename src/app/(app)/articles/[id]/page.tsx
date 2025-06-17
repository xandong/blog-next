// app/article/[id]/page.tsx
import Image from "next/image"

import { getArticleByIdAction } from "@/app/_actions/articles/get-article-by-id"

import { AppLayout } from "@/components/layout/app-layout"
import { AuthorCard } from "@/components/users/author-card"
import { Card, CardContent } from "@/components/_ui/card"
import { Markdown } from "@/components/misc/markdown"
import { BackButton } from "@/components/misc/back-button"

interface PageProps {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const { id } = params
  const { article } = await getArticleByIdAction({ id: parseInt(id) })

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
      <div className="w-full">
        <BackButton />
      </div>

      <div className="w-full mx-auto pb-8 gap-8 flex lg:flex-row flex-col items-start ">
        <Card className="flex-1 w-full">
          <CardContent>
            <h1 className="md:text-3xl text-xl font-bold text-gray-900 dark:text-white mb-2">
              {article.title}
            </h1>

            <div className="sm:text-sm text-xs text-gray-500 mb-4">
              Publicado por {article.user.name} em{" "}
              {new Date(article.published_at).toLocaleDateString()}
            </div>

            {article.cover_image && (
              <div className="my-6 max-w-4xl w-full">
                <Image
                  loading="lazy"
                  src={article.cover_image}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            )}

            <div className="prose dark:prose-invert max-w-4xl w-full">
              <Markdown markdownContent={article.body_markdown || ""} />
            </div>
          </CardContent>
        </Card>

        <div className="lg:sticky lg:top-20 w-full lg:max-w-72">
          {article.user.username && (
            <AuthorCard username={article.user.username} />
          )}
        </div>
      </div>
    </AppLayout>
  )
}
