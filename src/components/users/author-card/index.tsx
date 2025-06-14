"use client"

import Link from "next/link"
import Image from "next/image"
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

export const AuthorCard = ({ author }: { author: User }) => {
  return (
    <Card className="w-full h-fit">
      <CardHeader className="flex flex-col items-center text-center">
        <Image
          src={author.profile_image}
          alt={author.name}
          width={80}
          height={80}
          className="rounded-full mb-3"
        />
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

        <CardFooter className="flex gap-8 pt-2 justify-end">
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
