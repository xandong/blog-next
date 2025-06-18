"use client"

import { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatDistance } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import {
  Heart,
  Clock,
  MoreVerticalIcon,
  EditIcon,
  UploadCloudIcon,
  MessageSquareIcon
} from "lucide-react"

import { ArticleIndex, ArticleMe, User } from "@/types/generated"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/_ui/card"
import { Badge } from "@/components/_ui/badge"
import { Button } from "@/components/_ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/_ui/menubar"
import { ConfirmationDialog } from "@/components/misc/confirmation-dialog"
import { updateArticleAction } from "@/app/_actions/articles/update-article"
import { ArchiveBoxIcon } from "@phosphor-icons/react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/_ui/avatar"

const ArticleMeta = ({
  icon: Icon,
  value,
  addon = null
}: {
  icon: React.ElementType
  value: React.ReactNode
  addon?: React.ReactNode
}) => (
  <div className="flex items-center gap-1 text-sm text-muted-foreground flex-nowrap cursor-default relative">
    {addon && <span>{addon}</span>}
    <Icon className="h-4 w-4" />
    <span className="text-nowrap">{value}</span>
  </div>
)

type Article = ArticleIndex & ArticleMe

interface ArticlePreviewProps {
  article: Article
  currentUser?: User | null
  // eslint-disable-next-line no-unused-vars
  onUpdateArticle: (article: Article) => void
}

export const ArticleItemPreview = ({
  article,
  currentUser,
  onUpdateArticle
}: ArticlePreviewProps) => {
  const [isUnpublishDialogOpen, setIsUnpublishDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isMyPost = useMemo(() => {
    return !!currentUser && article.user.username === currentUser?.username
  }, [article.user.username, currentUser])

  const isArchived = useMemo(() => {
    return article.published === false
  }, [article.published])

  const creationDate = useMemo(() => {
    return new Date(article.created_at || article.published_at)
  }, [article.created_at, article.published_at])

  const handleConfirmUnpublish = useCallback(async () => {
    setIsLoading(true)
    try {
      const { error } = await updateArticleAction({
        id: article.id.toString(),
        data: {
          article: {
            published: isArchived,
            title: article.title,
            description: article.description,
            body_markdown: article.body_markdown,
            tags: Array.isArray(article.tag_list)
              ? article.tag_list
              : [article.tag_list]
          }
        }
      })

      if (error) throw error

      onUpdateArticle({ ...article, published: isArchived })
      toast.success(
        `Artigo ${isArchived ? "publicado" : "arquivado"} com sucesso`
      )
    } catch (error) {
      toast.error(`Erro ao ${isArchived ? "publicar" : "arquivar"} artigo`)
      console.error({ error })
    } finally {
      setIsLoading(false)
      setIsUnpublishDialogOpen(false)
    }
  }, [article, isArchived, onUpdateArticle])

  const redirectLink = `${isMyPost ? `/draft/${article.id}` : `${article.user.username}/${article.slug}`}`

  return (
    <>
      <Card className="group flex w-4xl max-w-full h-full flex-col sm:flex-row overflow-hidden transition-shadow duration-300 group-hover:shadow-lg p-0">
        {article.cover_image && (
          <div className="sm:w-2/5 relative h-48 sm:h-auto">
            <Link href={redirectLink} className="flex">
              <Image
                loading="lazy"
                src={article.cover_image}
                alt={`Capa do artigo: ${article.title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 35vw"
                className="object-cover"
              />
            </Link>
          </div>
        )}

        <div className="flex flex-1 flex-col justify-between sm:w-3/5 py-4 ">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Avatar>
                  <AvatarImage
                    src={article.user.profile_image || ""}
                    alt={`Capa do artigo: ${article.user.name}`}
                  />
                  <AvatarFallback>
                    {article.user?.name?.charAt(0).toUpperCase() || "U"}
                    {article.user?.name?.split(" ")[1]
                      ? article.user?.name
                          ?.split(" ")[1]
                          .split("")[0]
                          .toUpperCase()
                      : article.user?.name?.charAt(1).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span>{article.user.name}</span>
              </div>

              <div className="flex items-center gap-1">
                {article.published === false && (
                  <Badge
                    variant="default"
                    className="whitespace-nowrap text-xs"
                  >
                    Rascunho
                  </Badge>
                )}

                <Badge
                  variant="secondary"
                  className="whitespace-nowrap text-xs"
                >
                  {formatDistance(creationDate, new Date(), { locale: ptBR })}{" "}
                  atrás
                </Badge>

                {isMyPost && (
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger asChild className="rounded-full">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className="w-6 h-6"
                        >
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </MenubarTrigger>

                      <MenubarContent className="mr-6 max-w-24 w-full">
                        {isArchived && (
                          <MenubarItem
                            onClick={handleConfirmUnpublish}
                            className="gap-0.5"
                          >
                            <UploadCloudIcon className="mr-2 h-4 w-4 " />
                            <span>Publicar</span>
                          </MenubarItem>
                        )}

                        {!isArchived && (
                          <>
                            <Link href={`/draft/${article.id}`}>
                              <MenubarItem className="gap-0.5">
                                <EditIcon className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </MenubarItem>
                            </Link>

                            <MenubarItem
                              onClick={() => setIsUnpublishDialogOpen(true)}
                              className="gap-0.5"
                            >
                              <ArchiveBoxIcon className="mr-2 h-4 w-4 " />
                              <span>Arquivar</span>
                            </MenubarItem>
                          </>
                        )}
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                )}
              </div>
            </div>
          </CardHeader>

          <Link href={redirectLink}>
            <CardContent>
              <CardTitle className="text-xl leading-tight group-hover:text-primary px-0">
                {article.title}
              </CardTitle>

              <CardDescription className="pt-1 line-clamp-3">
                {article.description}
              </CardDescription>
            </CardContent>
          </Link>

          <CardFooter className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between sm:items-end mt-4">
            <div className="flex items-center gap-4">
              <ArticleMeta
                icon={Clock}
                value={`${article.reading_time_minutes} min`}
              />
              <ArticleMeta
                icon={Heart}
                value={article.public_reactions_count}
              />

              <ArticleMeta
                icon={MessageSquareIcon}
                value={article.comments_count}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
              {article.tag_list.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[.6rem]">
                  {tag.toLocaleUpperCase()}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </div>
      </Card>

      <ConfirmationDialog
        title={`Tem certeza que deseja arquivar o artigo "${article.title}"?`}
        description={
          "Isso fará com que você não possa mais editar o artigo na nossa plataforma."
        }
        loading={isLoading}
        onConfirm={handleConfirmUnpublish}
        open={isUnpublishDialogOpen}
        setOpen={setIsUnpublishDialogOpen}
      />
    </>
  )
}
