import Image from "next/image"
import Link from "next/link"
import { Navbar } from "./navbar"

export const Header = async () => {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <div>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
        </Link>
      </div>

      <Navbar />
    </header>
  )
}
