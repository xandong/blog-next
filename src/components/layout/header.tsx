import Link from "next/link"

import { Navbar } from "./navbar"
import Image from "next/image"

export const Header = async () => {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <div>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-sm.png" alt="S4Us" width={48} height={48} />
          <span className="font-bold text-primary text-2xl">Share4us</span>
        </Link>
      </div>

      <Navbar />
    </header>
  )
}
