"use client"

import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useData } from "../DataContext"

export function IntensityYearChart() {
  const { data } = useData();

  return (
    <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data.yearly_intensity} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip labelStyle={{color: "black"}}/>
      <Area dataKey="intensity"/>
    </AreaChart>
  </ResponsiveContainer>
  )
}

