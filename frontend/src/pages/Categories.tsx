import { useEffect, useState } from 'react';
import Card from '../components/Card'
import Icon from '../components/Icon'
import type { CategoryType, CreateCategoryType } from '../types/categories.type';
import { useAuth } from '../context/AuthContext';
import { createCategory, getCategories, getCategoryById, updateCategoryById } from '../services/categories.service';
import DetailLayout from '../layout/DetailLayout';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createCategoryFormSchema } from '../schemas/categories.schema';

const Categories = () => {
    const { token, user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [categoryForm, setCategoryForm] = useState<CreateCategoryType>({
        name: '',
        image_url: ''
    });

    useEffect(() => {
        if (!token || !id) {
            return;
        }

        const fetchCategoryById = async () => {
            try {
                const data = await getCategoryById(token, id);
                console.log(data);
                setCategoryForm({
                    name: data.name,
                    image_url: data.image_url
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchCategoryById();
    }, [token, id]);

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

    const handleSubmit = async () => {
        if (!token) {
            return;
        }
        const result = createCategoryFormSchema.safeParse(categoryForm);
        if (!result.success) {
            console.log(result);
            console.log(result.error.issues)
            result.error.issues.forEach((item) => toast.error(item.message));
            return;
        }
        try {
            let data;
            if (id) {
                data = await updateCategoryById(token, id, categoryForm);
                toast.success('更新類別成功')
                navigate(-1);
            } else {
                data = await createCategory(token, categoryForm);
                toast.success('新增類別成功')
                navigate(-1);
            }
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <DetailLayout title="類別自定義" rightAction={<Button onClick={() => handleSubmit()} className='bg-yellow-500 text-white'>{id ? '更新' : '新增'}</Button>}>
            <div className='flex flex-col items-center gap-5 p-2'>
                <div className='flex flex-row items-center w-20 p-3 aspect-square border-2 border-yellow-500 bg-white rounded-full'> {
                    categoryForm.image_url
                        ?
                        <img src={categoryForm.image_url} className='w-full' />
                        :
                        <span className='w-full text-center text-xs'>選擇照片</span>

                }
                </div>
                <input type="text" name='name' value={categoryForm.name} onChange={handleChange} placeholder='請輸入類別名稱' className='border-b text-center focus:outline-none' />
            </div>

            <Card className='grid grid-cols-4 content-start place-items-center gap-4 h-full bg-gray-200 overflow-y-auto'>
                <Icon className='border-2 border-dashed'>+</Icon>
                {
                    categories.map((category, index) => (
                        <Icon key={index} onClick={() => handleIconClick(category.image_url)} isSelected={categoryForm.image_url === category.image_url} image_url={category.image_url}></Icon>
                    ))
                }
            </Card>

        </DetailLayout>
    )
}

export default Categories