"use client"

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { useData } from "../DataContext"
export function TopicTrendsChart() {
  const { data } = useData();

  const uniqueTopics = [
    ...new Set(data.topic_trends.flatMap(obj => Object.keys(obj).filter(key => key !== "year")))
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.topic_trends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        {uniqueTopics.map((entry, index) => (
          <Line type="monotone" dataKey={entry} stroke={`hsl(var(--chart-${(index + 1) % 8}))`} activeDot={{ r: 6 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

