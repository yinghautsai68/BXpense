import React, { useEffect, useState } from 'react'
import ExpenseCard from '../components/ExpenseCard'
import { getTopExpenseRecords } from '../services/records.service';
import { useAuth } from '../context/AuthContext';
import type { RecordType } from '../types/records.type';
import ExpenseChart from '../components/ExpenseChart';
import ExpensePieChart from '../components/ExpensePieChart';
import { getCategorySummary, getLine } from '../services/analytics.service';
import Card from '../components/Card';
import { categoryZhTW } from '../constants/categoryZhTW';

const Analysis = () => {
    const { token } = useAuth();
    const [topExpenses, setTopExpenses] = useState<RecordType[]>([]);
    const [line, setLine] = useState([]);
    const [categorySummary, setCategorySummary] = useState([]);


    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchLine = async () => {
            try {
                const data = await getLine(token);
                console.log(data);
                setLine(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLine();
    }, [token])


    const totalAmount = categorySummary.reduce((sum, item) => sum + Number(item.total_amount), 0);
    const getPercent = (amount: number) => {
        return ((amount / totalAmount) * 100).toFixed(2);
    }



    const [pieData, setPieData] = useState([]);
    useEffect(() => {

        let pie = categorySummary.map((item, index) => (
            {
                name: categoryZhTW[item.name],
                value: Number(item.total_amount)
            }
        ));
        setPieData(pie);
    }, [categorySummary]);

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchCategorySummary = async () => {
            try {
                const data = await getCategorySummary(token);
                console.log(data);
                setCategorySummary(data);

            } catch (error) {
                console.error(error);
            }
        }
        fetchCategorySummary();
    }, [token]);

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchTopExpenseRecords = async () => {
            try {
                const data = await getTopExpenseRecords(token);
                console.log(data);
                setTopExpenses(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTopExpenseRecords();
    }, [token]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <>
            <div className='flex flex-row items-center'>
                <button>支出</button>
                <button>支出</button>
            </div>

            <Card className='w-full h-[230px] bg-white'>
                <span className='text-xs font-bold'>支出：NT${totalAmount}</span>
                <ExpenseChart data={line}></ExpenseChart>
            </Card>
            <Card>
                <div className='w-full h-[180px] bg-white'>
                    <ExpensePieChart data={pieData} colors={COLORS} />
                </div>
                <div className='flex flex-col  gap-5 w-full'>
                    {
                        categorySummary.map((category, index) => (
                            <div key={index} className='flex flex-row  items-center gap-2 w-full '>
                                <img src={category.image_url} alt='category_img' className='w-10 aspect-square p-2  rounded-full bg-gray-100' />
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-row'>
                                        <div className='flex flex-col'>
                                            <div className='flex-1 flex flex-row items-center gap-1 text-sm font-bold'>
                                                <span>{index + 1}</span>
                                                <span>{categoryZhTW[category.name]}</span>
                                            </div>
                                            <span className='text-xs'>{getPercent(category.total_amount)}</span>
                                        </div>
                                        <div className='flex-2 flex flex-col items-end text-xs'>
                                            <span className='text-end font-bold'>-NT$ {category.total_amount}</span>
                                            <span>{category.count}筆</span>
                                        </div>
                                    </div>
                                    <div className='w-full h-2 rounded-xl bg-gray-200'>
                                        <div style={{
                                            width: `${getPercent(Number(category.total_amount))}%`,
                                            backgroundColor: COLORS[index % COLORS.length]
                                        }} className={`h-2 rounded-xl `}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Card>
            <div className='flex flex-col w-full p-4 bg-white rounded-xl '>
                <div className='flex flex-row justify-between items-center'>
                    <span>單筆金額排行</span>
                    <span>TOP 10</span>
                </div>
                <div className='flex flex-col w-full  bg-white '>
                    {
                        topExpenses.map((expense, index) => (
                            <ExpenseCard key={expense.id} record={expense}></ExpenseCard>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Analysis