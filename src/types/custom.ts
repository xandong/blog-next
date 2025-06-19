import { ArticleIndex, ArticleMe } from "./generated"

export type Article = ArticleIndex &
  ArticleMe & {
    tags: string[]
  }
