import { useEffect, useState } from 'react'
import ExpenseCard from '../components/ExpenseCard'
import { useAuth } from '../context/AuthContext';
import type { RecordType } from '../types/records.type';
import ExpenseChart from '../components/ExpenseChart';
import ExpensePieChart from '../components/ExpensePieChart';
import { getCategorySummary, getLine } from '../services/analytics.service';
import Card from '../components/Card';
import { categoryZhTW } from '../constants/categoryZhTW';

import IllustrationEmpty from '../assets/illustration/illustration-empty.png'
import { CardTitle, Title } from '../components/Typography';
import type { CategorySummaryType, LineType, PieType } from '../types/analysis.type';
import { getMyRecords } from '../services/records.service';
import Layout from '../layout/Layout';
import DatePickerModal from '../components/DatePickerModal';
const Analysis = () => {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const currentYear = new Date().toLocaleString('sv-SE', { year: 'numeric' });
    const currentMonth = new Date().toLocaleString('sv-SE', { month: 'numeric' });
    const [isSelectDate, setIsSelectDate] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<string>(currentYear);
    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);


    const [topExpenses, setTopExpenses] = useState<RecordType[]>([]);
    const [line, setLine] = useState<LineType[]>([]);
    const [lineDatas, setLineDatas] = useState<Record<string, Record<string, LineType[]>> | null>(null);
    const [categorySummary, setCategorySummary] = useState<CategorySummaryType[]>([]);

    const isEmpty = !isLoading && line.length === 0 && categorySummary.length === 0 && topExpenses.length === 0;


    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const results = await Promise.allSettled([
                    getLine(token, selectedYear, selectedMonth),
                    getCategorySummary(token),
                    getMyRecords(token, {
                        limit: 10,
                        type: "expense",
                        sort: "amount_desc"
                    })
                ]);

                const lineRes = results[0];
                console.log(lineRes);
                const categoryRes = results[1];
                const topRes = results[2];

                // Line chart data
                if (lineRes.status === "fulfilled") {
                    setLineDatas(lineRes.value);
                } else {
                    console.error("Line API failed:", lineRes.reason);
                }

                // Category data
                if (categoryRes.status === "fulfilled") {
                    setCategorySummary(categoryRes.value);
                } else {
                    console.error("Category API failed:", categoryRes.reason);
                }

                // Top expenses
                if (topRes.status === "fulfilled") {
                    setTopExpenses(topRes.value);
                } else {
                    console.error("Top records API failed:", topRes.reason);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [token, selectedYear, selectedMonth]);

    useEffect(() => {
        if (!lineDatas) {
            return;
        }
        setLine(lineDatas?.[selectedYear]?.[selectedMonth] ?? []);
    }, [lineDatas, selectedYear, selectedMonth]);

    const totalAmount = categorySummary.reduce((sum, item) => sum + Number(item.total_amount), 0);
    const getPercent = (amount: number) => {
        return ((amount / totalAmount) * 100).toFixed(2);
    }

    const [pieData, setPieData] = useState<PieType[]>([]);
    useEffect(() => {

        let pie = categorySummary.map((item) => (
            {
                name: categoryZhTW[item.name],
                value: Number(item.total_amount)
            }
        ));
        setPieData(pie);
    }, [categorySummary]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];





    if (isLoading) return (
        <div className='flex flex-col pt-15 items-center w-full h-full'>
            <span>loading</span>
        </div>
    )
    if (isEmpty && !isLoading) return (
        <div className=' flex flex-col pt-15 items-center w-full h-full'>
            <img src={IllustrationEmpty} alt="" className='md:w-64 md:h-64' />
            <span className='font-bold text-shadow-lg'>目前沒有數據可以參考</span>
        </div>
    )
    return (
        <Layout component={
            <div className='flex flex-row gap-5'>
                <Title className='pl-5 text-white md:text-black'>紀錄 <span onClick={() => setIsSelectDate(true)} className='cursor-pointer'>{selectedYear}年{selectedMonth}月</span></Title>
                <DatePickerModal isOpen={isSelectDate} onClose={() => setIsSelectDate(false)} selectedYear={selectedYear} setSelectedYear={setSelectedYear} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            </div>
        }>
            <Card className='w-full h-[250px] bg-white'>
                <CardTitle>支出歷史</CardTitle>
                <span className='text-xs font-bold'>支出：NT${totalAmount}</span>
                <ExpenseChart data={line}></ExpenseChart>
            </Card>
            <Card className='bg-white'>
                <CardTitle>支出類別占比</CardTitle>
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
            <Card className='flex flex-col gap-5 bg-white'>
                <div className='flex flex-row justify-between items-center'>
                    <CardTitle>單筆金額排行</CardTitle>
                    <span>TOP 10</span>
                </div>
                <div className='flex flex-col w-full  bg-white '>
                    {topExpenses.length > 0 ?
                        topExpenses.map((expense) => (
                            <ExpenseCard key={expense.id} record={expense}></ExpenseCard>
                        ))
                        :
                        <div>沒有紀錄</div>
                    }
                </div>
            </Card>
        </Layout>
    )
}

export default Analysis