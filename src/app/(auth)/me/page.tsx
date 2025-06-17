import { getSession } from "@/lib/session"
import { getMyArticlesListAction } from "@/app/_actions/users/get-my-articles-list"
import { AppLayout } from "@/components/layout/app-layout"
import { BackButton } from "@/components/misc/back-button"
import { MePage } from "@/components/layout/pages/me-page"

export default async function Page() {
  const { user } = await getSession()
  const { data: articles } = await getMyArticlesListAction({})

  return (
    <AppLayout>
      <div className="w-full">
        <BackButton />
      </div>

      <MePage initialArticles={articles || []} user={user} />
    </AppLayout>
  )
}
