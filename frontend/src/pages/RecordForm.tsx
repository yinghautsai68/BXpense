import RecordTag from '../components/RecordTag'
import CalculatorButton from '../components/CalculatorButton'
import { SubTitle } from '../components/Typography'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { createRecordType, RecordType } from '../types/records.type'
import { getRecordById } from '../services/records.service'
import Button from '../components/Button'
import { useUtil } from '../context/UtilContext'
import { getCategories } from '../services/categories.service'
import type { CategoryType } from '../types/categories.type'
import { useRecordStore } from '../store/recordStore'
import { getAccounts } from '../services/accounts.service'
import type { AccountType } from '../types/accounts.type'

const RecordForm = () => {
    const { token, user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const { formatDateTime } = useUtil();
    const [recordForm, setRecordForm] = useState<createRecordType>({
        account_id: 0,
        category_id: 0,
        type: 'expense',
        amount: 0,
        remarks: '',
        record_date: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setRecordForm((prev) => ({ ...prev, [name]: value }));
    }
    const selectedAccountId = useRecordStore((state) => state.selectedAccountId);
    useEffect(() => {
        if (!selectedAccountId) {
            return;
        }
        setRecordForm((prev) => ({ ...prev, account_id: selectedAccountId }))
    }, [selectedAccountId]);


    const [record, setRecord] = useState<RecordType | null>(null);
    const [categories, setCategories] = useState<CategoryType | null>(null);

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchCategories = async () => {
            try {
                const data = await getCategories(token, user?.userId || null);
                console.log(data);
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCategories();
    }, [token]);

    const [accounts, setAccounts] = useState<AccountType[] | null>(null);
    useEffect(() => {
        if (!token || !user) {
            return;
        }
        const fetchAccounts = async () => {
            try {
                const data = await getAccounts(token, user.userId);
                console.log(data);
                setAccounts(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAccounts();

    }, [token, id]);

    const selectedAccount = accounts?.find((account) => account.id === selectedAccountId);
    const selectedAccountName = selectedAccount?.name;




    useEffect(() => { console.log(recordForm) }, [recordForm])

    return (
        <div className='flex flex-col gap-2 w-full h-screen pt-10 bg-yellow-400'>
            <span className='px-10'>X</span>
            <div className='flex flex-col gap-4 pt-4 rounded-t-xl bg-white'>
                <div className='flex flex-row justify-center items-center gap-10 w-full'>
                    <span className={`${record?.type === 'expense' ? 'px-2 py-1 bg-yellow-500 rounded-lg' : ''} `}>支出</span>
                    <span className={`${record?.type === 'income' ? 'px-2 py-1 bg-yellow-500 rounded-lg' : ''} `}>收入</span>
                </div>

                <div className='flex flex-col gap-2 w-full  px-4 pb-60'>
                    <SubTitle>類別</SubTitle>
                    <div className='grid grid-cols-4 gap-4   overflow-y-scroll'>

                        {categories && categories.map((category, index) => (
                            <RecordTag onClick={() => console.log(`selected ${category.id}`)} key={index} category={category} ></RecordTag>

                        ))}

                    </div>
                </div>
                <div className='fixed left-0 bottom-0 flex flex-col gap-2 w-full h-[40%] px-2 pt-2 bg-gray-300 rounded-t-xl'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row items-center gap-1'>
                            <Button onClick={() => navigate('/select-account')} className='px-2 border border-black bg-white text-xs'>{selectedAccountName}</Button>
                            <Button className='px-2 border border-black bg-white text-xs'>date</Button>
                        </div>
                        <Button className='px-4 bg-yellow-500 text-xs'>新增</Button>
                    </div>
                    <input type="" name='amount' value={recordForm.amount} onChange={handleChange} placeholder='0' className='w-full px-4 py-2  bg-white rounded-lg text-end' />
                    <div className='flex flex-row gap-1 w-full'>
                        <div className='grid grid-cols-3 gap-1 w-[70%]'>
                            <CalculatorButton>7</CalculatorButton>
                            <CalculatorButton>8</CalculatorButton>
                            <CalculatorButton>9</CalculatorButton>
                            <CalculatorButton>4</CalculatorButton>
                            <CalculatorButton>5</CalculatorButton>
                            <CalculatorButton>6</CalculatorButton>
                            <CalculatorButton>1</CalculatorButton>
                            <CalculatorButton>2</CalculatorButton>
                            <CalculatorButton>3</CalculatorButton>
                            <CalculatorButton>.</CalculatorButton>
                            <CalculatorButton>0</CalculatorButton>
                            <CalculatorButton>今天</CalculatorButton>
                        </div>
                        <div className='grid gird-cols-2 gap-1 w-[30%]  '>
                            <CalculatorButton className='col-span-2'>delete</CalculatorButton>
                            <CalculatorButton>+</CalculatorButton>
                            <CalculatorButton>*</CalculatorButton>
                            <CalculatorButton>-</CalculatorButton>
                            <CalculatorButton>/</CalculatorButton>
                            <CalculatorButton className='col-span-2 bg-yellow-400'>//</CalculatorButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecordForm;