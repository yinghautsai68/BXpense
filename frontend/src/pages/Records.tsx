import { useEffect, useMemo, useState } from 'react';
import ExpenseCard from '../components/ExpenseCard'
import { useAuth } from '../context/AuthContext';
import type { MonthlySummaryType, RecordType } from '../types/records.type';
import { getMonthlySummary, getMyRecords } from '../services/records.service';
import Card from '../components/Card';

import Layout from '../layout/Layout';
import { Title } from '../components/Typography';

import DatePickerModal from '../components/DatePickerModal';

const Records = () => {
    const { token } = useAuth();


    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isSelectDate, setIsSelectDate] = useState<boolean>(false);

    const [records, setRecords] = useState<RecordType[]>([]);
    const [monthlySummaries, setMonthlySummaries] = useState<Record<string, Record<string, MonthlySummaryType>> | null>(null);
    const [monthlySummary, setMonthlySummary] = useState<MonthlySummaryType>({
        income: 0,
        expense: 0
    });

    type GroupedType = {
        [year: string]: {
            [month: string]: {
                [date: string]: RecordType[]
            }
        }
    }

    const grouped = useMemo(() => {
        let result: GroupedType = {};

        for (let i = 0; i < records.length; i++) {
            const dateObj = new Date(records[i].record_date);

            const year = dateObj.getFullYear().toString();
            const month = (dateObj.getMonth() + 1).toString(); // important: string
            const date = dateObj.getDate().toString();

            if (!result[year]) result[year] = {};
            if (!result[year][month]) result[year][month] = {};
            if (!result[year][month][date]) result[year][month][date] = [];

            result[year][month][date].push(records[i]);
        }

        return result;
    }, [records]);





    const currentYear = new Date().toLocaleString('sv-SE', { year: 'numeric' });
    const currentMonth = new Date().toLocaleString('sv-SE', { month: 'numeric' });
    //console.log(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    useEffect(() => {
        if (!monthlySummaries) {
            return;
        }
        const currentMonthlySummary = monthlySummaries[selectedYear]?.[selectedMonth];
        if (currentMonthlySummary) {
            setMonthlySummary(currentMonthlySummary);
        } else {
            setMonthlySummary({
                income: 0,
                expense: 0
            });
        }
    }, [monthlySummaries, selectedMonth, selectedYear]);

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const recordsData = await getMyRecords(token);
                //console.log(recordsData);
                setRecords(recordsData);

                const monthlySummariesData = await getMonthlySummary(token);
                //console.log('monthly summary', monthlySummariesData);
                setMonthlySummaries(monthlySummariesData);

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
    }, [token])

    useEffect(() => {
        console.log('selectedMonth:', selectedMonth);
        //console.log(monthlySummary);
    }, [selectedMonth, monthlySummary])
    return (
        <Layout component={

            <div className='flex flex-row gap-5'>
                <Title className='pl-5 text-white md:text-black'>紀錄 <span onClick={() => setIsSelectDate(true)} className='cursor-pointer'>{selectedYear}年{selectedMonth}月</span></Title>
                <DatePickerModal isOpen={isSelectDate} onClose={() => setIsSelectDate(false)} selectedYear={selectedYear} setSelectedYear={setSelectedYear} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            </div >

        }>
            <div className='flex flex-col gap-4 p-2 bg-white rounded-lg text-sm'>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月支出</span>
                    <span>NT$ {monthlySummary.expense}</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月收入</span>
                    <span>NT$ {monthlySummary.income}</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月結餘</span>
                    <span>NT$ {(monthlySummary.income - monthlySummary.expense).toFixed(2)}</span>
                </div>
            </div>

            <div className='flex flex-col gap-3 flex-1'>

                {
                    isLoading
                        ?
                        <span>...loading</span>
                        : !grouped[selectedYear]
                            ?
                            <div className='flex flex-row justify-center items-center w-full h-10 bg-white rounded-lg'>
                                <span>這年沒有紀錄</span>
                            </div>
                            : !grouped[selectedYear][selectedMonth]
                                ?
                                <div className='flex flex-row justify-center items-center w-full h-10 bg-white rounded-lg'>
                                    <span>這月份沒有紀錄</span>
                                </div>
                                :
                                <div className='flex flex-col gap-3'>
                                    {
                                        Object.entries(grouped[selectedYear][selectedMonth]).sort((a, b) => Number(b[0]) - Number(a[0])).map(([date, records]) => (
                                            <div key={date} className='flex flex-col gap-1'>
                                                <span>{selectedMonth}月{date}日 {new Date(Number(selectedMonth), Number(date)).toLocaleString('zh-TW', { weekday: 'short' })}</span>
                                                <Card className='divide-y divide-gray-300 bg-white'>
                                                    {
                                                        records.map((record) => (
                                                            <ExpenseCard record={record} />
                                                        ))
                                                    }
                                                </Card>
                                            </div>
                                        ))
                                    }
                                </div>
                }
            </div >
        </Layout >
    )
}

export default Records;