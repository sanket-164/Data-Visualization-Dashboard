"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { sector: "Energy", Intensity: 6.2, Relevance: 2.5 },
    { sector: "Environment", Intensity: 5.8, Relevance: 3.2 },
    { sector: "Government", Intensity: 4.5, Relevance: 2.8 },
    { sector: "Manufacturing", Intensity: 5.1, Relevance: 2.3 },
    { sector: "Financial services", Intensity: 3.9, Relevance: 2.1 },
    { sector: "Technology", Intensity: 4.7, Relevance: 3.5 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function IntensityRelevanceAreachart() {
    return (
        <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="sector"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                    dataKey="Intensity"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                />
                <Area
                    dataKey="Relevance"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    )
}