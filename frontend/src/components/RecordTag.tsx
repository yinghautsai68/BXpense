import { categoryZhTW } from '../constants/categoryZhTW'
import type { CategoryType } from '../types/categories.type'

type RecordTagProps = {
    onClick?: () => void,
    isSelected?: boolean,
    category: CategoryType
}
const RecordTag = ({ onClick, isSelected, category }: RecordTagProps) => {
    return (
        <div onClick={onClick} className='flex flex-col items-center gap-1'>
            <div className={`w-13 h-13 rounded-full overflow-hidden border ${isSelected ? 'border-yellow-500' : ' border-gray-200'}`}>
                <img src={category.image_url} className="w-full h-full object-cover" />
            </div>
            <span className={` text-xs ${isSelected ? 'font-bold' : 'text-gray-800'}`}>{categoryZhTW[category.name] || category.name}</span>
        </div>
    )
}

export default RecordTag