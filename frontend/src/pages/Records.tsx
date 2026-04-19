import { useEffect, useState } from 'react';
import ExpenseCard from '../components/ExpenseCard'
import { useAuth } from '../context/AuthContext';
import type { MonthlySummaryType, RecordType } from '../types/records.type';
import { getMonthlySummary, getMyGroupedRecords } from '../services/records.service';
import Card from '../components/Card';
import { useUtil } from '../context/UtilContext';
import Layout from '../layout/Layout';
import { Title } from '../components/Typography';
import Button from '../components/Button';


const Records = () => {
    const { token } = useAuth();
    const { formatDate } = useUtil();


    const [monthIndex, setMonthIndex] = useState<number>(0);


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [records, setRecords] = useState<Record<string, Record<string, RecordType[]>> | null>(null);
    const [monthlySummary, setMonthlySummary] = useState<MonthlySummaryType[]>([]);


    useEffect(() => {
        if (!records) {
            return;
        }
        const months = Object.keys(records);
        const currentMonth = String(new Date().getMonth() + 1);
        const index = months.indexOf(currentMonth);

        setMonthIndex(index >= 0 ? index : 0);
    }, [records]);

    const summary = monthlySummary?.[0] ?? { month: '', income: 0, expense: 0 };
    const income = summary.income;
    const expense = summary.expense;
    const balance = income - expense;

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const recordsData = await getMyGroupedRecords(token);
                console.log(recordsData);
                setRecords(recordsData);

                const monthlySummaryData = await getMonthlySummary(token);
                console.log('monthly summary', monthlySummaryData);
                setMonthlySummary(monthlySummaryData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
    }, [token])
    return (
        <Layout component={

            <div className='flex flex-row gap-5'>
                <Title className='pl-5 text-white md:text-black'>紀錄 {records ? Object.keys(records)[monthIndex] : '#'}月</Title>
                <Button onClick={() => setMonthIndex((prev) => Math.max(prev - 1, 0))}>prev</Button>
                <Button onClick={() => setMonthIndex((prev) => Math.min(prev + 1, Object.keys(records ?? {}).length - 1))}>next</Button>
            </div >

        }>
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
                            /*
                                                        Object.entries(records[Object.keys(records)[0]]).map(([month, dates]) => (
                                                            <div key={month}>
                                                                <span >{month} MONTH</span>
                            
                                                                {
                                                                    Object.entries(dates).map(([date, records]) => (
                                                                        <div key={date}>
                                                                            <span className='font-medium'>{formatDate(date)}</span>
                                                                            {
                                                                                <Card className='divide-y divide-gray-300 bg-white'>
                                                                                    {records.map((record) => (
                                                                                        <ExpenseCard key={record.id } record={record}></ExpenseCard>
                                                                                    ))
                                                                                    }
                                                                                </Card>
                                                                            }
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        ))
                                                            */
                            Object.entries(records[Object.keys(records)[monthIndex]]).map(([date, records]) => (
                                <div key={date}>
                                    <span className='font-medium'>
                                        {formatDate(date)}
                                    </span>

                                    <Card className='divide-y divide-gray-300 bg-white'>
                                        {records.map((record) => (
                                            <ExpenseCard key={record.id} record={record} />
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
        </Layout >
    )
}

export default Records;