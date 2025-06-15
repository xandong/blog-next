import Link from "next/link"

import { Navbar } from "./navbar"
import Image from "next/image"

import { getSession } from "@/lib/session"
import { SearchComponent } from "../misc/search-component"

export const Header = async () => {
  const { user } = await getSession()

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 sticky top-0 left-0 right-0 bg-background shadow-md z-10">
      <div className="mr-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            loading="lazy"
            src="/logo.png"
            alt="S4Us"
            width={48}
            height={48}
          />
          <span className="sm:block hidden font-bold text-primary text-2xl">
            Share4us
          </span>
        </Link>
      </div>

      <SearchComponent />

      <Navbar user={user} />
    </header>
  )
}
