import { useEffect, useMemo, useState } from 'react'
import ExpenseCard from '../components/ExpenseCard'
import Card from '../components/Card'
import type { AccountType } from '../types/accounts.type'
import { useAuth } from '../context/AuthContext'
import { deleteAccountById, getAccountById } from '../services/accounts.service'
import { useNavigate, useParams } from 'react-router-dom'
import { getMyGroupedRecords } from '../services/records.service'



import IconDelete from '../assets/icons/icon-delete.png'
import IconEdit from '../assets/icons/icon-edit.png'
import toast from 'react-hot-toast'
import Modal from '../components/Modal'
import Button from '../components/Button'
import type { RecordType } from '../types/records.type'
import SkeletonBlock from './SkeletonBlock'

const Account = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<AccountType | null>(null);


    const [records, setRecords] = useState<RecordType[]>([]);

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
            const dateObject = new Date(records[i].record_date);
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth() + 1;
            const date = dateObject.getDate();

            if (!result[year]) {
                result[year] = {};
            }
            if (!result[year][month]) {
                result[year][month] = {};
            }
            if (!result[year][month][date]) {
                result[year][month][date] = [];
            }

            result[year][month][date].push(records[i]);
        }

        return result;
    }, [records]);

    useEffect(() => {
        if (!token || !id) {
            return;
        }

        const fetchData = async () => {
            try {
                const [accountResult, recordsResult] = await Promise.allSettled([
                    getAccountById(token, id),
                    getMyGroupedRecords(token, { account_id: Number(id) })
                ]);
                if (accountResult.status === 'fulfilled') {
                    setAccount(accountResult.value);
                } else {
                    console.error(accountResult.reason);
                }

                if (recordsResult.status === 'fulfilled') {
                    console.log(recordsResult.value);
                    setRecords(recordsResult.value.data);
                } else {
                    console.error(recordsResult.reason);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [token, id]);

    useEffect(() => console.log(records), [records]);

    const handleDelete = async () => {
        if (!token || !id) {
            return;
        }
        try {
            const message = await deleteAccountById(token, id);
            console.log(message);
            toast.success('刪除成功');
            navigate(-1);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);

        }
    }
    return (
        <>
            <div className='flex flex-row justify-between items-stretch w-full h-60 border-3 border-dashed  bg-white rounded-xl overflow-hidden'>
                <div className='flex flex-col justify-center gap-2 pl-4 py-4 '>
                    {isLoading ?
                        <>
                            <div className='flex flex-row items-center gap-2'>
                                <SkeletonBlock className='w-12 aspect-square' />
                                <SkeletonBlock className='w-15 h-5' />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-sm'>當前餘額</span>
                                <SkeletonBlock className='w-30 h-8' />
                            </div>
                        </>
                        :
                        <>
                            <div className='flex flex-row items-center gap-2'>
                                <img src={account?.image_url} alt="" className='w-12 aspect-square border border-gray-300  rounded-xl object-cover' />
                                <span className='font-bold'>{account?.name}</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-sm'>當前餘額</span>
                                <span className='text-2xl font-bold'>NTD {account?.final_balance}</span>
                            </div>
                        </>
                    }
                </div>
                <div className='relative w-[50%] overflow-hidden '>
                    <div className='absolute right-3 top-3 flex flex-row items-center gap-2 '>
                        <img onClick={() => setIsDeleteOpen(true)} src={IconDelete} alt="icon-delete" className='w-5 aspect-square cursor-pointer' />
                        <img onClick={() => navigate(`/accounts/${account?.id}/edit`)} src={IconEdit} alt='icon-delete' className='w-5 aspect-square cursor-pointer' />
                    </div>
                    <div className='absolute right-0 top-10 translate-x-1/2 w-60 h-60 bg-yellow-500 rounded-full z-50'></div>
                </div>
            </div >

            {/*records*/}
            < div className='flex flex-col gap-8  h-full overflow-y-auto' >
                {
                    isLoading ?
                        Array.from({ length: 2 }).map((_) => (
                            <div className='flex flex-col gap-1'>
                                <SkeletonBlock className='w-15 h-5' />
                                <div className='flex flex-col gap-3'>
                                    <Card className='flex flex-col gap-1 bg-gray-200'>
                                        <SkeletonBlock className='w-15 h-5' />
                                        <div className='flex flex-col gap-1'>
                                            <SkeletonBlock className='w-18 h-5' />
                                            <Card className='flex flex-col gap-1 bg-white'>
                                                {
                                                    Array.from({ length: 4 }).map((_) => (
                                                        <SkeletonBlock className='w-full h-10' />
                                                    ))
                                                }

                                            </Card>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        ))
                        : records.length === 0 ?
                            <Card className='flex flex-row justify-center bg-white'>
                                <span className='w-full text-center font-semibold'>沒有任何支出紀錄</span>
                            </Card>
                            :
                            Object.entries(grouped).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, months]) => (
                                <div>
                                    <span className='text-lg font-bold'>{year}年</span>
                                    <div className='flex flex-col gap-3'>
                                        {Object.entries(months).sort((a, b) => Number(b[0]) - Number(a[0])).map(([month, dates]) => (
                                            <Card className='bg-gray-200'>
                                                <span className='font-semibold'>{month}月</span>
                                                <div >
                                                    {
                                                        Object.entries(dates).sort((a, b) => Number(b[0]) - Number(a[0])).map(([date, records]) => (
                                                            <div>
                                                                <span>{month}月{date}日</span>
                                                                <Card className='bg-white'>
                                                                    {records.map((record) => (
                                                                        <ExpenseCard record={record} />
                                                                    ))}
                                                                </Card>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </Card>
                                        ))
                                        }
                                    </div>
                                </div>

                            ))
                }

            </div >

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <div className="flex flex-col gap-4 p-4">
                    <h2 className="text-2xl font-bold">確認刪除賬戶?</h2>
                    <p className="text-lg text-gray-500">此操作無法復原</p>

                    <div className="flex flex-row gap-3 justify-end">
                        <Button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 bg-gray-200 ">取消</Button>

                        <Button onClick={() => handleDelete()} className="px-4 py-2 bg-red-500 text-white ">刪除</Button>
                    </div>
                </div>
            </Modal>
        </ >
    )
}

export default Account