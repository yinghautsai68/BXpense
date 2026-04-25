import { useEffect, useRef, useState } from "react";
import FormInput from "../components/FormInput"
import { useAuth } from "../context/AuthContext";
import { getMyProfile, updateUser } from "../services/user.service";
import type { EditUserFormType, User } from "../types/users.types";
import Button from "../components/Button";
import { SubTitle } from "../components/Typography";
import { useUtil } from "../context/UtilContext";
import toast from "react-hot-toast";
import { updateUserSchema } from "../schemas/users.schema";
import { uploadImage } from "../services/upload.service";
import { useNavigate } from "react-router-dom";
import SkeletonBlock from "./SkeletonBlock";

const EditProfile = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const { formatDateTime } = useUtil();
    const imageRef = useRef<HTMLInputElement | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<User>({
        username: '',
        image_url: '',
        created_at: '',
        updated_at: ''
    });

    const [formData, setFormData] = useState<EditUserFormType>({
        username: '',
        image_url: '',
        password: '',
        confirmPassword: ''
    });
    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const data = await getMyProfile(token);
                console.log(data);
                setUserData(data);
                setFormData({
                    username: data.username,
                    image_url: data.image_url,
                    password: '',
                    confirmPassword: '',
                });
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserData();
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        console.log(name, value);
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !token) {
            return;
        }

        const imageFormData = new FormData();
        imageFormData.append('image', file)

        const data = await uploadImage(token, imageFormData);
        setFormData((prev) => ({ ...prev, image_url: data }))


    }
    const handleSubmit = async () => {
        if (!token || !user) {
            return;
        }

        const result = updateUserSchema.safeParse(formData);
        if (!result.success) {
            result.error.issues.forEach((err) => {
                toast.error(err.message);
            });
            return;
        }
        try {
            const data = await updateUser(token, user?.userId, formData);
            console.log(data);
            toast.success(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='flex flex-col justify-start items-center gap-5 flex-1'>
            <div className="flex flex-row justify-start w-full">
                <Button onClick={() => navigate(-1)} className="bg-gray-300">回上一頁</Button>
            </div>
            {
                isLoading ?
                    <>
                        <div className="flex flex-row justify-start items-center w-full max-w-md">
                            <span className="font-bold">照片</span>
                        </div>
                        <SkeletonBlock className="w-45 aspect-square" />
                    </>
                    :
                    <>
                        <FormInput ref={imageRef} label="照片" name="image_url" type="file" onChange={handleImageChange} required={true} ></FormInput>
                        <img onClick={() => imageRef.current?.click()} src={formData.image_url} alt="" className='w-45 aspect-square rounded-xl object-cover cursor-pointer' />
                    </>
            }
            <FormInput label="名稱" name="username" value={formData.username} type="text" onChange={handleChange} required={true} ></FormInput>
            <FormInput label="密碼" name="password" value={formData.password} type="password" onChange={handleChange} required={true} ></FormInput>
            <FormInput label="確認密碼" name="confirmPassword" value={formData.confirmPassword} type="password" onChange={handleChange} required={true} ></FormInput>
            <Button onClick={() => handleSubmit()} className="w-full max-w-md bg-yellow-500 hover:bg-yellow-700">更新資料</Button>
            {
                isLoading ?
                    <>
                        <SubTitle>創造時間</SubTitle>
                        <SkeletonBlock className="w-45 h-5" />
                        <SubTitle>最後一次更新時間</SubTitle>
                        <SkeletonBlock className="w-45 h-5" />
                    </> :
                    <>
                        <SubTitle>創造時間</SubTitle>
                        <span>{formatDateTime(userData.created_at)}</span>
                        <SubTitle>最後一次更新時間</SubTitle>
                        <span>{formatDateTime(userData.updated_at)}</span>
                    </>
            }
        </div>
    )
}

export default EditProfile