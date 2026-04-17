import { useEffect, useState } from "react"
import Card from "../components/Card"
import Information from "../components/Information"
import { createAccountSchema, updateAccountSchema, type CreateAccountType } from "../schemas/accounts.schema";
import { uploadImage } from "../services/upload.service"
import { useAuth } from "../context/AuthContext"
import { createAccount, getAccountById, updateAccountById } from "../services/accounts.service"
import Button from "../components/Button"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"


const AccountForm = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [accountForm, setAccountForm] = useState<CreateAccountType>({
        name: '',
        image_url: '',
        balance: 0
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (!token || !id) {
            return;
        }
        const fetchAccountById = async () => {
            try {
                const data = await getAccountById(token, id);
                console.log(data);
                setAccountForm({
                    name: data.name,
                    image_url: data.image_url,
                    balance: data.balance
                })
                setImagePreview(data.image_url);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAccountById()
    }, [token, id]);

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

        let result;
        if (id) {
            result = updateAccountSchema.safeParse(accountForm);
        } else {
            result = createAccountSchema.safeParse(accountForm);
        }


        if (!result.success) {
            console.log(result);
            toast.error(result.error.issues[0].message);
            return;
        }
        try {

            let data;
            if (id) {
                data = await updateAccountById(token, id, accountForm);
                console.log(data);
                toast.success("更新帳戶成功");
                navigate(-1);
            } else {
                data = await createAccount(token, accountForm);
                toast.success("新增帳戶成功");
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col justify-between w-full flex-1">
                <Card className="flex flex-col gap-5 w-full bg-white">
                    <Information label="帳戶名稱" name='name' value={accountForm.name} type="text" onChange={handleChange}></Information>
                    <Information label="帳戶照片" name='image_url' value={imagePreview ?? ''} type="file" onChange={hanldeUpload}></Information>
                    <Information label="當前餘額" name='balance' value={accountForm.balance} type="number" onChange={handleChange}></Information>
                </Card>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">{id ? '更新' : '新增'}</Button>
            </form>
        </>
    )
}

export default AccountForm