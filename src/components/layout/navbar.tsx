import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "../_ui/menubar"
import { LogoutButton } from "./logout-button"

export const Navbar = async () => {
  const user = {
    user_metadata: {
      firstName: "John",
      lastName: "Doe"
    }
  }

  const displayName = `${user?.user_metadata?.firstName} ${user?.user_metadata?.lastName}`

  return (
    <nav>
      <ul className="flex items-center gap-3">
        <li>{displayName}</li>
        <Menubar className="bg-transparent border-none focus:bg-transparent p-0 rounded-full">
          <MenubarMenu>
            <MenubarTrigger className="bg-transparent p-1 rounded-full">
              <div className="w-8 h-8 rounded-full bg-neutral-700" />
            </MenubarTrigger>

            <MenubarContent className="mr-4">
              <MenubarItem>
                <LogoutButton />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </ul>
    </nav>
  )
}
