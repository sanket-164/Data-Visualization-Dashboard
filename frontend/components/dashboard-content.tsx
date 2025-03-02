"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IntensityChart } from "@/components/charts/intensity-chart"
import { LikelihoodChart } from "@/components/charts/likelihood-chart"
import { RegionDistributionChart } from "@/components/charts/region-distribution-chart"
import { TopicTrendsChart } from "@/components/charts/topic-trends-chart"
import { SectorComparisonChart } from "@/components/charts/sector-comparison-chart"
import { CountryMapChart } from "@/components/charts/country-map-chart"
import { IntensityRelevanceAreachart } from "@/components/charts/intensity-relevance-areachart"
import { Skeleton } from "@/components/ui/skeleton"
import { useFilter } from "./filter-context"
import { useData } from "./DataContext"

interface DashboardContentProps {
  isLoading: boolean
}

export function DashboardContent({ isLoading }: DashboardContentProps) {
  const { data } = useData()

  return (
    <main className="p-4 md:p-6">
      <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-1">
        <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Insights</CardTitle>
              <CardDescription>Overall data points collected</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-12 w-24" /> : <div className="text-3xl font-bold">{data.stats.num_datapoints}</div>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Average Intensity</CardTitle>
              <CardDescription>Across all insights</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-12 w-24" /> : <div className="text-3xl font-bold">{data.stats.avg_intensity}</div>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Average Relevance</CardTitle>
              <CardDescription>Across all insights</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-12 w-24" /> : <div className="text-3xl font-bold">{data.stats.avg_relevance}</div>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Average Likelihood</CardTitle>
              <CardDescription>Probability assessment</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-12 w-24" /> : <div className="text-3xl font-bold">{data.stats.avg_likelihood}</div>}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Intensity by Published Months</CardTitle>
              <CardDescription>Average intensity across different published months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoading ? <Skeleton className="h-[300px] w-full" /> : <IntensityChart dataKey="month" />}
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Intensity by Published Year</CardTitle>
              <CardDescription>Average intensity across different published years</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoading ? <Skeleton className="h-[300px] w-full" /> : <IntensityChart dataKey="year" />}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Likelihood by Pestle</CardTitle>
              <CardDescription>Average Likelihood by Pestle</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoading ? <Skeleton className="h-[300px] w-full" /> : <LikelihoodChart />}
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Region Distribution</CardTitle>
              <CardDescription>Insights by geographical region</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoading ? <Skeleton className="h-[300px] w-full" /> : <RegionDistributionChart />}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Country Distribution</CardTitle>
            <CardDescription>Insights by country</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px]">
            {isLoading ? <Skeleton className="h-[500px] w-full" /> : <CountryMapChart />}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sector Comparison</CardTitle>
            <CardDescription>Intensity and relevance by sector</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px]">
            {isLoading ? <Skeleton className="h-[500px] w-full" /> : <SectorComparisonChart />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Topic Analysis</CardTitle>
            <CardDescription>Detailed breakdown by topic</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px]">
            {isLoading ? <Skeleton className="h-[500px] w-full" /> : <TopicTrendsChart />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Topic Analysis</CardTitle>
            <CardDescription>Detailed breakdown by topic</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px]">
            {isLoading ? <Skeleton className="h-[500px] w-full" /> : <IntensityRelevanceAreachart />}
          </CardContent>
        </Card>

      </div>

      {/* <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="intensity">Intensity Analysis</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          <TabsTrigger value="topics">Topic Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          
        </TabsContent>
        <TabsContent value="intensity" className="space-y-4">
          
        </TabsContent>
        <TabsContent value="regional" className="space-y-4">
          
        </TabsContent>
        <TabsContent value="topics" className="space-y-4">
          
        </TabsContent>
      </Tabs> */}
    </main>
  )
}

