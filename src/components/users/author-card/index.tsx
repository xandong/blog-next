"use client"

import Link from "next/link"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { BrowserIcon, GithubLogoIcon, XLogoIcon } from "@phosphor-icons/react"

import { User } from "@/types/generated"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/_ui/card"
import { useEffect, useState } from "react"
import { getUserByIdAction } from "@/app/_actions/users/getUserById"
import { Skeleton } from "@/components/_ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/_ui/avatar"

export const AuthorCard = ({ username }: { username: string }) => {
  const [loading, setLoading] = useState(true)
  const [author, setAuthor] = useState<User | null>(null)

  useEffect(() => {
    if (author) return

    getUserByIdAction({ username: username })
      .then(({ data }) => {
        if (data) {
          setAuthor(data)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [author, username])

  if (loading) return <AuthorCardSkeleton />

  if (!author) return null

  return (
    <Card className="w-full h-fit">
      <CardHeader className="flex flex-col items-center text-center">
        <Avatar className="w-20 h-20">
          <AvatarImage
            loading="lazy"
            src={author.profile_image}
            alt={author.name}
          />
          <AvatarFallback className="text-4xl">
            {author.name.split(" ")[0][0].toLocaleUpperCase()}
            {author.name.split(" ")[1][0].toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>

        <h3 className="text-xl font-semibold">{author.name}</h3>
        <span className="text-sm text-muted-foreground">
          @{author.username}
        </span>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        {author.summary && (
          <p className="text-muted-foreground">{author.summary}</p>
        )}

        {author.location && (
          <p>
            <span className="font-medium text-muted-foreground">Origem:</span>{" "}
            {author.location}
          </p>
        )}

        <p>
          <span className="font-medium text-muted-foreground">
            Membro desde:
          </span>{" "}
          {format(author.joined_at, "yyyy", {
            locale: ptBR
          })}
        </p>

        <CardFooter className="flex gap-8 pt-2 lg:justify-center justify-end">
          {author.website_url && (
            <Link
              href={author.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary items-center flex flex-col"
            >
              <BrowserIcon size={20} />
              <span>Website</span>
            </Link>
          )}

          {author.github_username && (
            <Link
              href={`https://github.com/${author.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary items-center flex flex-col"
            >
              <GithubLogoIcon size={20} />

              <span>Github</span>
            </Link>
          )}

          {author.twitter_username && (
            <Link
              href={`https://twitter.com/${author.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary items-center flex flex-col"
            >
              <XLogoIcon size={20} />

              <span>Twitter</span>
            </Link>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export const AuthorCardSkeleton = () => {
  return (
    <div className="w-full h-72 bg-card rounded-lg p-4 py-6">
      <div className="flex flex-col items-center text-center">
        <Skeleton className="w-20 h-20 rounded-full" />
      </div>

      <div className="flex flex-col gap-2 mt-6 items-center">
        <Skeleton className="w-[60%] h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
      </div>

      <div className="mt-4 flex gap-6 justify-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    </div>
  )
}
