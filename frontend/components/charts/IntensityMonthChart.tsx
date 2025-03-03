"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useData } from "../DataContext"

export function IntensityMonthChart() {
  const { data } = useData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data.monthly_intensity} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={70} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => [value, "Intensity"]} labelStyle={{ color: "black" }} contentStyle={{ backgroundColor: "white", color: "black" }} itemStyle={{ color: "black" }} />
        <Bar dataKey="intensity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}

