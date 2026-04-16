import { useRef, useState } from "react"
import FormInput from "../components/FormInput"
import { SubTitle, Title } from "../components/Typography"
import type { RegisterType } from "../types/auth.types"
import Button from "../components/Button"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


const Register = () => {
    const navigate = useNavigate();

    const [registerFormData, setRegisterFormData] = useState<RegisterType>({
        username: "",
        password: "",
        confirmPassword: "",
        image_url: ""
    });
    const formData = new FormData();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const isPasswordMatch = registerFormData.password === registerFormData.confirmPassword;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setRegisterFormData((prev) => ({ ...prev, [name]: value }));

    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        setPreviewImage(URL.createObjectURL(file));
        formData.append("image", file);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            //console.log(result);
            console.log(result.message);
            setRegisterFormData((prev) => ({ ...prev, image_url: result.image_url }));
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerFormData)
            });
            const result = await response.json();
            if (!result.success) {
                return toast.error(result.message);
            }
            console.log(result);
            toast.success(result.message);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="relative flex flex-col gap-6 w-full h-full  px-4 pt-15 pb-30 ">
            <div className="flex flex-row items-center gap-1">
                <div className="w-5 aspect-square bg-amber-600"></div>
                <Title>BXpense</Title>
            </div>
            <div>
                <Title>歡迎註冊</Title>
                <SubTitle>請提供基本資料以註冊</SubTitle>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <FormInput onChange={handleChange} label="使用者" name="username" value={registerFormData.username} type="text" placeholder="example_123" required={true} />
                <FormInput onChange={handleChange} label="密碼" name="password" value={registerFormData.password} type="password" placeholder="********" required={true} />
                {registerFormData.confirmPassword && !isPasswordMatch &&
                    <span className="text-rose-400">密碼不一致!</span>
                }
                <FormInput onChange={handleChange} label="確認密碼" name="confirmPassword" value={registerFormData.confirmPassword} type="password" placeholder="********" required={true} />

                <FormInput ref={fileInputRef} onChange={handleFileChange} label="照片" name="image_url" type="file" required={false} />
                <div className="flex flex-row justify-center items-center w-full">
                    <div onClick={() => fileInputRef.current?.click()} className="flex flex-row justify-center items-center w-32 h-32 border rounded-lg bg-zinc-100">
                        {
                            previewImage ?
                                <img src={previewImage} alt="預覽" className=" w-full h-full rounded-lg" />
                                :
                                <span>照片預覽</span>
                        }
                    </div>
                </div>



                <Button className="bg-yellow-500 hover:bg-yellow-700">註冊</Button>
                <span>已經有帳號？ <span onClick={() => navigate('/login')} className="text-yellow-500 font-bold cursor-pointer">登入！</span></span>
            </form>

            <div className="absolute left-0 bottom-0 w-full h-[10%] bg-yellow-400">

            </div>
        </div>
    )
}

export default Register