"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useData } from "../DataContext"

export function SectorComparisonChart() {
  const { data } = useData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data.intensity_relevance} margin={{ top: 20, right: 30, left: 20, bottom: 30 }} barGap={0} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sector" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={70} />
        <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
        <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
        <Tooltip labelStyle={{ color: "black" }} contentStyle={{ backgroundColor: "white", color: "black", border: "1px solid #ccc" }} itemStyle={{ color: "black" }} />
        <Legend />
        <Bar yAxisId="left" dataKey="intensity" fill="hsl(var(--chart-1))" name="Intensity" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="relevance" fill="hsl(var(--chart-2))" name="Relevance" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

