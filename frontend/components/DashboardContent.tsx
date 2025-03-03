"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IntensityMonthChart } from "@/components/charts/IntensityMonthChart"
import { IntensityYearChart } from "@/components/charts/IntensityYearChart"
import { LikelihoodChart } from "@/components/charts/LikelihoodChart"
import { RegionDistributionChart } from "@/components/charts/RegionDistributionChart"
import { TopicTrendsChart } from "@/components/charts/TopicTrendsChart"
import { SectorComparisonChart } from "@/components/charts/SectorComparisonChart"
import { CountryMapChart } from "@/components/charts/CountryMapChart"
import { IntensityRelevanceLikelihoodAreachart } from "@/components/charts/IRLAreaChart"
import { Skeleton } from "@/components/ui/skeleton"
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
              {isLoading ? <Skeleton className="h-[300px] w-full" /> : <IntensityMonthChart />}
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Intensity by Published Year</CardTitle>
              <CardDescription>Average intensity across different published years</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoading ? <Skeleton className="h-[300px] w-full" /> : <IntensityYearChart />}
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
            <CardTitle>IRL Analysis</CardTitle>
            <CardDescription>Average Intensity, Relevance, Likelihood year wise</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px]">
            {isLoading ? <Skeleton className="h-[500px] w-full" /> : <IntensityRelevanceLikelihoodAreachart />}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

