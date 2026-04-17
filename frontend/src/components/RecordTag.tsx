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
            <img src={category.image_url} className={`w-16 md:w-15 aspect-square p-2 border border-white ${isSelected ? ' border-yellow-500 bg-white' : 'bg-white'}  rounded-full cursor-pointer transition-all duration-200  `} />
            <span className={` text-xs ${isSelected ? 'font-bold' : 'text-gray-800'}`}>{categoryZhTW[category.name] || category.name}</span>
        </div>
    )
}

export default RecordTag