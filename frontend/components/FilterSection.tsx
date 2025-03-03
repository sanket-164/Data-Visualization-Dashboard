"use client"

import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useFilter } from "@/components/FilterContext"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

interface FilterSectionProps {
  title: string
  filterKey: string
  options: string[]
}

export function FilterSection({ title, filterKey, options }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { selectedFilters, toggleFilter } = useFilter()

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {options.length > 5 && (
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2 h-8"
          />
        )}
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {filteredOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`${filterKey}-${option}`}
                  checked={selectedFilters[filterKey]?.includes(option)}
                  onChange={() => toggleFilter(filterKey, option)}
                  className="h-4 w-4 accent-primary cursor-pointer"
                />
                <label htmlFor={`${filterKey}-${option}`} className="text-sm cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
            {filteredOptions.length === 0 && <div className="text-sm text-muted-foreground py-2">No options found</div>}
          </div>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  )
}

