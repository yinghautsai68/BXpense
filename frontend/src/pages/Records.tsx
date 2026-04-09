import { useEffect, useState } from 'react';
import ExpenseCard from '../components/ExpenseCard'
import { useAuth } from '../context/AuthContext';
import type { Record } from '../types/records.type';
import { getRecords } from '../services/records.service';
import Card from '../components/Card';

const Records = () => {
    const { token, user } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [records, setRecords] = useState<Record[] | null>(null);

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
    return (
        <>
            <div className='flex flex-col gap-4 p-2 bg-white rounded-lg text-sm'>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月支出</span>
                    <span>NT$ 1000</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月收入</span>
                    <span>NT$ 1000</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月結餘</span>
                    <span>NT$ 1000</span>
                </div>
            </div>

            <div className='flex flex-col gap-3'>

                {
                    isLoading ? <span>...loading</span>
                        : records ? <>
                            < span > 2026年4月6日 週一</span>
                            <Card className='flex flex-col  divide-y divide-gray-300 w-full bg-white rounded-lg'>
                                {records.map((item, index) => {
                                    return (<ExpenseCard key={index} record={item}></ExpenseCard>)
                                })}


                            </Card>
                        </>
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