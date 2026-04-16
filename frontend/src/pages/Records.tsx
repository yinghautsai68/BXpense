import { useEffect, useState } from 'react';
import ExpenseCard from '../components/ExpenseCard'
import { useAuth } from '../context/AuthContext';
import type { MonthlySummaryType, RecordType } from '../types/records.type';
import { getMonthlySummary, getRecords } from '../services/records.service';
import Card from '../components/Card';
import { useUtil } from '../context/UtilContext';

const Records = () => {
    const { token, user } = useAuth();
    const { formatDateTime } = useUtil();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [records, setRecords] = useState<Record<string, RecordType[]> | null>(null);
    const [monthlySummary, setMonthlySummary] = useState<MonthlySummaryType[] | null>(null);

    const summary = monthlySummary?.[0] ?? { month: '', income: 0, expense: 0 };
    const income = summary.income;
    const expense = summary.expense;
    const balance = income - expense;

    useEffect(() => {
        if (!token || !user) {
            setIsLoading(false);
            return;
        }

        const fetchAccounts = async () => {
            try {
                const data = await getRecords(token, user.userId);
                console.log(data);
                setRecords(data);

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAccounts();
    }, [token, user])

    useEffect(() => {
        if (!token || !user) {
            return;
        }
        const fetchMonthlySummary = async () => {
            try {
                const data = await getMonthlySummary(token, user.userId);
                console.log('monthly summary', data);
                setMonthlySummary(data);
            } catch (error) {
                console.error;
            }
        }
        fetchMonthlySummary();
    }, [token, user]);
    return (
        <>
            <div className='flex flex-col gap-4 p-2 bg-white rounded-lg text-sm'>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月支出</span>
                    <span>NT$ {expense}</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月收入</span>
                    <span>NT$ {income}</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月結餘</span>
                    <span>NT$ {balance.toFixed(2)}</span>
                </div>
            </div>

            <div className='flex flex-col gap-3'>

                {
                    isLoading ? (<span>...loading</span>)
                        : records ? (
                            Object.entries(records).map(([date, records]) => (
                                <div key={date}>
                                    <span>{date}</span>
                                    <Card className='divide-y divide-gray-300 bg-white'>
                                        {records.map((record, index) => (
                                            <ExpenseCard key={index} record={record}></ExpenseCard>
                                        ))}
                                    </Card>
                                </div>
                            ))

                        )

                            :
                            <div className='flex flex-row justify-center items-center w-full h-10 bg-white rounded-lg'>
                                <span>目前沒有紀錄</span>
                            </div>
                }
            </div >
        </>
    )
}

export default Records;