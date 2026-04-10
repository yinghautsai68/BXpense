import { useState } from "react"
import FormInput from "../components/FormInput"
import { SubTitle, Title } from "../components/Typography"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { LoginType } from "../types/auth.types";
import Button from "../components/Button";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState<LoginType>({
        username: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setLoginFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginFormData)
            });
            const result = await response.json();
            if (!result.success) {
                return toast.error(result.message);
            }
            //console.log(result);
            toast.success(result.message);
            login(result.token);
            navigate('/records');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col gap-6 px-4 pt-15">
            <div className="flex flex-row items-center gap-1">
                <div className="w-5 aspect-square bg-amber-600"></div>
                <Title>BXpense</Title>
            </div>
            <div className="flex flex-col gap-1">
                <Title>你好! </Title>
                <Title>準備開始記錄？</Title>
                <SubTitle>請登入您的帳號以使用.</SubTitle>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full px-4" >
                <FormInput onChange={handleChange} label="使用者" name="username" value={loginFormData.username} type="text" placeholder="example_123" required={true} />
                <FormInput onChange={handleChange} label="密碼" name="password" value={loginFormData.password} type="password" placeholder="********" required={true} />
                <Button className="bg-yellow-500 hover:bg-yellow-700">登入</Button>
            </form>

            <div className="fixed left-0 bottom-0 w-full h-[20%] bg-yellow-400">

            </div>
        </div>
    )
}

export default Login