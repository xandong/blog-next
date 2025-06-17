import Link from "next/link"

import { getSession } from "@/lib/session"
import { getMyArticlesListAction } from "@/app/_actions/users/get-my-articles-list"

import { MePage } from "@/components/layout/pages/me-page"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/_ui/button"
import { BackButton } from "@/components/misc/back-button"

export default async function Page() {
  const { user } = await getSession()
  const { data: articles } = await getMyArticlesListAction({})

  return (
    <AppLayout>
      <div className="w-full flex justify-between items-center">
        <BackButton />

        <Link href="/create">
          <Button>
            <span className="text-sm">Criar Artigo</span>
          </Button>
        </Link>
      </div>

      <MePage initialArticles={articles || []} user={user} />
    </AppLayout>
  )
}
