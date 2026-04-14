import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type ExpenseChartProps = {
    data: Record<string, number>[]
}
const ExpenseChart = ({ data }: ExpenseChartProps) => {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} >
                <CartesianGrid strokeDasharray='10 10' />
                <XAxis height={10} tick={{ fontSize: 10 }} dataKey="date" />
                <YAxis width={25} tick={{ fontSize: 10 }} />
                <Line dataKey='amount' type='monotone' strokeWidth={3} stroke='orange' />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer >
    )
}

export default ExpenseChart