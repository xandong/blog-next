import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/_ui/card"
import { Badge } from "@/components/_ui/badge"
import { ArticleIndex, ArticleMe } from "@/types/generated"
import Image from "next/image"
import Link from "next/link"
import { formatDistance } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { Heart, Clock } from "lucide-react"

const ArticleMeta = ({
  icon: Icon,
  value
}: {
  icon: React.ElementType
  value: React.ReactNode
}) => (
  <div className="flex items-center gap-1 text-sm text-muted-foreground flex-nowrap">
    <Icon className="h-4 w-4" />
    <span className="text-nowrap">{value}</span>
  </div>
)

type Article = ArticleIndex & ArticleMe

export const ArticleItemPreview = ({ article }: { article: Article }) => {
  const createdAt = new Date(article.created_at || article.published_at)

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group block w-4xl max-w-full"
    >
      <Card className="flex h-full flex-col sm:flex-row overflow-hidden transition-shadow duration-300 group-hover:shadow-lg p-0">
        {article.cover_image && (
          <div className="sm:w-2/5 relative h-48 sm:h-auto">
            <Image
              loading="lazy"
              aria-multiline
              src={article.cover_image}
              alt={`Capa do artigo: ${article.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 35vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col justify-between sm:w-3/5 py-4 ">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Image
                  loading="lazy"
                  src={article.user.profile_image_90 || ""}
                  alt={article.user.name || ""}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{article.user.name}</span>
              </div>

              <Badge variant="secondary" className="whitespace-nowrap text-xs">
                {formatDistance(createdAt, new Date(), { locale: ptBR })} atrás
              </Badge>
            </div>

            <CardTitle className="text-xl leading-tight group-hover:text-primary px-0">
              {article.title}
            </CardTitle>

            <CardDescription className="pt-1 line-clamp-3">
              {article.description}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between sm:items-end mt-1">
            <div className="flex items-center gap-4">
              <ArticleMeta
                icon={Clock}
                value={`${article.reading_time_minutes} min`}
              />
              <ArticleMeta
                icon={Heart}
                value={article.public_reactions_count}
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
    </Link>
  )
}
