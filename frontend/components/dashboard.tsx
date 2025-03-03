"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { DashboardContent } from "@/components/DashboardContent"
import { SidebarProvider } from "@/components/ui/sidebar"
import { FilterProvider } from "@/components/FilterContext"
import { DataProvider } from "@/components/DataContext"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <FilterProvider>
      <DataProvider>
        <SidebarProvider>
          <div className="w-full">
            <div className="flex min-h-screen">
              <DashboardSidebar />
              <div className="flex flex-col flex-1">
                <DashboardHeader />
                <DashboardContent isLoading={isLoading} />
              </div>
            </div>
          </div>
        </SidebarProvider>
      </DataProvider>
    </FilterProvider>
  )
}

