import { useEffect, useRef, useState } from 'react';
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
import { uploadImage } from '../services/upload.service';

const Categories = () => {
    const { token, user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement | null>(null);


    const [categoryForm, setCategoryForm] = useState<CreateCategoryType>({
        name: '',
        image_url: ''
    });

    const [previewImage, setPreviewImage] = useState<string>('');
    useEffect(() => { setPreviewImage(categoryForm.image_url) }, [categoryForm]);
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

    const handleUploadIcon = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!token || !file) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const data = await uploadImage(token, formData);
            console.log(data);
            setCategoryForm((prev) => ({ ...prev, image_url: data }));
            setPreviewImage(data);

        } catch (error) {
            console.error(error);
        }
    }

    const ICONS = [
        {
            id: "food",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-food.png",
        },
        {
            id: "drink",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-drink.png",
        },
        {
            id: "transportation",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-transporation.png",
        },
        {
            id: "phone",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-phone.png",
        },
        {
            id: "meat",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-meat.png",
        },
        {
            id: "fruit",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-fruit.png",
        },
        {
            id: "vegetable",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-vegetable.png",
        },
        {
            id: "social",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-social.png",
        },
        {
            id: "daily_use",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-daily-use.png",
        },
        {
            id: "clothes",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-clothes.png",
        },
        {
            id: "cosmetics",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-cosmetics.png",
        },
        {
            id: "bag",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-bag.png",
        },
        {
            id: "entertainment",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-entertainment.png",
        },
        {
            id: "wifi_bill",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-wifi-bill.png",
        },
        {
            id: "water_bill",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/cateogry-water-bill.png",
        },
        {
            id: "electric_bill",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-electric-bill.png",
        },
        {
            id: "rent_bill",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-rent-bill.png",
        },
        {
            id: "travel",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-travel.png",
        },
        {
            id: "game",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-game.png",
        },
        {
            id: "workout",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-workout.png",
        },
        {
            id: "education",
            image_url: "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-education.png",
        },
    ];
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
                        <img src={previewImage} className='w-full aspect-square rounded-full object-cover' />
                        :
                        <span className='w-full text-center text-xs'>選擇照片</span>

                }
                </div>
                <input type="text" name='name' value={categoryForm.name} onChange={handleChange} placeholder='請輸入類別名稱' className='border-b text-center focus:outline-none' />
            </div>

            <Card className='grid grid-cols-4 content-start place-items-center gap-4 h-full bg-gray-200 overflow-y-auto'>
                <Icon onClick={() => fileRef.current?.click()} className='border-2 border-dashed'>+</Icon>
                <input ref={fileRef} type="file" onChange={handleUploadIcon} className='hidden' />
                {
                    ICONS.map((icon, index) => (
                        <Icon key={index} onClick={() => handleIconClick(icon.image_url)} isSelected={categoryForm.image_url === icon.image_url} image_url={icon.image_url}></Icon>
                    ))
                }
            </Card>

        </DetailLayout>
    )
}

export default Categories