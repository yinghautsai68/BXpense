import React from 'react'
import type { Account } from '../types/accounts.type'
import { Link } from 'react-router-dom';

type SavingsCardProps = {
    account: Account
};
const SavingsCard = ({ account }: SavingsCardProps) => {
    return (
        <Link to={`/accounts/${account.id}`} className='flex flex-row justify-between items-center px-4 py-4 bg-white rounded-xl'>
            <div className='flex flex-row items-center gap-2'>
                <img src={account.image_url} className='w-8 aspect-square object-cover rounded-lg' />
                <span>{account.name}</span>
            </div>
            <span>NTD {account.balance}</span>
        </Link>
    )
}

export default SavingsCard