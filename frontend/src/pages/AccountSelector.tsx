import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import type { AccountType } from '../types/accounts.type';
import { getAccounts } from '../services/accounts.service';
import SavingsCard from '../components/SavingsCard';
import { useRecordStore } from '../store/recordStore';
import { useNavigate } from 'react-router-dom';

const AccountSelector = () => {
    const { token, user } = useAuth();
    const [accounts, setAccounts] = useState<AccountType[] | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !user) {
            return;
        }

        const fetchAccounts = async () => {
            try {
                const data = await getAccounts(token, user.userId);
                setAccounts(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAccounts();
    }, [token, user?.userId]);


    const setSelectedAccountId = useRecordStore((state) => state.setSelectedAccountId);
    const handleSelect = (account: AccountType) => {
        setSelectedAccountId(account.id);
        navigate(-1);
    }

    return (
        <div className='px-4 py-5'>
            <span>儲蓄帳戶</span>
            <div className='flex flex-col '>
                {accounts?.map((account, index) => (
                    <SavingsCard key={index} onClick={() => handleSelect(account)} account={account} />
                ))}
            </div>
        </div>
    )
}

export default AccountSelector