import { useEffect, useState, type ChangeEvent } from 'react';
import Card from '../components/Card'
import Icon from '../components/Icon'
import type { CategoryType, CreateCategoryType } from '../types/categories.type';
import { useAuth } from '../context/AuthContext';
import { getCategories } from '../services/categories.service';
import DetailLayout from '../layout/DetailLayout';
import Button from '../components/Button';

const Categories = () => {
    const { token, user } = useAuth();

    const [categoryForm, setCategoryForm] = useState<CreateCategoryType>({
        name: '',
        image_url: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setCategoryForm((prev) => ({ ...prev, [name]: value }));
    }

    const [categories, setCategories] = useState<CategoryType[]>([]);
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
    }, [token, user])

    const handleIconClick = (imageUrl: string) => {
        console.log(imageUrl);
        setCategoryForm((prev) => ({ ...prev, image_url: imageUrl }));
    }
    return (
        <DetailLayout title="類別自定義" rightAction={<Button className='bg-yellow-500 text-white'>新增</Button>}>
            <div className='flex flex-col bg-gray-200'>
                <div className='grid grid-cols-2'>
                    <span className='text-center'>支出</span>
                    <span className='text-center'>收入</span>
                </div>
                <div className='flex flex-col items-center gap-5 p-2'>
                    <img src={categoryForm.image_url} className='w-20 p-3 aspect-square border-2 border-yellow-500 bg-white rounded-full' />
                    <input type="text" name='name' value={categoryForm.name} onChange={handleChange} placeholder='請輸入類別名稱' className='border-b text-center focus:outline-none' />
                </div>

                <Card className='grid grid-cols-4 content-start place-items-center gap-4 h-full bg-gray-200'>
                    {
                        categories.map((category, index) => (

                            <Icon key={index} onClick={() => handleIconClick(category.image_url)} isSelected={categoryForm.image_url === category.image_url} image_url={category.image_url}></Icon>

                        ))
                    }
                </Card>
            </div >
        </DetailLayout>
    )
}

export default Categories