import { SubTitle } from '../components/Typography'
import SavingsCard from '../components/SavingsCard'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react';
import type { AccountType } from '../types/accounts.type';
import { getAssetsSummary, getMyAccounts } from '../services/accounts.service';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

import IllustrationAccount from '../assets/illustration/illustration-account.png'
import IllustrationAccounts from '../assets/illustration/illustration-accounts.png'
import SkeletonBlock from './SkeletonBlock';
const Accounts = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState<AccountType[]>([]);

    type AssetsSummary = {
        net_assets: number
        total_asset: number
        total_debt: number
    }
    const [assetsSummary, setAssetsSummary] = useState<AssetsSummary>({
        net_assets: 0,
        total_asset: 0,
        total_debt: 0
    });


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isEmpty = !isLoading && accounts.length === 0;
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchData = async () => {
            try {
                const accountData = await getMyAccounts(token);
                setAccounts(accountData);
                const assetsData = await getAssetsSummary(token);
                setAssetsSummary(assetsData);
            } catch (error) {
                console.error(error);
                setError(String(error));
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [token]);
    if (error) return (
        <div>{error}</div>
    )
    return (
        <>
            <div className='relative flex flex-col gap-4 w-full p-4 border-2 border-dashed bg-white rounded-xl'>
                <div className=' flex flex-row justify-between items-center w-full'>
                    <div className='flex flex-col '>
                        <span className='text-xl'>淨資產</span>
                        {
                            isLoading ?
                                <div className="w-full h-8 bg-gray-300 rounded animate-pulse"></div>
                                :
                                <span className='text-2xl font-bold'>NT$ {assetsSummary.net_assets}</span>
                        }
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
                <div className='absolute right-5 w-15 h-15 bg-yellow-500 z-10'></div>
                <img src={IllustrationAccount} className='absolute right-5 w-25 z-50 ' />
            </div >

            <div className='flex flex-col gap-2 pb-20'>
                <div className='flex flex-row justify-between items-center'>
                    <SubTitle>儲蓄帳戶</SubTitle>
                    <Button onClick={() => navigate('/accounts/new')} className='p-1 bg-yellow-500'>新增帳戶</Button>
                </div>
                {!isLoading && isEmpty
                    ?
                    <div className='flex flex-col justify-center items-center gap-2 pt-15'>
                        <img src={IllustrationAccounts} alt="" className='w-64' />
                        <span className='text-center font-bold text-shadow-lg '>目前沒有任何賬戶</span>
                    </div>
                    :

                    <div className='flex flex-col gap-2'>
                        {
                            isLoading ?
                                Array.from({ length: 4 }).map((_) => (
                                    <SkeletonBlock className='w-full h-15' />
                                ))

                                :
                                accounts?.map((account, index) => {
                                    return (
                                        <SavingsCard key={index} onClick={() => navigate(`/accounts/${account.id}`)} account={account} ></SavingsCard>

                                    )
                                })

                        }

                    </div>}
            </div >
        </ >
    )
}

export default Accounts