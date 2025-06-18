import Link from "next/link"

import { getSession } from "@/lib/session"
import { getMyArticlesListAction } from "@/app/_actions/users/get-my-articles-list"

import { AppLayout } from "@/components/layout/app-layout"
import { MePage } from "@/components/pages/me-page"
import { Button } from "@/components/_ui/button"
import { BackButton } from "@/components/misc/back-button"

export default async function Page() {
  const { user } = await getSession()
  const { data: articles } = await getMyArticlesListAction({})

  console.log({ users: articles?.map((a) => a.user) })
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
