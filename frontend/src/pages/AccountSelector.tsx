import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import type { AccountType } from '../types/accounts.type';
import { getAccounts } from '../services/accounts.service';
import SavingsCard from '../components/SavingsCard';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
type AccountSelectorProps = {
    onClose: () => void,
    handleSelectAccount: (accountId: number) => void,
}

const AccountSelector = ({ onClose, handleSelectAccount }: AccountSelectorProps) => {
    const { token, user } = useAuth();
    const navigate = useNavigate();

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
            <div className='flex flex-row justify-between items-center'>
                <span>儲蓄帳戶</span>
                <Button onClick={() => navigate('/accounts/new')} className='w-8 h-8 bg-yellow-500'>+</Button>
            </div>
            <div className='flex flex-col '>
                {accounts
                    ?
                    accounts.map((account, index) => (
                        <SavingsCard key={index} onClick={() => handleSelect(account)} account={account} />
                    ))
                    :
                    <div className='pl-5 py-2 bg-gray-200 rounded-xl'>
                        目前沒有任何賬戶
                    </div>
                }
            </div>
        </>
    )
}

export default AccountSelector