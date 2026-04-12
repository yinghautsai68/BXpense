import RecordTag from '../components/RecordTag'
import CalculatorButton from '../components/CalculatorButton'
import { SubTitle } from '../components/Typography'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { createRecordType, RecordType } from '../types/records.type'
import { createRecord } from '../services/records.service'
import Button from '../components/Button'
import { useUtil } from '../context/UtilContext'
import { getCategories } from '../services/categories.service'
import type { CategoryType } from '../types/categories.type'
import { useRecordStore } from '../store/recordStore'
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

    const { formatDateTime } = useUtil();
    const currentDateTime = () => {
        const now = new Date();
        return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
    };

    const { recordForm, setRecordForm } = useRecordStore();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setRecordForm({ [name]: name === 'amount' ? Number(value) : value });
    }
    const selectedAccountId = useRecordStore((state) => state.selectedAccountId);
    useEffect(() => {
        if (!selectedAccountId) {
            return;
        }
        setRecordForm(({ account_id: selectedAccountId }));
    }, [selectedAccountId]);


    const [record, setRecord] = useState<RecordType | null>(null);
    const [categories, setCategories] = useState<CategoryType | null>(null);

    useEffect(() => {
        if (!user) {
            return;
        }
        setRecordForm({ user_id: Number(user.userId) });

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
            } catch (error) {
                console.error(error);
            }
        }
        fetchAccounts();

    }, [token, id]);

    const handleTypeSelect = (newType: 'expense' | 'income') => {
        setRecordForm({ type: newType });
    }



    const selectedAccount = accounts?.find((account) => account.id === selectedAccountId);
    const selectedAccountName = selectedAccount?.name;

    const handleSelectCategory = (categoryId: number) => {
        setRecordForm({ category_id: categoryId });
    }

    useEffect(() => { console.log(recordForm) }, [recordForm])



    const [expression, setExpression] = useState("");

    const handleDelete = () => {
        setExpression((prev) => prev.slice(0, -1));
    };
    const add = () => setExpression((prev) => prev + "+");
    const subtract = () => setExpression((prev) => prev + "-");
    const multiply = () => setExpression((prev) => prev + "*");
    const divide = () => setExpression((prev) => prev + "/");
    const handleClear = () => {
        setExpression("");
    }
    const appendValue = (val: string) => {
        setExpression((prev) => prev + val);
    };
    useEffect(() => {
        if (expression === "") {
            return;
        }
        const parsedExpression = Number(expression);

        if (!isNaN(parsedExpression)) {
            setRecordForm({ amount: parsedExpression });
        }

    }, [expression]);
    const calculate = () => {
        try {
            const result = eval(expression);
            setExpression(String(result));
            setRecordForm({ amount: Number(result) });
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
        if (recordForm.amount <= 0) {
            toast.error("請輸入合理金額");
            return;
        }
        try {
            if (!token) {
                return;
            }
            const data = await createRecord(token, recordForm);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className='flex flex-col gap-2 w-full h-screen pt-10 bg-yellow-400'>
            <span className='px-10'>X</span>
            <div className='flex flex-col gap-4 pt-4 rounded-t-xl bg-white'>
                <div className='flex flex-row justify-center items-center gap-10 w-full'>
                    <span onClick={() => handleTypeSelect('expense')} className={`px-2 py-1  ${recordForm.type === 'expense' ? 'bg-yellow-500 rounded-lg' : ''} transition-all duration-300 `}>支出</span>
                    <span onClick={() => handleTypeSelect('income')} className={`px-2 py-1 ${recordForm.type === 'income' ? ' bg-yellow-500 rounded-lg' : ''} transition-all duration-300 `}>收入</span>
                </div>

                <div className='flex flex-col gap-2 w-full  px-4 pb-60'>
                    <SubTitle>類別</SubTitle>
                    <div className='grid grid-cols-4 gap-4   overflow-y-scroll'>

                        {categories && categories.map((category, index) => (
                            <RecordTag onClick={() => handleSelectCategory(category.id)} key={index} category={category} isSelected={recordForm.category_id === category.id} ></RecordTag>
                        ))}

                    </div>
                </div>
                <div className='fixed left-0 bottom-0 flex flex-col gap-2 w-full h-[40%] px-2 pt-2 bg-gray-300 rounded-t-xl'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row items-center gap-1 '>
                            <Button onClick={() => setAccountModalOpen(true)} className='px-1 border border-black bg-white text-xs'>{selectedAccountName || '選擇帳戶'}</Button>
                            <input type='datetime-local' name='record_date' value={recordForm.record_date} onChange={handleChange} className='px-1 py-1 border border-black rounded-lg bg-white text-xs' />
                        </div>
                        <Button onClick={() => handleSubmit()} className='px-4 bg-yellow-500 text-xs'>新增</Button>
                    </div>
                    <div className='flex flex-row justify-between items-center w-full bg-white rounded-lg'>
                        <input type="text" name='remarks' value={recordForm.remarks} onChange={handleChange} placeholder='備註' className='w-full px-2' />
                        <input type="text" name='amount' value={expression} onChange={handleChange} placeholder='0' className='w-full px-2 text-end' />
                    </div>
                    <div className='flex fl     ex-row gap-1 w-full'>
                        <div className='grid grid-cols-3 gap-1 w-[70%]'>
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
                        <div className='grid gird-cols-2 gap-1 w-[30%]  '>
                            <CalculatorButton onClick={handleDelete} >delete</CalculatorButton>
                            <CalculatorButton onClick={handleClear} >AC</CalculatorButton>
                            <CalculatorButton onClick={add}>+</CalculatorButton>
                            <CalculatorButton onClick={multiply}>*</CalculatorButton>
                            <CalculatorButton onClick={subtract}>-</CalculatorButton>
                            <CalculatorButton onClick={divide}>/</CalculatorButton>
                            <CalculatorButton onClick={calculate} className='col-span-2 bg-yellow-400'>=</CalculatorButton>
                        </div>
                    </div>
                </div>
            </div>



            {
                accountModalOpen &&
                (
                    <Modal isOpen={accountModalOpen} onClose={() => setAccountModalOpen(false)}>
                        <AccountSelector />
                    </Modal>
                )
            }
        </div >
    )
}

export default RecordForm;