"use client"

import { SearchIcon, XIcon } from "lucide-react"

import { Input } from "../_ui/input"
import { useState } from "react"
import { Button } from "../_ui/button"

export const SearchComponent = () => {
  const [activeSearchMobile, setActiveSearchMobile] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className="flex-1 flex items-center gap-2 md:justify-start justify-end">
      <div className="hidden md:block max-w-96 w-full">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Pesquise pelos assuntos que mais lhe interessam"
          endIcon={<SearchIcon size={20} color="gray" />}
        />
      </div>

      <div className="md:hidden flex">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setActiveSearchMobile(true)}
        >
          <SearchIcon size={18} />
        </Button>

        {activeSearchMobile && (
          <div className="flex absolute top-0 left-0 w-full bg-background h-full z-10 items-center justify-center px-2">
            <Input
              autoFocus
              placeholder="Pesquise pelos assuntos que mais lhe interessam"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              endIcon={
                <button
                  onClick={() =>
                    searchValue === "" && setActiveSearchMobile(false)
                  }
                >
                  {searchValue === "" ? (
                    <XIcon size={20} color="gray" />
                  ) : (
                    <SearchIcon size={20} color="gray" />
                  )}
                </button>
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
