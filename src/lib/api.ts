import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FOREM_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/vnd.forem.api-v1+json"
  }
})
