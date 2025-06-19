/* eslint-disable no-unused-vars */
"use client"

import * as React from "react"
import { ChevronsUpDown, Check, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/_ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/_ui/popover"
import { Input } from "@/components/_ui/input"
import { Badge } from "../_ui/badge"

interface MultiSelectProps {
  initialData: string[]
  label?: string
  list: { value: string; label: string; color?: string; bgColor?: string }[]
  onChange: (value: string[]) => void
  maxSelections?: number
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      list,
      label = "Selecione as opções...",
      onChange,
      maxSelections = 3,
      initialData = []
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(initialData)
    const [searchValue, setSearchValue] = React.useState("")

    const filteredList = React.useMemo(() => {
      if (!searchValue) return list
      const term = searchValue.toLowerCase()
      return list.filter((item) => item.label.toLowerCase().includes(term))
    }, [list, searchValue])

    const handleSelect = (value: string) => {
      let newSelectedValues: string[] = []
      if (selectedValues.includes(value)) {
        newSelectedValues = selectedValues.filter((v) => v !== value)
      } else if (selectedValues.length < maxSelections) {
        newSelectedValues = [...selectedValues, value]
      } else {
        return
      }
      setSelectedValues(newSelectedValues)
      onChange(newSelectedValues)
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[240px] justify-between truncate"
          >
            {label}
            <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <div className="flex gap-2 items-center flex-wrap">
          {selectedValues.map((value) => {
            const match = list.find((item) => item.value === value)
            if (!match) return null
            return (
              <Badge
                key={value}
                variant="default"
                style={{
                  borderColor: `${match.bgColor}D0`,
                  backgroundColor: `${match.bgColor}A9`,
                  color: match.color
                }}
                className="px-2 py-1 rounded-sm flex items-center gap-2"
              >
                {match.label}
                <button className="p-1" onClick={() => handleSelect(value)}>
                  <XIcon size={14} />
                </button>
              </Badge>
            )
          })}
        </div>

        <PopoverContent className="w-[240px] p-2 space-y-2">
          <Input
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="max-h-60 overflow-auto space-y-1">
            {filteredList.length === 0 && (
              <div className="text-sm text-muted-foreground px-2 py-1">
                Nenhuma opção encontrada.
              </div>
            )}
            {filteredList.map((item) => (
              <div
                key={item.value}
                className={cn(
                  "flex items-center px-2 py-1 cursor-pointer rounded-sm hover:bg-muted",
                  selectedValues.includes(item.value) && "bg-muted"
                )}
                onClick={() => handleSelect(item.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedValues.includes(item.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)

MultiSelect.displayName = "MultiSelect"
