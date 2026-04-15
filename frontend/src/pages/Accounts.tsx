import { SubTitle } from '../components/Typography'
import SavingsCard from '../components/SavingsCard'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react';
import type { AccountType } from '../types/accounts.type';
import { getAccounts, getAssetsSummary, getTotalAssets } from '../services/accounts.service';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Accounts = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [accounts, setAccounts] = useState<AccountType[] | null>(null);
    useEffect(() => {
        if (!token || !user) {
            setIsLoading(false);
            return;
        }
        const fetchAccounts = async () => {
            try {
                const data = await getAccounts(token, user.userId);
                setAccounts(data);
            } catch (error) {
                console.error(error);
                setError(String(error));
            } finally {
                setIsLoading(false);
            }
        }

        fetchAccounts();
    }, [token, user]);

    const [assetsSummary, setAssetsSummary] = useState({});
    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchAssetsSummary = async () => {
            try {
                const data = await getAssetsSummary(token);
                console.log(data);
                setAssetsSummary(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAssetsSummary();
    }, [token]);
    return (
        <>
            <div className='flex flex-col gap-4 w-full p-4 border-2 border-dashed bg-white rounded-xl'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <div className='flex flex-col '>
                        <span className='text-xl'>淨資產</span>
                        {
                            isLoading ?
                                <div className="w-full h-8 bg-gray-300 rounded animate-pulse"></div>
                                :
                                <span className='text-2xl font-bold'>NT$ {assetsSummary.net_assets}</span>
                        }
                    </div>
                    <div className='w-20 aspect-square bg-black'>

                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='flex flex-col justify-start w-full'>
                        <span className='text-xl'>資產</span>
                        {
                            isLoading ?
                                <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
                                :
                                <span className='text-xl'>NT$ {assetsSummary.total_asset}</span>
                        }
                    </div>
                    <div className='flex flex-col justify-start w-full'>
                        <span className='text-xl'>負債</span>
                        {isLoading ?
                            <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
                            :
                            <span className='text-xl'>NT$  {assetsSummary.total_debt}</span>

                        }

                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='flex flex-row justify-between items-center'>
                    <SubTitle>儲蓄帳戶</SubTitle>
                    <Button onClick={() => navigate('/accounts/new')} className='p-1 bg-yellow-500'>新增帳戶</Button>
                </div>
                <div className='flex flex-col gap-2'>
                    {
                        isLoading ?
                            <div className="h-16 bg-gray-300 rounded animate-pulse"></div>
                            :
                            accounts?.map((account, index) => {
                                return (
                                    <SavingsCard key={index} onClick={() => navigate(`/accounts/${account.id}`)} account={account} ></SavingsCard>

                                )
                            })

                    }

                </div>
            </div >
        </ >
    )
}

export default Accounts