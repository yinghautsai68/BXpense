import { categoryZhTW } from '../constants/categoryZhTw'
import type { CategoryType } from '../types/categories.type'

type RecordTagProps = {
    onClick: () => void,
    isSelected: boolean,
    className?: string,
    category: CategoryType
}
const RecordTag = ({ onClick, isSelected, className, category }: RecordTagProps) => {
    return (
        <div onClick={onClick} className='flex flex-col items-center'>
            <img src={category.image_url} className={`w-full p-2 aspect-square  rounded-xl ${isSelected ? 'border-2 border-black' : 'border-2 border-gray-400'} transition-all duration-200 `} />
            <span className={` text-xs ${isSelected ? 'font-bold' : 'text-gray-800'}`}>{categoryZhTW[category.name] || category.name}</span>
        </div>
    )
}

export default RecordTag