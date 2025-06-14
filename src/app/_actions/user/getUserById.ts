"use server"

import { api } from "@/lib/api"
import { getSession } from "@/lib/session"
import { User } from "@/types/generated"

interface GetUserByIdActionParams {
  username?: string
}

export const getUserByIdAction = async (
  params: GetUserByIdActionParams
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ data?: User; error?: string }> => {
  const { apiKey } = await getSession()
  const { username } = params

  if (!username) {
    return {
      error: "Usuário não informado."
    }
  }

  try {
    const response = await api.get(`users/by_username?url=${username}`, {
      headers: {
        "api-key": apiKey ? apiKey : ""
      }
    })

    return { data: response.data }
  } catch (error) {
    console.error(error)
    return {
      error: "Erro ao buscar usuário."
    }
  }
}
/**
 *
 *
 * ownerUser: {
    data: {
      type_of: 'user',
      id: 8745,
      username: 'jarvisscript',
      name: 'Chris Jarvis',
      twitter_username: null,
      github_username: 'ClJarvis',
      email: null,
      summary: 'Fullstack developer with a passion for UX. @jarvisscript@hachyderm.io',
      location: 'Nashville',
      website_url: 'http://christopherleejarvis.com',
      joined_at: 'Mar  5, 2017',
      profile_image: 'https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F8745%2Fb3ae281e-3062-4dd9-93f1-22e75a85484e.jpg',
      badge_ids: [Array]
    }
  }
 */
