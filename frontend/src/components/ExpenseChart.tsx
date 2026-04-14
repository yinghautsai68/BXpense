import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type ExpenseChartProps = {
    data: Record<string, number>[]
}
const ExpenseChart = ({ data }: ExpenseChartProps) => {

    return (
        <ResponsiveContainer>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray='10 10' />
                <XAxis label={{ value: '日期', position: 'insideBottom', offset: -5 }} dataKey="date" />
                <YAxis label={{ value: 'amount', position: 'insideLeft', angle: -90 }} />
                <Line dataKey='amount' type='monotone' strokeWidth={3} stroke='orange' />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default ExpenseChart