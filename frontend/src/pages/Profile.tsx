import Card from '../components/Card'
import { SubTitle } from '../components/Typography'
import RecordTag from '../components/RecordTag'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

import type { User } from '../types/users.types'
import { getMyProfile, resetUserData } from '../services/user.service'
import toast from 'react-hot-toast'
import type { CategoryType } from '../types/categories.type'
import { deleteCategoryById, getMyCategories } from '../services/categories.service'
import { getSummary } from '../services/records.service'
import Button from '../components/Button'
import Modal from '../components/Modal'

import IconEdit from '../assets/icons/icon-edit.png'
import SkeletonBlock from './SkeletonBlock'
const Profile = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<User>({
        username: '',
        image_url: '',
        created_at: '',
        updated_at: ''
    });
    const [summary, setSummary] = useState({
        total_expense: 0,
        total_income: 0,
        total_records: 0
    });
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchData = async () => {
            try {
                const [userResult, summaryResult, categoriesResult] = await Promise.allSettled([
                    getMyProfile(token),
                    getSummary(token),
                    getMyCategories(token)
                ]);

                if (userResult.status === 'fulfilled') {
                    setUserData(userResult.value);
                } else {
                    console.error(userResult.reason);
                }

                if (summaryResult.status === 'fulfilled') {
                    setSummary(summaryResult.value)
                } else {
                    console.error(summaryResult.reason);
                }

                if (categoriesResult.status === 'fulfilled') {
                    setCategories(categoriesResult.value);
                } else {
                    console.error(categoriesResult.reason);
                }
            } catch (error) {
                console.error(error);
                setError('網路錯誤，請稍後再試');
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [token]);

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

    if (error) return <p className="text-red-500">{error}</p>;
    return (
        <>
            <SubTitle>我的帳號</SubTitle>
            <Card className='flex flex-col gap-1 bg-white'>
                {isLoading ?
                    <>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <SkeletonBlock className='w-15 aspect-square  rounded-lg object-cover' />
                                <SkeletonBlock className='w-15 h-5' />
                            </div>

                            <img onClick={() => navigate('/profile/edit')} src={IconEdit} alt='edit-user-button' className='w-5 h-5 bg-yellow-500' />
                        </div>
                        <div className='grid grid-cols-3 place-items-center '>
                            <div className='flex flex-col justify-center '>
                                <SkeletonBlock className='w-15 h-5' />
                                <SkeletonBlock className='w-20 h-5' />
                            </div>
                            <div className='flex flex-col justify-center '>
                                <SkeletonBlock className='w-15 h-5' />
                                <SkeletonBlock className='w-20 h-5' />
                            </div>
                            <div className='flex flex-col justify-center '>
                                <SkeletonBlock className='w-15 h-5' />
                                <SkeletonBlock className='w-20 h-5' />
                            </div>
                        </div>
                    </>
                    :

                    <>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <img src={userData.image_url} alt="大頭照" className='w-15 aspect-square border rounded-lg object-cover' />
                                <span>{userData.username}</span>
                            </div>

                            <img onClick={() => navigate('/profile/edit')} src={IconEdit} alt='edit-user-button' className='w-5 h-5 bg-yellow-500' />
                        </div>
                        <div className='grid grid-cols-3 place-items-center '>
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
                    </>
                }
            </Card >



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
            <Card className='grid grid-cols-4 md:grid-cols-8 place-items-center gap-5 bg-white'>
                {

                    isLoading ?
                        Array.from({ length: 16 }).map((_) => (
                            <SkeletonBlock className='w-15 aspect-square' />
                        ))

                        :


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
            <Card className='bg-white'>
                <div onClick={() => setIsDeleteAccountOpen(true)} className='w-full py-2 text-center text-rose-600 cursor-pointer hover:bg-gray-300 rounded-lg transition-all'>
                    <p >清除所有資料</p>
                </div>
            </Card>
            <Modal isOpen={isDeleteAccountOpen} onClose={() => setIsDeleteAccountOpen(false)}>
                <div className='w-full h-min-screen'>
                    <span className='font-bold text-red-500'>確認刪除所有資料？ </span>
                    <div className='flex flex-row justify-end items-center gap-2'>
                        <Button onClick={() => setIsDeleteAccountOpen(false)} className='bg-gray-400 hover:bg-gray-500 text-white'>取消</Button>
                        <Button onClick={() => hanldeResetUserData()} className='bg-red-500 hover:bg-red-700 text-white'>刪除</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Profile