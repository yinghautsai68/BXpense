import type { Record } from "../types/records.type"

type ExpenseCardProps = {
    record: Record
};

const ExpenseCard = ({ record }: ExpenseCardProps) => {
    return (
        <div className='flex flex-row justify-between items-center py-3 first:pt-0 last:pb-0 '>
            <div className='flex flex-row items-center gap-2'>
                <img src={record.category_image_url} className='w-8 aspect-square bg-black' />
                <div className="flex flex-col">
                    <span className="text-sm font-bold">{record.category_name}</span>
                    <span className="text-xs">{record.remarks}</span>
                </div>
            </div>
            <div className='flex flex-col items-end'>
                <span className="text-xs font-bold">-NT$ {record.amount}</span>
                <span className="text-xs">{record.record_date}</span>
            </div>
        </div >
    )
}

export default ExpenseCard