import Card from '../components/Card'
import { SubTitle } from '../components/Typography'
import RecordTag from '../components/RecordTag'
import { Link, useAsyncError, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

import type { User } from '../types/users.types'
import { deleteUser, getUserData, resetUserData } from '../services/user.service'
import toast from 'react-hot-toast'
import type { CategoryType } from '../types/categories.type'
import { deleteCategoryById, getCategories } from '../services/categories.service'
import { getSummary } from '../services/records.service'
import Button from '../components/Button'
import Modal from '../components/Modal'

const Profile = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [summary, setSummary] = useState({
        total_expense: 0,
        total_income: 0,
        total_records: 0
    });
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
        if (!token) {
            return;
        }
        const fetchSummary = async () => {
            try {
                const data = await getSummary(token);
                console.log(data);
                setSummary(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSummary();
    }, [token]);

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
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const handleDeleteById = async (categoryId: number) => {
        if (!token || !categoryId) {
            return;
        }
        try {
            const data = await deleteCategoryById(token, categoryId);
            console.log(data);
            setCategories((prev) => prev ? prev.filter((item) => item.id !== categoryId) : prev);
            setDeleteId(null);
            toast.success(data)
        } catch (error) {
            console.error(error);
        }
    }

    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState<boolean>(false);
    const hanldeResetUserData = async () => {
        if (!token) {
            return;
        }
        try {
            const data = await resetUserData(token);
            console.log(data);
            toast.success(data);
            setIsDeleteAccountOpen(false);
        } catch (error) {
            console.error(error);
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
                        <span>NT${summary.total_expense ?? 0}</span>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <span className='text-gray-500'>總收入</span>
                        <span>NT${summary.total_income ?? 0}</span>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <span className='text-gray-500'>紀錄</span>
                        <span>{summary.total_records}</span>
                    </div>
                </div>
            </Card>



            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-4 '>
                    <SubTitle>
                        我的類別
                    </SubTitle>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <Button onClick={() => setIsDelete((prev) => !prev)} className='bg-red-500 text-white'>刪除</Button>
                    <Link to='/categories' className='px-2 py-1 bg-yellow-500 rounded-xl cursor-pointer'>+</Link>
                </div>
            </div>
            <Card className='grid grid-cols-4 gap-5'>
                {
                    categories?.map((category, index) => (
                        <div className='relative'>
                            {
                                isDelete &&
                                <div onClick={() => setDeleteId(category.id)} className='absolute right-0 flex flex-row justify-center items-center w-5 h-5 pb-1 bg-red-500 rounded-full text-xl text-white'>-</div>
                            }
                            <RecordTag key={index} onClick={() => navigate(`/categories/${category.id}/edit`)} category={category}></RecordTag>
                        </div>
                    ))
                }
            </Card>

            <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
                <>
                    <span className='font-bold'>確認刪除該類別？ </span>
                    <div className='flex flex-row justify-end items-center gap-2'>
                        <Button onClick={() => setDeleteId(null)} className='bg-gray-400 text-white'>取消</Button>
                        <Button onClick={() => handleDeleteById(deleteId!)} className='bg-red-500 text-white'>刪除</Button>
                    </div>
                </>
            </Modal>

            <SubTitle>其他</SubTitle>
            <Card>
                <p onClick={() => setIsDeleteAccountOpen(true)} className='w-full py-2 text-center text-rose-600 cursor-pointer hover:bg-gray-300 rounded-lg transition-all'>清除所有資料</p>
            </Card>
            <Modal isOpen={isDeleteAccountOpen} onClose={() => setIsDeleteAccountOpen(false)}>
                <>
                    <span className='font-bold text-red-500'>確認刪除所有資料？ </span>
                    <div className='flex flex-row justify-end items-center gap-2'>
                        <Button onClick={() => setIsDeleteAccountOpen(false)} className='bg-gray-400 hover:bg-gray-500 text-white'>取消</Button>
                        <Button onClick={() => hanldeResetUserData()} className='bg-red-500 hover:bg-red-700 text-white'>刪除</Button>
                    </div>
                </>
            </Modal>
        </>
    )
}

export default Profile