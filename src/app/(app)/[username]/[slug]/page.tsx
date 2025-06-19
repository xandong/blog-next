import { getArticleByPathAction } from "@/app/_actions/articles/get-article-by-path"
import { getCommentsByArticleAction } from "@/app/_actions/comments/get-comments-by-article"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/_ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/_ui/card"
import { AppLayout } from "@/components/layout/app-layout"
import { BackButton } from "@/components/misc/back-button"
import { Markdown } from "@/components/misc/markdown"
import { AuthorCard } from "@/components/users/author-card"
import Image from "next/image"

interface PageProps {
  params: { username: string; slug: string }
}

export default async function Page({ params }: PageProps) {
  const { username, slug } = params
  const { article } = await getArticleByPathAction({ username, slug })
  const { data: comments } = await getCommentsByArticleAction({
    articleId: article?.id
  })

  if (!article || !username || !slug) {
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

      <div className="w-full mx-auto pb-8 gap-8 flex lg:flex-row flex-col items-start">
        <Card className="max-w-[60rem] w-full">
          <CardContent>
            <h1 className="md:text-3xl text-xl font-bold text-gray-900 dark:text-white mb-2">
              {article.title}
            </h1>

            <div className="text-sm text-gray-500 mb-4">
              Publicado por {article.user.name} em{" "}
              {new Date(article.published_at).toLocaleDateString()}
            </div>

            {article.cover_image && (
              <div className="my-6 max-w-4xl w-full">
                <Image
                  src={article.cover_image}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            )}

            <div className="prose dark:prose-invert max-w-none">
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

      <div className="self-start w-[59rem] max-w-full flex flex-col gap-4">
        {comments && (
          <Card>
            <CardHeader>
              <CardTitle>
                {" "}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Comentários
                </h2>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id_code}>
                  <div className="flex flex-col gap-4 w-full bg-background p-4 rounded-xl border-secondary border-b">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          <Avatar>
                            <AvatarImage
                              src={comment.user.profile_image || ""}
                              alt={comment.user.name || ""}
                              width={40}
                              height={40}
                            />
                            <AvatarFallback>
                              {comment.user.name
                                ?.slice(0, 2)
                                .toLocaleUpperCase() || "UU"}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        <span className="font-medium text-sm text-foreground">
                          {comment.user.name}
                        </span>
                      </div>

                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="prose prose-sm dark:prose-invert max-w-none -mb-10 -mt-12">
                      <Markdown markdownContent={comment.body_html} />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
