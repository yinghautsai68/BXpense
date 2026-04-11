import { useEffect, useState } from "react"
import Card from "../components/Card"
import Information from "../components/Information"
import { createAccountSchema, type CreateAccountType } from "../schemas/accounts.schema";
import { uploadImage } from "../services/upload.service"
import { useAuth } from "../context/AuthContext"
import { createAccount } from "../services/accounts.service"
import Button from "../components/Button"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { SubTitle, Title } from "../components/Typography"

const NewAccount = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [accountForm, setAccountForm] = useState<CreateAccountType>({
        name: '',
        image_url: '',
        balance: 0
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setAccountForm((prev) => ({ ...prev, [name]: name === 'balance' ? Number(value) : value }));
    }
    const hanldeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!token || !file) {
            return;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
            const data = await uploadImage(token, formData);
            console.log(data);
            setImagePreview(data);
            setAccountForm((prev) => ({ ...prev, image_url: data }));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { console.log(accountForm) }, [accountForm])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token) {
            return;
        }

        const result = createAccountSchema.safeParse(accountForm);

        if (!result.success) {
            console.log(result);
            toast.error(result.error.issues[0].message);
            return;
        }
        try {
            const data = await createAccount(token, accountForm);
            console.log(data);
            toast.success("新增帳戶成功");
        } catch (error) {
            console.error(error);

        }
    }
    return (
        <div className="flex flex-col gap-3 w-full h-screen px-3 py-10 bg-gray-100">
            <div className="flex flex-row   items-center w-full">
                <span onClick={() => navigate('/accounts')} className="w-full cursor-pointer ">back</span>
                <SubTitle className="w-full text-center font-medium">新增帳戶</SubTitle>
                <div className="w-full"></div>

            </div>
            <Card >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Information label="帳戶名稱" name='name' value={accountForm.name} type="text" onChange={handleChange}></Information>
                    <Information label="帳戶照片" name='image_url' value={imagePreview ?? ''} type="file" onChange={hanldeUpload}></Information>
                    <Information label="當前餘額" name='balance' value={accountForm.balance} type="number" onChange={handleChange}></Information>
                    <Button className="bg-yellow-500">新增</Button>
                </form>
            </Card>
        </div>
    )
}

export default NewAccount