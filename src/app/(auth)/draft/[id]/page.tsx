import { getArticleByIdAction } from "@/app/_actions/articles/get-article-by-id"

import { UpsertArticleForm } from "@/components/articles/create-article-form"
import { AppLayout } from "@/components/layout/app-layout"

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
      <div className="flex flex-col items-start w-full max-w-5xl">
        <h1 className="text-3xl font-bold">Edite seu artigo</h1>
        <h2 className="text-xl font- mb-4 text-muted-foreground">
          Faça as alterações necessárias e publique
        </h2>

        <UpsertArticleForm article={article} />
      </div>
    </AppLayout>
  )
}
