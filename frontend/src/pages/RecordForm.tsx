import RecordTag from '../components/RecordTag'
import CalculatorButton from '../components/CalculatorButton'
import { SubTitle, Title } from '../components/Typography'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { createRecordType, RecordType } from '../types/records.type'
import { createRecord, getRecordById, updateRecordById } from '../services/records.service'
import Button from '../components/Button'
import { useUtil } from '../context/UtilContext'
import { getCategories } from '../services/categories.service'
import type { CategoryType } from '../types/categories.type'
import { getAccounts } from '../services/accounts.service'
import type { AccountType } from '../types/accounts.type'
import toast from 'react-hot-toast'
import AccountSelector from './AccountSelector'
import Modal from '../components/Modal'

const RecordForm = () => {
    const { token, user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [accountModalOpen, setAccountModalOpen] = useState<boolean>(false);



    const [recordForm, setRecordForm] = useState<createRecordType>({
        user_id: 0,
        account_id: 0,
        category_id: 0,
        type: 'expense',
        amount: 0,
        remarks: '',
        record_date: new Date().toISOString().slice(0, 16),
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setRecordForm((prev) => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
    }

    useEffect(() => {
        if (!token || !id) {
            return;
        }

        const fetchRecordById = async () => {
            try {
                const data = await getRecordById(token, id);
                setRecordForm({
                    user_id: data.user_id,
                    account_id: data.account_id,
                    category_id: data.category_id,
                    type: data.type,
                    amount: data.amount,
                    remarks: data.remarks,
                    record_date: data.record_date.slice(0, 16)
                });
                setExpression(String(data.amount));
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecordById();
    }, [token, id])

    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        if (!user) {
            return;
        }
        setRecordForm((prev) => ({ ...prev, user_id: Number(user.userId) }));

    }, [user]);

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchCategories = async () => {
            try {
                const data = await getCategories(token, user ? user.userId : '');
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
                setRecordForm((prev) => ({ ...prev, account_id: data[0].id }));
            } catch (error) {
                console.error(error);
            }
        }
        fetchAccounts();

    }, [token, user]);

    const handleTypeSelect = (newType: 'expense' | 'income') => {
        setRecordForm((prev) => ({ ...prev, type: newType }));
    }


    const handleSelectAccount = (accountId: number) => {
        setRecordForm((prev) => ({ ...prev, account_id: accountId }));
    };
    const selectedAccount = accounts?.find((account) => account.id === recordForm.account_id);
    const selectedAccountName = selectedAccount?.name;

    const handleSelectCategory = (categoryId: number) => {
        setRecordForm((prev) => ({ ...prev, category_id: categoryId }));
    }

    useEffect(() => { console.log(recordForm) }, [recordForm])



    const [expression, setExpression] = useState("");
    const appendValue = (val: string) => {
        setExpression((prev) => prev + val);
    };
    useEffect(() => {
        setRecordForm((prev) => ({ ...prev, amount: Number(expression) }));
    }, [expression]);
    const handleDelete = () => {
        setExpression((prev) => prev.slice(0, -1));
    };
    const handleClear = () => {
        setExpression("");
    }


    const add = () => setExpression((prev) => prev + "+");
    const subtract = () => setExpression((prev) => prev + "-");
    const multiply = () => setExpression((prev) => prev + "*");
    const divide = () => setExpression((prev) => prev + "/");


    const calculate = () => {
        try {
            const result = eval(expression);

            setExpression(String(result));

            setRecordForm((prev) => ({ ...prev, amount: Number(result) }));
        } catch {
            setExpression("Error");
        }
    };

    const handleSubmit = async () => {
        if (recordForm.account_id === 0) {
            toast.error("請選擇帳戶");
            return;
        }
        if (recordForm.category_id === 0) {
            toast.error("請選擇類別");
            return;
        }
        if (isNaN(recordForm.amount)) {
            toast.error("請輸入合理金額");
            return;
        }
        if (recordForm.amount <= 0) {
            toast.error("請輸入合理金額");
            return;
        }
        try {
            if (!token) {
                return;
            }
            let data;
            if (id) {
                data = await updateRecordById(token, id, recordForm);
                console.log(data);
                toast.success("更新紀錄成功");
                return navigate(`/records`)
            } else {
                data = await createRecord(token, recordForm);
                console.log(data);
                return toast.success("新增紀錄成功");
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        //background
        <div className=' flex flex-col items-center  w-full min-h-screen  pt-10 bg-yellow-400'>
            {/*parent container*/}
            <div className='relative flex flex-col items-center gap-2 xl:gap-0 w-full max-w-2xl flex-1 xl:border-5 xl:border-dashed'>
                {/*title container*/}
                <div className='flex flex-row items-center gap-5 w-full h-full pl-5 xl:pt-10 bg-yellow-400 xl:bg-neutral-100 '>
                    <span onClick={() => navigate(-1)} className='text-2xl font-bold text-white  xl:text-black/70 cursor-pointer'>x</span>
                    <Title className='text-white  xl:text-black/70'>{id ? '更新紀錄' : '新增紀錄'}</Title>
                </div>
                {/*contents container*/}
                <div className='flex flex-col gap-4 w-full flex-1  xl:px-5  pt-4 pb-75 xl:pb-10  bg-neutral-100 rounded-xl  xl:rounded-none  '>
                    <div className='flex flex-row justify-center items-center gap-10 w-full h-full'>
                        <span onClick={() => handleTypeSelect('expense')} className={`px-2 py-1 cursor-pointer  ${recordForm.type === 'expense' ? 'bg-yellow-500 rounded-lg text-white' : ''} transition-all duration-300 `}>支出</span>
                        <span onClick={() => handleTypeSelect('income')} className={`px-2 py-1 cursor-pointer  ${recordForm.type === 'income' ? ' bg-yellow-500 rounded-lg text-white' : ''} transition-all duration-300 `}>收入</span>
                    </div>
                    <div className='flex flex-col gap-2 w-full flex-1  px-4'>
                        <SubTitle>類別</SubTitle>
                        <div className='grid grid-cols-4 md:grid-cols-6 gap-4 overflow-hidden'>
                            {categories?.map((category, index) => (
                                <RecordTag onClick={() => handleSelectCategory(category.id)} key={index} category={category} isSelected={recordForm.category_id === category.id} ></RecordTag>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/*Calculator*/}
            <div className=' fixed left-1/2 -translate-x-1/2  bottom-0  
                xl:left-auto xl:-translate-x-0  xl:right-5 xl:bottom-5
                flex flex-col gap-2 w-full max-w-2xl xl:w-sm  max-h-[280px] px-2 pt-3 pb-3 bg-white xl:border-10 xl:border-double rounded-t-xl md:rounded-xl'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <div className='flex flex-row items-center gap-1 '>
                        <Button onClick={() => setAccountModalOpen(true)} className='px-1 border border-black bg-white text-xs'>{selectedAccountName || '選擇帳戶'}</Button>
                        <input type='datetime-local' name='record_date' value={recordForm.record_date} onChange={handleChange} className='px-1 py-1 border border-black rounded-lg bg-white text-xs' />
                    </div>
                    <Button onClick={() => handleSubmit()} className='px-4 bg-yellow-500 text-sm font-medium text-white'>{id ? '更新' : '新增'}</Button>
                </div>
                <div className='flex flex-row divide-x-2 divide-gray-300 justify-between items-center w-full py-2 bg-gray-100 rounded-lg'>
                    <input type="text" name='remarks' value={recordForm.remarks} onChange={handleChange} placeholder='備註' className='w-full px-2 focus:outline-none' />
                    <input type="text" name='amount' value={expression} onChange={handleChange} placeholder='0' className='w-full px-2 text-end focus:outline-none' />
                </div>
                <div className='flex flex-row gap-1 w-full'>
                    <div className='grid grid-cols-3 gap-1 flex-2 '>
                        <CalculatorButton onClick={() => appendValue("7")}>7</CalculatorButton>
                        <CalculatorButton onClick={() => appendValue("8")}>8</CalculatorButton>
                        <CalculatorButton onClick={() => appendValue("9")}>9</CalculatorButton>

                        <CalculatorButton onClick={() => appendValue("4")}>4</CalculatorButton>
                        <CalculatorButton onClick={() => appendValue("5")}>5</CalculatorButton>
                        <CalculatorButton onClick={() => appendValue("6")}>6</CalculatorButton>

                        <CalculatorButton onClick={() => appendValue("1")}>1</CalculatorButton>
                        <CalculatorButton onClick={() => appendValue("2")}>2</CalculatorButton>
                        <CalculatorButton onClick={() => appendValue("3")}>3</CalculatorButton>

                        <CalculatorButton onClick={() => appendValue("0")}>0</CalculatorButton>
                        <CalculatorButton onClick={() => appendValue(".")}>.</CalculatorButton>
                        <CalculatorButton>今天</CalculatorButton>
                    </div>
                    <div className='grid gird-cols-2 gap-1 flex-1  '>
                        <CalculatorButton onClick={handleDelete} >delete</CalculatorButton>
                        <CalculatorButton onClick={handleClear} >AC</CalculatorButton>
                        <CalculatorButton onClick={add}>+</CalculatorButton>
                        <CalculatorButton onClick={multiply}>x</CalculatorButton>
                        <CalculatorButton onClick={subtract}>-</CalculatorButton>
                        <CalculatorButton onClick={divide}>/</CalculatorButton>
                        <CalculatorButton onClick={calculate} className='col-span-2 bg-yellow-400 text-white  font-bold'>=</CalculatorButton>
                    </div>
                </div>
            </div>

            <Modal isOpen={accountModalOpen} onClose={() => setAccountModalOpen(false)}>
                <AccountSelector onClose={() => setAccountModalOpen(false)} handleSelectAccount={handleSelectAccount} />
            </Modal>
        </div >
    )
}

export default RecordForm;