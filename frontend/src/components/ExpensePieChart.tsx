import React from 'react'
import { Pie, ResponsiveContainer, Tooltip, PieChart, Cell } from 'recharts';

const ExpensePieChart = () => {
    const data = [
        { name: "Food", value: 80 },
        { name: "Commute", value: 20 },
        { name: "Drinks", value: 10 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    label={({ percent = 0 }) => `${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                >
                    {data.map((data, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default ExpensePieChart