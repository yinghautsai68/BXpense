import React, { useEffect, useState } from 'react'
import ExpenseCard from '../components/ExpenseCard'
import Card from '../components/Card'
import type { AccountType } from '../types/accounts.type'
import { useAuth } from '../context/AuthContext'
import { getAccountById } from '../services/accounts.service'
import { useParams } from 'react-router-dom'

const Account = () => {
    const { token } = useAuth();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<AccountType | null>(null);

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

    return (
        <div className='flex flex-col gap-2 bg-zinc-200 w-full h-screen px-4 pt-5 pb-5 '>
            <div className='flex flex-row justify-between px-5'>
                <span>back</span>
                <span>賬戶</span>
                <span>=</span>
            </div>
            <div className='flex flex-row justify-between w-full p-4 bg-white rounded-xl'>
                <div className='flex flex-col justify-center gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                        <img src={account?.image_url} alt="" className='w-12 aspect-square rounded-lg object-cover' />
                        <span>{account?.name}</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span>當前餘額</span>
                        <span className='text-2xl font-bold'>NTD {account?.balance}</span>
                    </div>
                </div>
                <img src={account?.image_url} alt="" className='w-24' />
            </div>

            <div className='flex flex-col'>
                <div className='flex flex-row justify-between'>
                    <span>4月6日</span>
                    <div className='flex flex-row gap-5'>
                        <span>out</span>
                        <span>in </span>
                    </div>
                </div>
                <Card className='flex flex-col   divide-y divide-gray-300'>
                    <ExpenseCard></ExpenseCard>
                    <ExpenseCard></ExpenseCard>
                    <ExpenseCard></ExpenseCard>
                </Card>

            </div>
        </div >
    )
}

export default Account