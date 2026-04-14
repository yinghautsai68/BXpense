import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const ExpenseChart = () => {
    const data = [
        { date: "04-10", amount: 200 },
        { date: "04-11", amount: 150 },
        { date: "04-12", amount: 300 },
    ];
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