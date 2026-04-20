import { useEffect, useState } from 'react';
import ExpenseCard from '../components/ExpenseCard'
import { useAuth } from '../context/AuthContext';
import type { MonthlySummaryType, RecordType } from '../types/records.type';
import { getMonthlySummary, getMyGroupedRecords } from '../services/records.service';
import Card from '../components/Card';
import { useUtil } from '../context/UtilContext';
import Layout from '../layout/Layout';
import { SubTitle, Title } from '../components/Typography';
import Button from '../components/Button';
import Modal from '../components/Modal';

import IllustrationEmpty from '../assets/illustration/illustration-empty.png'

const Records = () => {
    const { token } = useAuth();
    const { formatDate } = useUtil();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isSelectDate, setIsSelectDate] = useState<boolean>(false);

    const [records, setRecords] = useState<Record<string, Record<string, Record<string, RecordType[]>>> | null>(null);
    const [monthlySummaries, setMonthlySummaries] = useState<MonthlySummaryType[]>([]);
    const [monthlySummary, setMonthlySummary] = useState<MonthlySummaryType>({
        month: '',
        income: 0,
        expense: 0
    });

    const currentYear = new Date().toLocaleString('sv-SE', { year: 'numeric' });
    const currentMonth = new Date().toLocaleString('sv-SE', { year: 'numeric', month: 'numeric' });
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    useEffect(() => {
        if (!monthlySummaries) {
            return;
        }
        const currentMonthlySummary = monthlySummaries.find((object) => object.month === selectedMonth);
        if (currentMonthlySummary) {
            setMonthlySummary(currentMonthlySummary);
        } else {
            setMonthlySummary({
                month: '',
                income: 0,
                expense: 0
            });
        }
    }, [monthlySummaries, selectedMonth]);

    const handleNext = () => {
        if (!records) {
            return;
        }
        setTempSelectedYear((prev) => String(Number(prev) + 1));


    };
    const handlePrev = () => {
        if (!records) {
            return;
        }
        setTempSelectedYear((prev) => String(Number(prev) - 1));
    };

    const [tempSelectedYear, setTempSelectedYear] = useState<string>(selectedYear);
    const [tempSelectedMonth, setTempSelectedMonth] = useState<string>(selectedMonth);

    const handleConfirmDate = () => {
        setSelectedYear(tempSelectedYear);
        setSelectedMonth(tempSelectedMonth);
        setIsSelectDate(false);
    }

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const recordsData = await getMyGroupedRecords(token);
                console.log(recordsData.data);
                setRecords(recordsData.data);

                const monthlySummariesData = await getMonthlySummary(token);
                console.log('monthly summary', monthlySummariesData);
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
        console.log(selectedMonth);
        console.log(monthlySummary);
    }, [selectedMonth, monthlySummary])
    return (
        <Layout component={

            <div className='flex flex-row gap-5'>
                <Title className='pl-5 text-white md:text-black'>紀錄 <span onClick={() => setIsSelectDate(true)} className='cursor-pointer'>{selectedYear}年{selectedMonth.split('-')[1]}月</span></Title>

                <Modal isOpen={isSelectDate} onClose={() => setIsSelectDate(false)}>
                    <div className='flex flex-row justify-center items-center gap-5'>
                        <Button onClick={() => handlePrev()}>L</Button>
                        <SubTitle className='text-center'>{tempSelectedYear}</SubTitle>

                        <Button onClick={() => handleNext()}>R</Button>
                    </div>
                    <div className='flex flex-row justify-center '>
                        <div className='grid grid-cols-3 place-items-center gap-5 w-50  '>
                            {Array.from({ length: 12 }).map((_, index) => {
                                const month = index + 1;
                                const formatMonth = String(month).padStart(2, "0");
                                const yearMonth = `2026-${formatMonth}`;
                                return (
                                    <Button onClick={() => setTempSelectedMonth(yearMonth)} className={`w-15 bg-gray-200 hover:bg-gray-400 font-bold ${yearMonth === tempSelectedMonth ? 'bg-gray-500 text-white' : ''}`}>{index + 1} 月</Button>
                                )
                            })}

                        </div>
                    </div>
                    <div className='flex flex-row justify-around items-center'>
                        <Button onClick={() => setIsSelectDate(false)} className='bg-gray-500 hover:bg-gray-800 text-white'>取消</Button>
                        <Button onClick={() => handleConfirmDate()} className='bg-yellow-500 hover:bg-yellow-600'>確認</Button>
                    </div>
                </Modal>
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
                    isLoading ? (<span>...loading</span>)
                        : records ? (
                            !records[selectedYear] ?
                                <div className='flex flex-col justify-center items-center w-full flex-1 '>
                                    <img src={IllustrationEmpty} alt="illustration-empty" className='w-64' />
                                    <SubTitle className='w-full text-center'>這年份沒有資料</SubTitle>
                                </div>
                                : !records[selectedYear][selectedMonth] ?
                                    <div className='flex flex-col justify-center items-center w-full flex-1 '>
                                        <img src={IllustrationEmpty} alt="illustration-empty" className='w-64' />
                                        <SubTitle className='w-full text-center'>這個月沒有資料</SubTitle>
                                    </div>
                                    :
                                    Object.entries(records[selectedYear][selectedMonth]).map(([date, dateRecords]) => (
                                        <div key={date}>
                                            <span className='font-medium'>
                                                {formatDate(date)}
                                            </span>
                                            <Card className='divide-y divide-gray-300 bg-white'>
                                                {dateRecords.map((record: RecordType) => (
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