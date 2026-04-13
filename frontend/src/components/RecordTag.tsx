import { categoryZhTW } from '../constants/categoryZhTW'
import type { CategoryType } from '../types/categories.type'

type RecordTagProps = {
    onClick?: () => void,
    isSelected?: boolean,
    className?: string,
    category: CategoryType
}
const RecordTag = ({ onClick, isSelected, className, category }: RecordTagProps) => {
    return (
        <div onClick={onClick} className='flex flex-col items-center gap-1'>
            <img src={category.image_url} className={`w-full p-3 aspect-square border border-white  rounded-full ${isSelected ? ' border-yellow-500 bg-white' : 'bg-white'} transition-all duration-200 `} />
            <span className={` text-xs ${isSelected ? 'font-bold' : 'text-gray-800'}`}>{categoryZhTW[category.name] || category.name}</span>
        </div>
    )
}

export default RecordTag