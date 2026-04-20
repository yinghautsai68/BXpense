import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal"
import { SubTitle } from "./Typography";

type DatePickerModalProps = {
    isOpen: boolean,
    onClose: () => void,
    selectedYear: string,
    setSelectedYear: (year: string) => void,
    selectedMonth: string,
    setSelectedMonth: (month: string) => void,

}
const DatePickerModal = ({ isOpen, onClose, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }: DatePickerModalProps) => {
    const [tempSelectedYear, setTempSelectedYear] = useState<string>(selectedYear);
    const [tempSelectedMonth, setTempSelectedMonth] = useState<string>(selectedMonth);

    const handleNext = () => {
        setTempSelectedYear((prev) => String(Number(prev) + 1));
    };
    const handlePrev = () => {
        setTempSelectedYear((prev) => String(Number(prev) - 1));
    };
    const handleConfirmDate = () => {
        setSelectedYear(tempSelectedYear);
        setSelectedMonth(tempSelectedMonth);
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='flex flex-row justify-center items-center gap-5'>
                <Button onClick={() => handlePrev()}>L</Button>
                <SubTitle className='text-center'>{tempSelectedYear}</SubTitle>

                <Button onClick={() => handleNext()}>R</Button>
            </div>
            <div className='flex flex-row justify-center '>
                <div className='grid grid-cols-3 place-items-center gap-5 w-50  '>
                    {Array.from({ length: 12 }).map((_, index) => {
                        const month = index + 1;
                        const formatMonth = String(month).padStart(2, "0");
                        const yearMonth = `2026-${formatMonth}`;
                        return (
                            <Button onClick={() => setTempSelectedMonth(yearMonth)} className={`w-15 bg-gray-200 hover:bg-gray-400 font-bold ${yearMonth === tempSelectedMonth ? 'bg-gray-500 text-white' : ''}`}>{index + 1} 月</Button>
                        )
                    })}

                </div>
            </div>
            <div className='flex flex-row justify-around items-center'>
                <Button onClick={() => onClose()} className='bg-gray-500 hover:bg-gray-800 text-white'>取消</Button>
                <Button onClick={() => handleConfirmDate()} className='bg-yellow-500 hover:bg-yellow-600'>確認</Button>
            </div>
        </Modal>
    )
}

export default DatePickerModal