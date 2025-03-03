"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface FilterContextType {
  filters: Record<string, string[]>
  selectedFilters: Record<string, string[]>
  toggleFilter: (key: string, value: string) => void
  replaceSelectedFilters: (replaceFilters: Record<string, string[]>) => void
  clearFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  // Mock filter options - in a real app, these would come from the API
  const [filters, setFilters] = useState<Record<string, string[]>>({})

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  // In a real app, this would fetch filter options from the API
  useEffect(() => {
    // Simulating API call to get filter options
    const fetchFilters = async () => {
      try {

        const response = await fetch('http://127.0.0.1:5000/filters/unique')
        const data = await response.json()

        for (const key in data) {
          data[key].sort()
        }
        
        setFilters(data)
        
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          end_year: data["end_year"].slice(0, 2),
        }));
      } catch (error) {
        console.error("Failed to fetch filters:", error)
      }
    }

    fetchFilters()
  }, [])

  const toggleFilter = (key: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[key] || []
      const updated = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]

      return {
        ...prev,
        [key]: updated,
      }
    })

    console.log(selectedFilters)
  }

  const replaceSelectedFilters = (replaceFilters: Record<string, string[]>) => {
    setSelectedFilters(replaceFilters)
  }

  const clearFilters = () => {
    setSelectedFilters({});
  }

  return (
    <FilterContext.Provider value={{ filters, selectedFilters, replaceSelectedFilters, toggleFilter, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider")
  }
  return context
}

