"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useData } from "../DataContext"

export function IntensityChart({ dataKey }: { dataKey: string }) {
  const { data } = useData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={(dataKey === "month") ? data.monthly_intensity : data.yearly_intensity} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={dataKey} tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={70} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => [`${value}`, "Intensity"]} />
        <Bar dataKey="intensity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}

