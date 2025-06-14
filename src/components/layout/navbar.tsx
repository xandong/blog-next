import Image from "next/image"

import { getSession } from "@/lib/session"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "../_ui/menubar"
import { ToggleTheme } from "../misc/toggle-theme"
import { LogoutButton } from "./logout-button"
import { SignIn } from "./sign-in"

export const Navbar = async () => {
  const { user } = await getSession()

  const firstNameFirstLetter =
    user?.name?.split(" ")[0].split("")[0] || "Usuário"
  const lastNameFirstLetter = user?.name?.split(" ")[1].split("")[0] || ""

  const url =
    user?.profile_image ||
    `https://ui-avatars.com/api/?name=${firstNameFirstLetter}%20${lastNameFirstLetter}`

  return (
    <nav>
      <ul className="flex items-center gap-2">
        {user ? (
          <>
            <li>{user.name || "Unknown"}</li>
            <Menubar className="bg-transparent border-none focus:bg-transparent p-0 rounded-full">
              <MenubarMenu>
                <MenubarTrigger className="bg-transparent p-1 rounded-full">
                  <Image
                    src={url}
                    alt={user.name || "User Avatar"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </MenubarTrigger>

                <MenubarContent className="mr-4">
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

        <ToggleTheme />
      </ul>
    </nav>
  )
}
