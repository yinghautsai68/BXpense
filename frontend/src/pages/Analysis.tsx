import React, { useEffect, useState } from 'react'
import ExpenseCard from '../components/ExpenseCard'
import { getTopExpenseRecords } from '../services/records.service';
import { useAuth } from '../context/AuthContext';
import type { RecordType } from '../types/records.type';

const Analysis = () => {
    const { token } = useAuth();
    const [topExpenses, setTopExpenses] = useState<RecordType[]>([]);
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
    return (
        <>
            <div className='flex flex-row items-center'>
                <button>支出</button>
                <button>支出</button>
            </div>

            <div className='w-full h-[180px] bg-white'>

            </div>

            <div className='w-full h-[180px] bg-white'>

            </div>

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