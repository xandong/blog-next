import { ArticlesApi, Configuration, UsersApi } from "@/types/generated"
import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FOREM_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/vnd.forem.api-v1+json"
  }
})

const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_FOREM_BASE_URL,
  baseOptions: {
    headers: {
      "Content-Type": "application/json",
      accept: "application/vnd.forem.api-v1+json"
    }
  }
})

export const articlesApi = new ArticlesApi(configuration)
export const usersApi = new UsersApi(configuration)
