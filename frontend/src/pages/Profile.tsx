import Card from '../components/Card'
import { SubTitle } from '../components/Typography'
import RecordTag from '../components/RecordTag'
import { Link, useAsyncError } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

import type { User } from '../types/users.types'
import { deleteUser, getUserData } from '../services/user.service'
import toast from 'react-hot-toast'
import type { CategoryType } from '../types/categories.type'
import { getCategories } from '../services/categories.service'

const Profile = () => {
    const { token, user } = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [categories, setCategories] = useState<CategoryType[] | null>(null);


    useEffect(() => {
        if (!token || !user) {
            setIsLoading(false);
            return;
        }
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const data = await getUserData(token, user.userId);
                console.log(data);
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

    useEffect(() => {
        if (!token || !user) {
            return;
        }
        const fetchCategories = async () => {
            try {
                const data = await getCategories(token, user.userId);
                console.log(data);
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCategories();
    }, [token, user]);

    const handleDeleteUser = async () => {
        if (!user || !token) return;
        try {
            const result = await deleteUser(token, user.userId);
            toast.success(result.message);

        } catch (error) {
            console.log(error);
        }
    }

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
                        <span className='text-gray-500'>總支出</span>
                        <span>NT$26500</span>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <span className='text-gray-500'>總收入</span>
                        <span>NT$26500</span>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <span className='text-gray-500'>紀錄</span>
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
                    categories?.map((category, index) => (
                        <RecordTag key={index} category={category}></RecordTag>
                    ))
                }


            </Card>

            <SubTitle>其他</SubTitle>
            <Card>
                <p onClick={() => handleDeleteUser()} className='w-full text-center text-rose-600'>刪除所有資料</p>
            </Card>
        </>
    )
}

export default Profile