import React from 'react'
import type { AccountType } from '../types/accounts.type'
import { Link } from 'react-router-dom';

type SavingsCardProps = {
    account: AccountType,
    onClick: () => void
};
const SavingsCard = ({ account, onClick }: SavingsCardProps) => {
    return (
        <div onClick={onClick} className='flex flex-row justify-between items-center px-4 py-4 bg-white rounded-xl cursor-pointer'>
            <div className='flex flex-row items-center gap-2'>
                <img src={account.image_url} className='w-8 aspect-square border rounded-lg object-cover' />
                <span>{account.name}</span>
            </div>
            <span>NT${account.final_balance}</span>
        </div>
    )
}

export default SavingsCard