import { UpsertArticleForm } from "@/components/articles/create-article-form"
import { AppLayout } from "@/components/layout/app-layout"
import { BackButton } from "@/components/misc/back-button"

export default function Page() {
  return (
    <AppLayout>
      <div className="w-full flex justify-start">
        <BackButton />
      </div>

      <div className="flex flex-col items-start w-full max-w-5xl">
        <h1 className="text-3xl font-bold">Crie um Artigo</h1>
        <h2 className="text-xl font- mb-4 text-muted-foreground">
          Compartilhe seu conhecimento com a comunidade
        </h2>

        <UpsertArticleForm />
      </div>
    </AppLayout>
  )
}
