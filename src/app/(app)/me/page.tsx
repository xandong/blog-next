import { CreateArticleForm } from "@/components/articles/create-article-form"
import { AppLayout } from "@/components/layout/app-layout"

export default async function Page() {
  return (
    <AppLayout>
      <h1>Meus artigos</h1>
      <CreateArticleForm />
    </AppLayout>
  )
}
