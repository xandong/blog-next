import { CreateArticleForm } from "@/components/articles/create-article-form"
import { AppLayout } from "@/components/layout/app-layout"

export default async function Page() {
  return (
    <AppLayout>
      <h1>Crie um artigo sobre o que quiser</h1>
      <CreateArticleForm />
    </AppLayout>
  )
}
