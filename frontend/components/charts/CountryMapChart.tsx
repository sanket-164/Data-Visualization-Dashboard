"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useData } from "@/components/DataContext"

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
]

export function CountryMapChart() {
  const { data } = useData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data.country_data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={140}
          paddingAngle={2}
          dataKey="value"
          nameKey="country"
          label={({ country, percent }) => `${country}: ${(percent * 100).toFixed(0)}%`}
          labelLine={true}
        >
          {data.country_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, country) => [value, country]} />
      </PieChart>
    </ResponsiveContainer>
    // <ResponsiveContainer width="100%" height="100%">
    //   <BarChart data={data.country_data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
    //     <CartesianGrid strokeDasharray="3 3" vertical={false} />
    //     <XAxis dataKey="country" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={70} />
    //     <YAxis tick={{ fontSize: 12 }} />
    //     <Tooltip formatter={(value) => [`${value}`, "Intensity"]} />
    //     <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
    //   </BarChart>
    // </ResponsiveContainer>
  )
}

