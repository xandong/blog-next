import { getArticleByIdAction } from "@/app/_actions/articles/get-article-by-id"
import { Button } from "@/components/_ui/button"
import { UpsertArticleForm } from "@/components/articles/create-article-form"
import { AppLayout } from "@/components/layout/app-layout"
import { BackButton } from "@/components/misc/back-button"
import Link from "next/link"

interface PageProps {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const { id } = params
  const { article } = await getArticleByIdAction({ id: parseInt(id) })

  return (
    <AppLayout>
      <div className="w-full flex justify-between">
        <BackButton />

        <div>
          {article?.id && (
            <Link href={`/articles/${article.id}`}>
              <Button variant={"outline"}>Preview</Button>
            </Link>
          )}
        </div>
      </div>

      {!article ? (
        <div className="py-20 text-center text-gray-500">
          Artigo não encontrado.
        </div>
      ) : (
        <div className="flex flex-col items-start w-full max-w-5xl">
          <h1 className="text-3xl font-bold">Edite seu artigo</h1>
          <h2 className="text-xl font- mb-4 text-muted-foreground">
            Faça as alterações necessárias e publique
          </h2>

          <UpsertArticleForm article={article} />
        </div>
      )}
    </AppLayout>
  )
}
