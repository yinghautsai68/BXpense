import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import type { AccountType } from '../types/accounts.type';
import { getAccounts } from '../services/accounts.service';
import SavingsCard from '../components/SavingsCard';
type AccountSelectorProps = {
    onClose: () => void,
    handleSelectAccount: (accountId: number) => void,
}

const AccountSelector = ({ onClose, handleSelectAccount }: AccountSelectorProps) => {
    const { token, user } = useAuth();
    const [accounts, setAccounts] = useState<AccountType[] | null>(null)

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



    const handleSelect = (account: AccountType) => {
        handleSelectAccount(account.id);
        onClose();
    }


    return (
        <>
            <span>儲蓄帳戶</span>
            <div className='flex flex-col '>
                {accounts?.map((account, index) => (
                    <SavingsCard key={index} onClick={() => handleSelect(account)} account={account} />
                ))}
            </div>
        </>
    )
}

export default AccountSelector