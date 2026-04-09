import Card from '../components/Card'
import { SubTitle } from '../components/Typography'
import RecordTag from '../components/RecordTag'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

import type { User } from '../types/users.types'
import { getUserData } from '../services/user.service'

const Profile = () => {
    const { token, user } = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);


    useEffect(() => {
        if (!token || !user) {
            setIsLoading(false);
            return
        }
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const data = await getUserData(token, user.userId);
                setUserData(data);
            } catch (error) {
                console.error(error);
                setError('載入使用者資料失敗');
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserData();
    }, [token, user]);

    if (isLoading) return <p>載入中...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!userData) return <p>無使用者資料</p>;
    return (
        <>
            <SubTitle>我的帳號</SubTitle>
            <Card className='flex flex-col'>
                <div className='flex flex-row items-center gap-2'>
                    <img src={userData.image_url} alt="大頭照" className='w-15 aspect-square border rounded-lg object-cover' />
                    <span>{userData.username}</span>
                </div>
                <div className='grid grid-cols-3 '>
                    <div className='flex flex-col justify-center '>
                        <span className=''>total</span>
                        <span>NTD26,500</span>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <span>total</span>
                        <span>NTD26,500</span>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <span>total</span>
                        <span>500</span>
                    </div>
                </div>
            </Card>



            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-4 w-full'>
                    <SubTitle>
                        我的類別
                    </SubTitle>
                    <div className='flex flex-row items-center gap-2'>
                        <span className='underline underline-offset-4 '>支出</span>
                        <span>收入</span>
                    </div>
                </div>
                <Link to='/categories' className='px-2 py-1 bg-yellow-500 rounded-xl cursor-pointer'>+</Link>
            </div>
            <Card className='grid grid-cols-4 gap-5'>
                {
                    [...Array(9)].map((_, index) => {
                        return (
                            <RecordTag key={index}></RecordTag>
                        )
                    })
                }


            </Card>

            <SubTitle>其他</SubTitle>
            <Card className='text-center text-rose-600'>刪除所有資料</Card>
        </>
    )
}

export default Profile