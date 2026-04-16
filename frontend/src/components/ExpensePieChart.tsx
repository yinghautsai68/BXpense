import { Pie, ResponsiveContainer, Tooltip, PieChart, Cell } from 'recharts';

type ExpensePieChartProps = {
    data: {
        name: string,
        value: number
    }[],
    colors?: string[]
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const ExpensePieChart = ({ data, colors = DEFAULT_COLORS }: ExpensePieChartProps) => {

    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    label={({ percent = 0 }) => `${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                    outerRadius={50}
                >
                    {data.map((data, index) => (
                        <Cell key={index} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default ExpensePieChart