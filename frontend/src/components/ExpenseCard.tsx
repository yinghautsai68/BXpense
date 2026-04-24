import { Link } from "react-router-dom";
import { useUtil } from "../context/UtilContext";
import type { RecordType } from "../types/records.type";
import { categoryZhTW } from "../constants/categoryZhTW";


type ExpenseCardProps = {
    record: RecordType
};

const ExpenseCard = ({ record }: ExpenseCardProps) => {
    const { formatTime } = useUtil();

    return (
        <Link to={`/records/${record.id}`} className='flex flex-row justify-between items-center py-3 first:pt-0 last:pb-0 '>
            <div className='flex flex-row items-center gap-2'>
                <img src={record.category_image_url} className='w-8 aspect-square  rounded-lg bg-zinc-200' />
                <div className="flex flex-col">
                    <span className="text-sm font-bold">{categoryZhTW[record.category_name]}</span>
                    <span className="text-xs text-gray-400">{record.remarks}</span>
                </div>
            </div>
            <div className='flex flex-col items-end'>
                <span className="text-xs font-bold">{record.type === 'expense' ? '-' : '+'}NT$ {record.amount}</span>
                <span className="text-xs">{formatTime(record.record_date)}</span>
            </div>
        </Link >
    )
}

export default ExpenseCard