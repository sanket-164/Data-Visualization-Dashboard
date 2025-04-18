"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useFilter } from "@/components/FilterContext"

interface DataContextType {
    data: {
        stats: {
            num_datapoints: number,
            avg_intensity: number,
            avg_relevance: number,
            avg_likelihood: number
        }
        monthly_intensity: any,
        yearly_intensity: any,
        intensity_relevance: any,
        pestle_likelihood: any,
        region_distribution: any,
        country_data: any,
        topic_trends: any,
        irl_yearly_comparison: any,
    }
    getFilteredData: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
    const { selectedFilters } = useFilter()
    const [data, setData] = useState({
        stats: {
            num_datapoints: 0,
            avg_intensity: 0,
            avg_relevance: 0,
            avg_likelihood: 0,
        },
        monthly_intensity: [],
        yearly_intensity: [],
        intensity_relevance: [],
        pestle_likelihood: [],
        region_distribution: [],
        country_data: [],
        topic_trends: [],
        irl_yearly_comparison: []
    })

    const toQueryString = (params: Record<string, string[]>) => {
        return new URLSearchParams(
            Object.entries(params).flatMap(([key, values]) =>
                values.map((value) => [key, value])
            )
        ).toString()
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/filters/data?${toQueryString(selectedFilters)}`)
                const fetchedData = await response.json()

                setData(fetchedData)
            } catch (error) {
                console.error("Failed to fetch data:", error)
            }
        }

        fetchData();
    }, [selectedFilters])

    // This function is not used right now but can be used when we want to add an extra filter button
    const getFilteredData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/filters/data?${toQueryString(selectedFilters)}`)
            const filteredData = await response.json()
            
            setData(filteredData)
        } catch (error) {
            console.error("Failed to fetch filtered data:", error)
        }
    }

    return (
        <DataContext.Provider value={{ data, getFilteredData }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider")
    }
    return context
}