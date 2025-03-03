"use client"

import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { useData } from "@/components/DataContext"

export function IntensityRelevanceLikelihoodAreachart() {
    const { data } = useData();

    return (
        <ResponsiveContainer>
            <AreaChart
                accessibilityLayer
                data={data.irl_yearly_comparison}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="published_year"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", padding: "10px" }}
                    labelStyle={{ color: "black" }}
                    cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                />
                <Area
                    dataKey="intensity"
                    type="natural"
                    fill="#FF5733"
                    fillOpacity={0.4}
                    stroke="#C70039"
                    stackId="a"
                />
                <Area
                    dataKey="relevance"
                    type="natural"
                    fill="#3498DB"
                    fillOpacity={0.4}
                    stroke="#21618C"
                    stackId="a"
                />
                <Area
                    dataKey="likelihood"
                    type="natural"
                    fill="#2ECC71"
                    fillOpacity={0.4}
                    stroke="#186A3B"
                    stackId="a"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}