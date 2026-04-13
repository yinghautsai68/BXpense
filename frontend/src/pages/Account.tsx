import React, { useEffect, useState } from 'react'
import ExpenseCard from '../components/ExpenseCard'
import Card from '../components/Card'
import type { AccountType } from '../types/accounts.type'
import { useAuth } from '../context/AuthContext'
import { deleteAccountById, getAccountById } from '../services/accounts.service'
import { useNavigate, useParams } from 'react-router-dom'
import { getRecordsByAccountId } from '../services/records.service'
import type { RecordType } from '../types/records.type'
import { useUtil } from '../context/UtilContext'

import IconDelete from '../assets/icons/icon-delete.png'
import IconEdit from '../assets/icons/icon-edit.png'
import toast from 'react-hot-toast'
import Modal from '../components/Modal'
import Button from '../components/Button'
const Account = () => {
    const { token, user } = useAuth();
    const { id } = useParams();

    const { formatDateTime } = useUtil();
    const navigate = useNavigate();

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<AccountType | null>(null);
    const [records, setRecords] = useState<Record<string, RecordType[]>>({});
    useEffect(() => {
        if (!token || !id) {
            setIsLoading(false);
            return;
        }

        const fetchAccountById = async () => {
            try {
                const data = await getAccountById(token, id);
                console.log(data);
                setAccount(data);
            } catch (error) {
                console.error(error);

            } finally {
                setIsLoading(false);
            }
        }
        fetchAccountById();
    }, [token]);


    useEffect(() => {
        if (!token || !id) {
            return;
        }
        const fetchRecordsByAccountId = async () => {
            try {
                const data = await getRecordsByAccountId(token, id);
                console.log(data);
                setRecords(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecordsByAccountId();
    }, [token, user]);

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
        <div className='flex flex-col gap-7 bg-neutral-200 w-full '>
            <div className='flex flex-row justify-between items-stretch w-full  bg-white rounded-xl'>
                <div className='flex flex-col justify-center gap-2 pl-4 py-4'>
                    <div className='flex flex-row items-center gap-2'>
                        <img src={account?.image_url} alt="" className='w-12 aspect-square border rounded-xl object-cover' />
                        <span className='font-bold'>{account?.name}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm'>當前餘額</span>
                        <span className='text-2xl font-bold'>NTD {account?.final_balance}</span>
                    </div>
                </div>
                {/*  <img src={account?.image_url} alt="" className='w-24 h-full object-cover' />*/}
                <div className='relative w-[50%] overflow-hidden'>
                    <div className='absolute right-3 top-3 flex flex-row items-center gap-2 '>
                        <img onClick={() => setIsDeleteOpen(true)} src={IconDelete} alt="icon-delete" className='w-5 aspect-square cursor-pointer' />
                        <img onClick={() => navigate(`/accounts/${account?.id}/edit`)} src={IconEdit} alt='icon-delete' className='w-5 aspect-square cursor-pointer' />
                    </div>
                    <div className='absolute right-0 top-10 translate-x-1/2 w-60 h-60 bg-yellow-500 rounded-full z-50'></div>
                </div>
            </div>

            <div className='flex flex-col gap-5'>
                {
                    Object.keys(records).map((date) => (
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row justify-between'>
                                <span>{formatDateTime(date)}</span>
                                <div className='flex flex-row gap-3'>
                                    <span>out</span>
                                    <span>in </span>
                                </div>
                            </div>
                            <Card className='flex flex-col divide-y divide-gray-300'>
                                {
                                    records[date].map((record, index) => (
                                        <ExpenseCard key={record.id} record={record}></ExpenseCard>
                                    ))
                                }


                            </Card>
                        </div>
                    ))
                }
            </div>

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
        </div >
    )
}

export default Account