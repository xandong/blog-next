"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"

import { User } from "@/types/generated"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "../_ui/menubar"
import { ToggleTheme } from "../misc/toggle-theme"
import { LogoutButton } from "./logout-button"
import { SignIn } from "./sign-in"

export const Navbar = ({ user }: { user: User | undefined }) => {
  const { firstNameFirstLetter, lastNameFirstLetter } = useMemo(() => {
    const firstNameFirstLetter =
      user?.name?.split(" ")[0].split("")[0] || "Usuário"
    const lastNameFirstLetter = user?.name?.split(" ")[1].split("")[0] || ""

    return {
      firstNameFirstLetter,
      lastNameFirstLetter
    }
  }, [user])

  const url = useMemo(
    () =>
      user?.profile_image ||
      `https://ui-avatars.com/api/?name=${firstNameFirstLetter}%20${lastNameFirstLetter}`,
    [user, firstNameFirstLetter, lastNameFirstLetter]
  )

  return (
    <nav>
      <ul className="flex items-center gap-1">
        <ToggleTheme />

        {user ? (
          <>
            <Menubar className="bg-transparent border-none focus:bg-transparent p-0 rounded-full">
              <MenubarMenu>
                <MenubarTrigger className="bg-transparent p-1 rounded-full">
                  <Image
                    loading="lazy"
                    src={url}
                    alt={user.name || "User Avatar"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </MenubarTrigger>

                <MenubarContent className="mr-4 max-w-56">
                  <div className="p-2">
                    <span className="text-wrap">Olá, {user.name}</span>
                  </div>

                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/create">Criar Publicação</Link>
                  </MenubarItem>

                  <MenubarItem>
                    <Link href="/me">Meus artigos</Link>
                  </MenubarItem>

                  <MenubarItem asChild disabled>
                    <Link aria-disabled href="#">
                      Configurações
                    </Link>
                  </MenubarItem>

                  <MenubarItem>
                    <LogoutButton />
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </>
        ) : (
          <SignIn />
        )}
      </ul>
    </nav>
  )
}
