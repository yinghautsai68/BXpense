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
            <div className='flex flex-row justify-between w-full bg-white rounded-xl'>
                <div className='flex flex-col justify-center gap-2 pl-4 py-4'>
                    <div className='flex flex-row items-center gap-2'>
                        <img src={account?.image_url} alt="" className='w-12 aspect-square border rounded-xl object-cover' />
                        <span className='font-bold'>{account?.name}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm'>當前餘額</span>
                        <span className='text-2xl font-bold'>NTD {account?.balance}</span>
                    </div>
                </div>
                {/*  <img src={account?.image_url} alt="" className='w-24 h-full object-cover' />*/}
                <div className='relative w-[50%] h-full overflow-hidden'>
                    <div className='absolute right-0 top-10 translate-x-1/2    w-60 h-60 bg-yellow-500 rounded-full'></div>
                </div>
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
                    {/*  <ExpenseCard></ExpenseCard>
                    <ExpenseCard></ExpenseCard>
                    <ExpenseCard></ExpenseCard> */}

                </Card>

            </div>
        </div >
    )
}

export default Account