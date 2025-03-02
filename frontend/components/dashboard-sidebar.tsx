"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { BarChart3, Filter, SquareX } from "lucide-react"
import { FilterSection } from "@/components/filter-section"
import { useFilter } from "@/components/filter-context"
import { useData } from "@/components/DataContext"

export function DashboardSidebar() {
  const { filters, clearFilters } = useFilter()
  const { getFilteredData } = useData()

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2">
          <BarChart3 className="h-6 w-6" />
          <h1 className="font-semibold text-2xl">BlackCoffer</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <FilterSection title="End Year" filterKey="end_year" options={filters.end_year || []} />
            <FilterSection title="Topics" filterKey="topic" options={filters.topic || []} />
            <FilterSection title="Sector" filterKey="sector" options={filters.sector || []} />
            <FilterSection title="Region" filterKey="region" options={filters.region || []} />
            <FilterSection title="PEST" filterKey="pestle" options={filters.pestle || []} />
            <FilterSection title="Source" filterKey="source" options={filters.source || []} />
            <FilterSection title="Country" filterKey="country" options={filters.country || []} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={getFilteredData}>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="text-xs">Apply Filters</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton onClick={clearFilters}>
              <div className="flex items-center gap-2">
                <SquareX className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Clear Selection</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

