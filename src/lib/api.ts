import axios from "axios"

import {
  ArticlesApi,
  CommentsApi,
  Configuration,
  TagsApi,
  UsersApi
} from "@/types/generated"
import { BaseAPI } from "@/types/generated/base"

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FOREM_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    accept: "application/vnd.forem.api-v1+json"
  }
})

const configuration = new Configuration({
  basePath: `${process.env.NEXT_PUBLIC_FOREM_BASE_URL}/api`,
  baseOptions: {
    headers: {
      "Content-Type": "application/json",
      accept: "application/vnd.forem.api-v1+json"
    }
  }
})

export const articlesApi = new ArticlesApi(configuration)
export const usersApi = new UsersApi(configuration)
export const tagsApi = new TagsApi(configuration)
export const commentsApi = new CommentsApi(configuration)
export const baseApi = new BaseAPI(configuration)
